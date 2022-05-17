import { ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import React from 'react';
import { useScene } from 'react-babylonjs';

export const useBabylonInput = () => {
  const [input, setInputMap] = React.useState({} as any);
  const [keydown, setKeydown] = React.useState(false);
  const scene = useScene();
  React.useEffect(() => {
    if (scene) {
      scene.actionManager = new ActionManager(scene);
      scene.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
          setInputMap((prev: any) => ({
            ...prev,
            [evt.sourceEvent.key]: evt.sourceEvent.type === 'keydown',
          }));
          setKeydown(true);
        })
      );
      scene.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
          setInputMap((prev: any) => ({
            ...prev,
            [evt.sourceEvent.key]: evt.sourceEvent.type === 'keydown',
          }));
          setKeydown(false);
        })
      );
    }
  }, [scene]);
  return { input, keydown };
};
