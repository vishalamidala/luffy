import { Vector3 } from '@babylonjs/core';
import React from 'react';
import { TaskType, useAssetManager } from 'react-babylonjs';

const gg =
  'https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/AnimatedCube';
const baseUrl =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
const baseUrl2 =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
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

export const ModelAvacadoAndBoomBoxModel = (props: {
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

  React.useEffect(() => {
    const loadAsset = () => {
      const animegirlTask: any = assetManagerResult.taskNameMap['animegirl'];
      animegirlTask.loadedMeshes[0].position = new Vector3(0, 0, 0);
      animegirlTask.loadedMeshes[0].scaling = new Vector3(0.8, 0.8, 0.8);

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
        kickAnimation.start(
          true,
          1.0,
          kickAnimation.from,
          kickAnimation.to,
          false
        );
      }
    };

    assetManagerResult && loadAsset();
  }, [assetManagerResult, props.animationName]);

  return null;
};
