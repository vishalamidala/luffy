import { Color3, Vector3 } from '@babylonjs/core';
import { Box, Container } from '@mui/material';
import '@babylonjs/loaders';
import React from 'react';
import '@babylonjs/inspector';
import { EngineSceneWithLightCamera } from './BabyLonLib/EngineSceneWithLightCamera';
import { SpinningBox } from './BabyLonLib/SpinningBox';
import ResponsiveAppBar from './MuiLib/AppBar';
import { ModelAvacadoAndBoomBoxModel } from './BabyLonLib/ModelAvacadoAndBoomBox';
import { ModelAnimeGirl } from './BabyLonLib/ModelAnimeGirl';
import { Model } from 'react-babylonjs';

const baseUrl =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
export default function App() {
  return (
    <Container maxWidth="xl" disableGutters>
      <ResponsiveAppBar />
      <Box
        component={'div'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <EngineSceneWithLightCamera>
          <React.Suspense
            fallback={
              <SpinningBox
                name="right"
                positionX={0}
                positionZ={0}
                color={Color3.FromHexString('#C8F4F9')}
                hoveredColor={Color3.FromHexString('#3CACAE')}
              />
            }
          >
            <ModelAvacadoAndBoomBoxModel />
          </React.Suspense>
          <SpinningBox
            name="right"
            positionX={-4}
            positionZ={4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
          />
          <SpinningBox
            name="right"
            positionX={4}
            positionZ={-4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
          />
          <SpinningBox
            name="right"
            positionX={4}
            positionZ={4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
          />
          <SpinningBox
            name="right"
            positionX={-4}
            positionZ={-4}
            color={Color3.FromHexString('#C8F4F9')}
            hoveredColor={Color3.FromHexString('#3CACAE')}
          />
        </EngineSceneWithLightCamera>
      </Box>
    </Container>
  );
}
