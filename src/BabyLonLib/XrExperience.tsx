import React from 'react';
import { useScene } from 'react-babylonjs';

export const XrExperience = () => {
  const scene = useScene();
  React.useEffect(() => {
    const xrExperience = async () => {
      await scene?.createDefaultXRExperienceAsync({
        uiOptions: {
          sessionMode: 'immersive-vr',
        },
      });
    };
    xrExperience();
  });
  return <></>;
};
