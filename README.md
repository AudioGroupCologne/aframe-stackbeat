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

StackBeat Live Coding objects can also be spawned into the environment. See Glitch example for implementation.

###### Attributes:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| code | current source code  | _ |


## Run
See the Stackverse metaverse system for implementation: [Stackverse](https://github.com/AudioGroupCologne/Stackverse) 

## Acknowledgements

The A-Frame StackBeat component is based on the StackBeat JavaScript implementation found at [esolangs](https://esolangs.org/wiki/StackBeat) 
