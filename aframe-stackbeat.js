class stackbeatSynth {
  constructor(audio) {
    this.audio = audio;
    this.code = this.parse("");
    this.g = Function("s,R", "s=[R=s];" + this.code + "return s.pop()");
    this.lastCode = this.code;
    this.bytebeatWorker = false;
  }
  
// Based on StackBeat JavaScript implementation found at esolangs: https://esolangs.org/wiki/StackBeat
  parse(code) {
    let w = code.split("");
    let r = "";
    let v = "";
    let e;
    let a = 1 * 8e3;
    while ((e = w.shift())) {
      +e == e ? (v += e) : v && ((r += "Y(" + +v + ");"), (v = "")),
        (r +=
          (e == "@"
            ? "s=s.concat(s.slice(-1))"
            : e == "_"
            ? "Y(R)"
            : e == "$"
            ? "Z"
            : e == "#"
            ? "Y(Z,Z)"
            : ~"+-*/%^&|".indexOf(e)
            ? "Y(Z" + e + "Z)"
            : ~"<>".indexOf(e)
            ? "Y(Z" + e + e + "Z)"
            : ~"~!".indexOf(e)
            ? "Y(+" + e + "Z)"
            : "") + ";");
    }

    return r.replace(/Z/g, "s.pop()").replace(/Y/g, "s.push");
  }

  async init() {
    let actx = (this.audioCtx = document.querySelector(
      "a-resonance-audio-room"
    ).components["resonance-audio-room"].audioContext);
    await console.log("wait...");

    await this.audioCtx.audioWorklet.addModule("./aframe-stackbeat/stackbeat-worker.js");

    this.stackbeatWorker = new AudioWorkletNode(
      this.audioCtx,
      "stackbeat-worker"
    );

    this.streamDestination = this.audioCtx.createMediaStreamDestination();
    this.source = this.audioCtx.createBufferSource();

    this.myArrayBuffer = this.audioCtx.createBuffer(1, 48000 * 1, 48000);
    this.source.buffer = this.myArrayBuffer;
    this.source.connect(this.streamDestination);
    this.source.start();

    this.stackbeatWorker.connect(this.streamDestination);

    this.stream = this.streamDestination.stream;

    this.audio.setAttribute("resonance-audio-src", "src", this.stream);

  }

  update(code) {
    this.code = this.parse(code);
    if (this.stackbeatWorker) {
      this.stackbeatWorker.port.postMessage(this.code);
    }
  }


}

AFRAME.registerComponent("stackbeat", {
  synth: null,
  schema: {
    code: { default: "_" },
  },
  init: function () {
    let el = this.el;
    this.synth = new stackbeatSynth(el);

    this.synth.init();    this.el.play();
    this.el.addEventListener("superkeyboardchange", () => {
      let code = el.childNodes[0].components["super-keyboard"].data.value;

      if (code == "666") {
        this.el.parentNode.removeChild(this.el);
      } else {
        this.el.setAttribute("stackbeat", "code", code);

        this.el.setAttribute("text", "value", code);
      }
    });
  },
  update: function () {
    var data = this.data; 
    var el = this.el; 

    var resonanceRoom = document.querySelector("a-resonance-audio-room");
    el.setAttribute("resonance-audio-src", "room", resonanceRoom);
    el.setAttribute("resonance-audio-src", "position",el.getAttribute('position'));

    this.el.setAttribute("text", "value", data.code);

    this.synth.update(data.code);
   
  },
});

AFRAME.registerComponent("stack-keyboard", {
  dependencies: ["super-keyboard"],
  init: function () {
    var model = {
      wrapCount: 35,
      inputOffsetY: 0.003,
      inputOffsetX: 0,
      img: "sk-basic.png",
      layout: [
        { key: "1", x: 0.073, y: 0.221, w: 0.079, h: 0.152 },
        { key: "2", x: 0.152, y: 0.221, w: 0.079, h: 0.152 },
        { key: "3", x: 0.231, y: 0.221, w: 0.079, h: 0.152 },
        { key: "4", x: 0.311, y: 0.221, w: 0.08, h: 0.152 },
        { key: "5", x: 0.392, y: 0.221, w: 0.079, h: 0.152 },
        { key: "6", x: 0.471, y: 0.221, w: 0.079, h: 0.152 },
        { key: "7", x: 0.55, y: 0.221, w: 0.079, h: 0.152 },
        { key: "8", x: 0.63, y: 0.221, w: 0.08, h: 0.152 },
        { key: "9", x: 0.71, y: 0.221, w: 0.079, h: 0.152 },
        { key: "0", x: 0.79, y: 0.221, w: 0.079, h: 0.152 },
        { key: "Delete", x: 0.871, y: 0.223, w: 0.108, h: 0.146 },
        { key: "Enter", x: 0.872, y: 0.522, w: 0.108, h: 0.244 },
        { key: " ", x: 0.296, y: 0.834, w: 0.415, h: 0.126 },
        { key: "+", x: 0.069, y: 0.454, w: 0.079, h: 0.152 },
        { key: "-", x: 0.148, y: 0.454, w: 0.079, h: 0.152 },
        { key: "*", x: 0.228, y: 0.454, w: 0.079, h: 0.152 },
        { key: "/", x: 0.307, y: 0.454, w: 0.08, h: 0.152 },
        { key: ">", x: 0.388, y: 0.454, w: 0.079, h: 0.152 },
        { key: "<", x: 0.467, y: 0.454, w: 0.079, h: 0.152 },
        { key: "^", x: 0.546, y: 0.454, w: 0.079, h: 0.152 },
        { key: "&", x: 0.626, y: 0.454, w: 0.08, h: 0.152 },
        { key: "|", x: 0.706, y: 0.454, w: 0.079, h: 0.152 },
        { key: "%", x: 0.786, y: 0.454, w: 0.079, h: 0.152 },
        { key: "!", x: 0.117, y: 0.644, w: 0.08, h: 0.154 },
        { key: "~", x: 0.197, y: 0.644, w: 0.08, h: 0.154 },
        { key: "_", x: 0.516, y: 0.644, w: 0.079, h: 0.154 },
        { key: "@", x: 0.595, y: 0.644, w: 0.079, h: 0.154 },
        { key: "$", x: 0.675, y: 0.644, w: 0.08, h: 0.154 },
        { key: "#", x: 0.755, y: 0.644, w: 0.08, h: 0.154 },
      ],
    };
    this.el.components["super-keyboard"].addCustomModel("stack", model);
    this.el.setAttribute("super-keyboard", {
      imagePath: "./",
      model: "stack",
    });
  },
});

/* global AFRAME, NAF */
AFRAME.registerComponent('stackverse-persistent', {
  schema: {
    template: { default: '' },
    keyCode: { default: 32 }
  },

  init: function() {
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  },

  onKeyUp: function(e) {
    if (this.data.keyCode === e.keyCode || e.keyCode == undefined) {
      const el = document.createElement('a-entity');
      this.el.sceneEl.appendChild(el);
      el.setAttribute('position', this.el.getAttribute('position'));
      el.setAttribute('networked', {persistent: true, template: this.data.template});
      NAF.utils.getNetworkedEntity(el).then((networkedEl) => {
        document.body.dispatchEvent(new CustomEvent('persistentEntityCreated', {detail: {el: el}}));
      });
    }
  }
});

