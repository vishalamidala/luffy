import { AssetsManager, Vector3 } from '@babylonjs/core';
import React from 'react';
import {
  TaskType,
  useAssetManager,
  useCamera,
  useScene,
  useSceneLoader,
} from 'react-babylonjs';
import '@babylonjs/loaders/glTF';

const baseUrl =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';

const modelAssetTasks = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}Avocado/glTF/`,
    sceneFilename: 'Avocado.gltf',
    name: 'avocado',
  },
] as any;

export const ModelAnimeGirl = () => {
  const assetManagerResult = useAssetManager(modelAssetTasks);
  const scene: any = useScene();
  const loader = useSceneLoader('./Models/', 'animegirl.glb');

  //   const loadModels = () => {
  //     let loader = new AssetsManager(scene);
  //     let loadModel = loader.addMeshTask('test', '', '', 'model.babylon');
  //     loadModel.onSuccess = (t) => {
  //       // do some code
  //       // .....
  //     };
  //     return loader;
  //   };
  //   const load = BABYLON.SceneLoader.ImportMesh(
  //     '',
  //     'https://assets.babylonjs.com/meshes/',
  //     'HVGirl.glb',
  //     scene,
  //     function (newMeshes, particleSystems, skeletons, animationGroups) {
  //       var hero = newMeshes[0];

  //       //Scale the model down
  //       hero.scaling.scaleInPlace(0.1);

  //       //Lock camera on the character
  //       camera1.target = hero;

  //       //Get the Samba animation Group
  //       const sambaAnim = scene.getAnimationGroupByName('Samba');

  //       //Play the Samba animation
  //       sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
  //     }
  //   );
  React.useMemo(() => {
    console.log('Loaded Tasks', loader);

    // const boomboxTask: any = assetManagerResult.taskNameMap['animegirl'];
    // boomboxTask.loadedMeshes[0].position = new Vector3(2.5, 0.7, 0);
    // boomboxTask.loadedMeshes[1].scaling = new Vector3(80, 80, 80);

    const avocadoTask: any = assetManagerResult.taskNameMap['avocado'];
    avocadoTask.loadedMeshes[0].position = new Vector3(-2.5, 0, 0);
    avocadoTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);
  }, [assetManagerResult]);

  return null;
};
