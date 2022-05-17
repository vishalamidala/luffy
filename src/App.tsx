import { Color3 } from '@babylonjs/core';
import { Box, Container } from '@mui/material';
import '@babylonjs/loaders/glTF';
import React from 'react';
import '@babylonjs/inspector';
import { EngineSceneWithLightCamera } from './BabyLonLib/EngineSceneWithLightCamera';
import { SpinningBox } from './BabyLonLib/SpinningBox';
import { ModelSkaterGuy } from './BabyLonLib/ModelSkaterGuy';
import * as socket from 'socket.io-client';
import { useScene } from 'react-babylonjs';
export const io = socket.connect('http://localhost:5020');
const KEY = '1';

export default function App() {
  const [clicked, setClicked] = React.useState(false);

  const scene = useScene();

  // const handleBox1Click = () => {
  //   console.log('added');

  //   io.emit('message', {
  //     text: 'Test',
  //     date: new Date(),
  //     key: KEY,
  //   });
  // };
  // const handleBox2Click = () => {
  //   setBox1Clicked(false);
  //   setBox2Clicked((prevState) => {
  //     if (prevState === true) {
  //       setCurrentAnimationName('stop');
  //     } else {
  //       setCurrentAnimationName(boxClickAnimationNames[2]);
  //     }
  //     return !prevState;
  //   });
  //   setBox3Clicked(false);
  //   setBox4Clicked(false);
  // };
  // const handleBox3Click = () => {
  //   setBox1Clicked(false);
  //   setBox2Clicked(false);
  //   setBox3Clicked((prevState) => {
  //     if (prevState === true) {
  //       setCurrentAnimationName('stop');
  //     } else {
  //       setCurrentAnimationName(boxClickAnimationNames[3]);
  //     }
  //     return !prevState;
  //   });
  //   setBox4Clicked(false);
  // };
  // const handleBox4Click = () => {
  //   setBox1Clicked(false);
  //   setBox2Clicked(false);
  //   setBox3Clicked(false);

  //   setBox4Clicked((prevState) => {
  //     if (prevState === true) {
  //       setCurrentAnimationName('stop');
  //     } else {
  //       setCurrentAnimationName(boxClickAnimationNames[4]);
  //     }
  //     return !prevState;
  //   });
  // };
  // React.useEffect(() => {
  //   const animationName = () => {
  //     if (clicked) {
  //       return 'idle';
  //     } else if (box1clicked) {
  //       return 'arms_hip_hp_dance';
  //     } else if (box2clicked) {
  //       return 'break_dance';
  //     } else if (box3clicked) {
  //       return 'kick';
  //     } else if (box4clicked) {
  //       return 'walking';
  //     } else {
  //       return 'stop';
  //     }
  //   };
  //   animationName();
  //   const values = ['5'];

  //   const callPints = (values: string[]) => {};
  // }, [clicked, box1clicked, box2clicked, box3clicked, box4clicked]);

  React.useEffect(() => {
    io.emit('joinRoom', KEY);
    if (scene) {
      console.log(scene);
    }
  }, [scene]);

  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        component={'div'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* <SimpleVR /> */}
        <EngineSceneWithLightCamera>
          <React.Suspense
            fallback={
              <SpinningBox
                name="right"
                positionX={1}
                positionZ={0}
                color={Color3.FromHexString('#C8F4F9')}
                hoveredColor={Color3.FromHexString('#3CACAE')}
                clicked={clicked}
                onClick={() => setClicked(!clicked)}
              />
            }
          >
            <ModelSkaterGuy
              positionX={1}
              positionZ={0}
              positionY={0}
              scaleX={0.5}
              scaleY={0.5}
              scaleZ={0.5}
            />
          </React.Suspense>
          {/* <SpinningBox
            name="right"
            positionX={-4}
            positionZ={4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box1clicked}
            onClick={handleBox1Click}
          /> */}
          {/* <SpinningBox
            name="right"
            positionX={4}
            positionZ={-4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box2clicked}
            onClick={handleBox2Click}
          />
          <SpinningBox
            name="right"
            positionX={4}
            positionZ={4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box3clicked}
            onClick={handleBox3Click}
          /> */}
          {/* <SpinningBox
            name="right"
            positionX={-4}
            positionZ={-4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box4clicked}
           
          /> */}
        </EngineSceneWithLightCamera>
      </Box>
    </Container>
  );
}
