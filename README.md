# aframe-stackbeat

StackBeat live coding A-Frame component, for live coding StackBeat in the metaverse.
Based on the Stackbeat JavaScript implementation: [StackBeat](https://esolangs.org/wiki/StackBeat)

## Dependencies

Use this component in [A-Frame](https://aframe.io), together with the [Networked-Aframe](https://github.com/networked-aframe/networked-aframe) library and the [Aframe-Super-Keyboard](https://github.com/supermedium/aframe-super-keyboard) component.  


## Usage

### Add the stackbeat component to your desired A-Frame entity to include the StackBeat Live Coding environment. A child entity including the Super-Keyboard component needs to be attached:

```html
    <a-scene>
        <a-entity stackbeat="">
            <a-entity
              id="keyboard"
              super-keyboard="hand:; imagePath:./aframe-stackbeat/;multipleInputs:true"
              stack-keyboard
              position="0 -0.6 +0.6"
              rotation="-30 0 0"
            ></a-entity>
	</a-entity>
    </a-scene>
```

###### Attributes:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| code | current source code  | _ |

### Add template of the live-coding object, including an Aframe-Super-Keyboard component, to your A-Scene assets:

```html
    <a-assets>
        <template id="stackbeat-template">
          <a-entity
            class="raycastable"
            geometry="primitive: box"
            material="wireframe:true"
            text="value:Hello World;side:double"
            resonance-audio-src="
            src:;
            loop: true;
            autoplay: true;"
            stackbeat=""
          >
            <a-entity
              id="keyboard"
              super-keyboard="hand:; imagePath:./aframe-stackbeat/;multipleInputs:true"
              stack-keyboard
              position="0 -0.6 +0.6"
              rotation="-30 0 0"
            ></a-entity>
          </a-entity>
        </template>
```

### Add template the Networked-Aframe NAF.shemas: 


```javascript
        if (!NAF.schemas.hasTemplate("#stackbeat-template")) {
          NAF.schemas.add({
            template: "#stackbeat-template",
            components: [
              "position",
              {
                component: "stackbeat",
                property: "code",
              },
            ],
          });
        }
```

### Live coding objects can be spawned into the environment by using the `stackbeat-persistent` component: 

```html
      <!-- Player Setting -->
      <a-entity
        id="rig"
        networked="template:#rig-template;"
        movement-controls
        stackbeat-persistent="template:#stackbeat-template; keyCode:32"
      >
```

###### Attributes:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| template | template of the object to be spawned  | '' |
| keyCode | key code to trigger spawned object  | 32 (space) |


## Run
See the Stackverse metaverse system for implementation: [Stackverse](https://github.com/AudioGroupCologne/Stackverse) 

## Acknowledgements

The A-Frame StackBeat component is based on the StackBeat JavaScript implementation found at [esolangs](https://esolangs.org/wiki/StackBeat) 
