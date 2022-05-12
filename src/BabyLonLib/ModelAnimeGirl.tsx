import { Vector3, ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import React from 'react';
import { TaskType, useAssetManager, useScene } from 'react-babylonjs';

const baseUrl3 =
  'https://raw.githubusercontent.com/vishalamidala/luffy/main/src/BabyLonLib/Models/';

const modelAssetTasks = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl3}`,
    sceneFilename: 'animegirl.glb',
    name: 'animegirl',
  },
] as any;

export const ModelAnimeGirl = (props: {
  animationName?:
    | 'idle'
    | 'arms_hip_hp_dance'
    | 'break_dance'
    | 'kick'
    | 'walking'
    | 'walking_turn_180'
    | 'stop';
}) => {
  const assetManagerResult = useAssetManager(modelAssetTasks);
  const scene = useScene();

  React.useEffect(() => {
    const loadAsset = () => {
      const animegirlTask: any = assetManagerResult.taskNameMap['animegirl'];
      const animegirl = animegirlTask.loadedMeshes[0];
      animegirl.scaling = new Vector3(0.8, 0.8, 0.8);
      animegirlTask.loadedMeshes[0].position = new Vector3(0, 0, 0);
      const heroSpeed = 0.04;
      const heroSpeedBackwards = 0.01;
      const heroRotationSpeed = 0.1;
      let animating = true;
      //   animegirlTask.loadedMeshes[0].scaling = new Vector3(0.8, 0.8, 0.8);

      // console.log(
      //   'girl',
      //   animegirl.moveWithCollisions(animegirl.forward.scaleInPlace(heroSpeed))
      // );
      // animegirl.rotate(Vector3.Up(), -heroRotationSpeed);
      // const camera: any = scene?.activeCamera;
      // camera.setTarget(animegirlTask.loadedMeshes[0].position);

      const idleAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('idle')
      )[0];
      const armsAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('arms_hip_hp_dance')
      )[0];
      const breakAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('break_dance')
      )[0];
      const kickAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('kick')
      )[0];
      const walkingAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('walking')
      )[0];
      const walkingTurnAnimation = animegirlTask.loadedAnimationGroups.filter(
        (animations: any) => animations.name.includes('walking_turn_180')
      )[0];
      if (props.animationName === 'idle') {
        kickAnimation.stop();
        armsAnimation.stop();
        idleAnimation.start(
          true,
          1.0,
          idleAnimation.from,
          idleAnimation.to,
          false
        );
      }
      if (props.animationName === 'arms_hip_hp_dance')
        armsAnimation.start(
          true,
          1.0,
          armsAnimation.from,
          armsAnimation.to,
          false
        );
      if (props.animationName === 'kick') {
        idleAnimation.stop();
        armsAnimation.stop();
        kickAnimation.start(
          true,
          1.0,
          kickAnimation.from,
          kickAnimation.to,
          false
        );
      }
      if (props.animationName === 'walking') {
        idleAnimation.stop();
        armsAnimation.stop();
        kickAnimation.stop();
        walkingAnimation.start(
          true,
          1.0,
          walkingAnimation.from,
          walkingAnimation.to,
          false
        );
      }
      if (props.animationName === 'walking_turn_180') {
        idleAnimation.stop();
        armsAnimation.stop();
        kickAnimation.stop();
        walkingTurnAnimation.start(
          true,
          1.0,
          walkingTurnAnimation.from,
          walkingTurnAnimation.to,
          false
        );
      }
      if (props.animationName === 'break_dance') {
        idleAnimation.stop();
        armsAnimation.stop();
        kickAnimation.stop();
        breakAnimation.start(
          true,
          1.0,
          breakAnimation.from,
          breakAnimation.to,
          false
        );
      }
      if (props.animationName === 'stop') {
        idleAnimation.stop();
        armsAnimation.stop();
        kickAnimation.stop();
        walkingAnimation.stop();
        walkingTurnAnimation.stop();
        breakAnimation.stop();
      }

      // keydown events excuted every frame
      if (scene) {
        const walk = scene.getAnimationGroupByName('walking');
        let inputMap = {} as any;
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
        scene.onBeforeRenderObservable.add(() => {
          let keydown = false;
          if (inputMap['w']) {
            animegirl.moveWithCollisions(
              animegirl.forward.scaleInPlace(heroSpeed)
            );
            keydown = true;
          }
          if (inputMap['a']) {
            animegirl.rotate(Vector3.Up(), -heroRotationSpeed);
            keydown = true;
          }
          if (inputMap['d']) {
            animegirl.rotate(Vector3.Up(), heroRotationSpeed);
            keydown = true;
          }

          if (keydown) {
            if (!animating) {
              animating = true;
              walk?.start(true, 2, walk.from, walk.to, false);
            }
          } else {
            if (animating) {
              //Default animation is idle when no key is down
              idleAnimation.start(
                true,
                1.0,
                idleAnimation.from,
                idleAnimation.to,
                true
              );

              //Stop all animations besides Idle Anim when no key is down
              armsAnimation.stop();
              kickAnimation.stop();
              walkingAnimation.stop();
              walkingTurnAnimation.stop();
              breakAnimation.stop();

              //Ensure animation are played only once per rendering loop
              animating = false;
            }
          }
        });
      }
    };

    assetManagerResult && loadAsset();
  }, [assetManagerResult, props.animationName, scene]);

  return null;
};
