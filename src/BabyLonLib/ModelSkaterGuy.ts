import { Vector3, ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import React from 'react';
import { TaskType, useAssetManager, useScene } from 'react-babylonjs';
import { KEY, io } from '../App';

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
        const skaterSpeedJump = 0.02;
        const skaterRotationSpeed = 0.1;
        scene.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            io.emit('message', {
              inputMap,
              key: KEY,
              position: skater.position,
            });
          })
        );
        scene.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            io.emit('message', {
              inputMap,
              key: KEY,
              position: skater.position,
            });
          })
        );
        const walkAnim = scene.getAnimationGroupByName('running');
        const walkBackAnim = scene.getAnimationGroupByName('jump');
        const idleAnim = scene.getAnimationGroupByName('idle');
        io.on(
          'message',
          (message: {
            text: string;
            inputMap: any;
            key: string;
            keydown: string[];
            position: Vector3;
            animating: boolean;
          }) => {
            skater.position = new Vector3(
              message.position._x,
              message.position._y,
              message.position._z
            );
            inputMap = message.inputMap;
          }
        );
        //Rendering loop (executed for everyframe)
        scene.onBeforeRenderObservable.add(() => {
          let keydown: string[] = [];

          if (inputMap['w']) {
            skater.moveWithCollisions(skater.forward.scaleInPlace(skaterSpeed));
            keydown.push('walk');
          }
          if (inputMap[' ']) {
            skater.moveWithCollisions(
              skater.forward.scaleInPlace(skaterSpeedJump)
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

          if (!animating && keydown.length > 0) {
            keydown.map((value) => {
              return animations[value]();
            });
            if (!keydown.includes('jump')) {
              walkBackAnim?.stop();
            }
          }

          if (keydown.length === 0) {
            if (animating) {
              idleAnim?.start(true, 1.0, idleAnim.from, idleAnim.to, false);
              animating = false;
            }
            walkAnim?.stop();
            walkBackAnim?.stop();
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
