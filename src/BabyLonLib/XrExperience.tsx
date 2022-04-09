import React from 'react';
import { useScene } from 'react-babylonjs';

export const XrExperience = () => {
  let scene = useScene();

  React.useEffect(() => {
    const xrExperience = async () => {
      scene?.createDefaultEnvironment();
      const xr = await scene?.createDefaultXRExperienceAsync({
        uiOptions: {
          sessionMode: 'immersive-vr',
        },
      });
      if (!xr?.baseExperience) {
        console.log('gg');
      } else {
        console.log('wp');
      }
      console.log(xr);
    };
    xrExperience();
  });
  return <></>;
};
