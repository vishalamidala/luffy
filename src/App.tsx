import { Color3 } from '@babylonjs/core';
import { Box, Container } from '@mui/material';
import '@babylonjs/loaders/glTF';
import React from 'react';
import '@babylonjs/inspector';
import { EngineSceneWithLightCamera } from './BabyLonLib/EngineSceneWithLightCamera';
import { SpinningBox } from './BabyLonLib/SpinningBox';
import { ModelAnimeGirl } from './BabyLonLib/ModelAnimeGirl';

export default function App() {
  const [clicked, setClicked] = React.useState(false);
  const [box1clicked, setBox1Clicked] = React.useState(false);
  const [box2clicked, setBox2Clicked] = React.useState(false);
  const [box3clicked, setBox3Clicked] = React.useState(false);
  const [box4clicked, setBox4Clicked] = React.useState(false);
  const boxClickAnimationNames = [
    'stop',
    'arms_hip_hp_dance',
    'break_dance',
    'kick',
    'walking',
    'walking_turn_180',
  ] as const;
  const [currentAnimationName, setCurrentAnimationName] = React.useState<
    | 'stop'
    | 'idle'
    | 'arms_hip_hp_dance'
    | 'break_dance'
    | 'kick'
    | 'walking'
    | 'walking_turn_180'
  >(boxClickAnimationNames[0]);

  const handleBox1Click = () => {
    setBox1Clicked((prevState) => {
      if (prevState === true) {
        setCurrentAnimationName('stop');
      } else {
        setCurrentAnimationName(boxClickAnimationNames[1]);
      }
      return !prevState;
    });
    setBox2Clicked(false);
    setBox3Clicked(false);
    setBox4Clicked(false);
  };
  const handleBox2Click = () => {
    setBox1Clicked(false);
    setBox2Clicked((prevState) => {
      if (prevState === true) {
        setCurrentAnimationName('stop');
      } else {
        setCurrentAnimationName(boxClickAnimationNames[2]);
      }
      return !prevState;
    });
    setBox3Clicked(false);
    setBox4Clicked(false);
  };
  const handleBox3Click = () => {
    setBox1Clicked(false);
    setBox2Clicked(false);
    setBox3Clicked((prevState) => {
      if (prevState === true) {
        setCurrentAnimationName('stop');
      } else {
        setCurrentAnimationName(boxClickAnimationNames[3]);
      }
      return !prevState;
    });
    setBox4Clicked(false);
  };
  const handleBox4Click = () => {
    setBox1Clicked(false);
    setBox2Clicked(false);
    setBox3Clicked(false);

    setBox4Clicked((prevState) => {
      if (prevState === true) {
        setCurrentAnimationName('stop');
      } else {
        setCurrentAnimationName(boxClickAnimationNames[4]);
      }
      return !prevState;
    });
  };
  React.useEffect(() => {
    const animationName = () => {
      if (clicked) {
        return 'idle';
      } else if (box1clicked) {
        return 'arms_hip_hp_dance';
      } else if (box2clicked) {
        return 'break_dance';
      } else if (box3clicked) {
        return 'kick';
      } else if (box4clicked) {
        return 'walking';
      } else {
        return 'stop';
      }
    };
    animationName();
  }, [clicked, box1clicked, box2clicked, box3clicked, box4clicked]);

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
                positionX={0}
                positionZ={0}
                color={Color3.FromHexString('#C8F4F9')}
                hoveredColor={Color3.FromHexString('#3CACAE')}
                clicked={clicked}
                onClick={() => setClicked(!clicked)}
              />
            }
          >
            <ModelAnimeGirl animationName={currentAnimationName} />
          </React.Suspense>
          <SpinningBox
            name="right"
            positionX={-4}
            positionZ={4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box1clicked}
            onClick={handleBox1Click}
          />
          <SpinningBox
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
          />
          <SpinningBox
            name="right"
            positionX={-4}
            positionZ={-4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
            clicked={box4clicked}
            onClick={handleBox4Click}
          />
        </EngineSceneWithLightCamera>
      </Box>
    </Container>
  );
}
