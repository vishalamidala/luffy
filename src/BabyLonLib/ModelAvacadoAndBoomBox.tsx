import { Vector3 } from '@babylonjs/core';
import React from 'react';
import { TaskType, useAssetManager } from 'react-babylonjs';

const baseUrl =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';

const modelAssetTasks = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}CesiumMan/glTF/`,
    sceneFilename: 'CesiumMan.gltf',
    name: 'cesiumMan',
  },
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}Avocado/glTF/`,
    sceneFilename: 'Avocado.gltf',
    name: 'avocado',
  },
] as any;

export const ModelAvacadoAndBoomBoxModel = () => {
  const assetManagerResult = useAssetManager(modelAssetTasks);

  React.useMemo(() => {
    console.log('Loaded Tasks', assetManagerResult);
    const boomboxTask: any = assetManagerResult.taskNameMap['cesiumMan'];
    boomboxTask.loadedMeshes[0].position = new Vector3(2.5, 0.7, 0);
    boomboxTask.loadedMeshes[1].scaling = new Vector3(1, 1, 1);

    const avocadoTask: any = assetManagerResult.taskNameMap['avocado'];
    avocadoTask.loadedMeshes[0].position = new Vector3(-2.5, 0, 0);
    avocadoTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);
  }, [assetManagerResult]);

  return null;
};
