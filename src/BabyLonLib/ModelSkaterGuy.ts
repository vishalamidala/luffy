import { Vector3, ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import React from 'react';
import { TaskType, useAssetManager, useScene } from 'react-babylonjs';

const baseUrl = 'models/';
const modelAssetTasks = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}`,
    sceneFilename: 'skater.glb',
    name: 'skater',
  },
] as any;

export const ModelSkaterGuy = ({
  positionX,
  positionY,
  positionZ,
  scaleX,
  scaleY,
  scaleZ,
}: any) => {
  const assetManagerResult = useAssetManager(modelAssetTasks);
  // const { input: inputMap, keydown } = useBabylonInput();

  const scene = useScene();

  React.useEffect(() => {
    const loadAsset = () => {
      const assetTask: any = assetManagerResult.taskNameMap['skater'];
      const skater = assetTask.loadedMeshes[0];

      skater.position = new Vector3(positionX, positionY, positionZ);
      skater.scaling = new Vector3(scaleX, scaleY, scaleZ);
      if (scene) {
        let inputMap = {} as any;
        let animating = true;

        const skaterSpeed = 0.04;
        const skaterSpeedBackwards = 0.01;
        const skaterRotationSpeed = 0.1;
        scene.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
          })
        );
        scene.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
          })
        );
        const walkAnim = scene.getAnimationGroupByName('running');
        const walkBackAnim = scene.getAnimationGroupByName('jump');
        const idleAnim = scene.getAnimationGroupByName('idle');
        //Rendering loop (executed for everyframe)
        scene.onBeforeRenderObservable.add(() => {
          let keydown: string[] = [];

          if (inputMap['w']) {
            skater.moveWithCollisions(skater.forward.scaleInPlace(skaterSpeed));
            keydown.push('walk');
          }
          if (inputMap['s']) {
            skater.moveWithCollisions(
              skater.forward.scaleInPlace(-skaterSpeedBackwards)
            );
            keydown.push('jump');
          }
          if (inputMap['a']) {
            skater.rotate(Vector3.Up(), -skaterRotationSpeed);
            keydown.push('left');
          }
          if (inputMap['d']) {
            skater.rotate(Vector3.Up(), skaterRotationSpeed);
            keydown.push('right');
          }
          const animations: any = {
            walk: () => {
              walkAnim?.start(true, 1.0, walkAnim.from, walkAnim.to, false);
            },
            jump: () => {
              walkBackAnim?.start(
                true,
                1.0,
                walkBackAnim.from,
                walkBackAnim.to,
                false
              );
            },
            right: () => {},
            left: () => {},
          };
          // Manage animations to be played

          if (!animating) {
            keydown.map((value) => {
              return animations[value]();
            });
          }

          if (!keydown.includes('jump')) {
            walkBackAnim?.stop();
          }
          if (keydown.length === 0) {
            walkAnim?.stop();
            walkBackAnim?.stop();

            if (animating) {
              //Default animation is idle when no key is down
              idleAnim?.start(true, 1.0, idleAnim.from, idleAnim.to, false);

              //Stop all animations besides Idle Anim when no key is down

              //Ensure animation are played only once per rendering loop
              animating = false;
            }
          }
        });
      }
    };

    assetManagerResult && loadAsset();
  }, [
    assetManagerResult,
    scene,
    positionX,
    positionY,
    positionZ,
    scaleX,
    scaleY,
    scaleZ,
  ]);
  return null;
};
