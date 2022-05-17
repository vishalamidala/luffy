import * as React from 'react';
import { Color3, Vector3 } from '@babylonjs/core';
import { Engine, Scene, Skybox } from 'react-babylonjs';
import '../styles.css';
import { XrExperience } from './XrExperience';
import wood from '../MuiLib/wood_floor.jpg';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      item: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export const EngineSceneWithLightCamera = (props: { children: any }) => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
      <Scene enablePhysics={true}>
        <arcRotateCamera
          name="arc"
          target={new Vector3(0, 1, 0)}
          alpha={-Math.PI / 2}
          beta={0.5 + Math.PI / 4}
          radius={8}
          minZ={0.001}
          wheelPrecision={50}
          lowerRadiusLimit={11}
          upperRadiusLimit={20}
          upperBetaLimit={Math.PI / 2}
        />
        <hemisphericLight
          name="hemi"
          direction={new Vector3(1, 1, 1)}
          intensity={0.8}
        />
        <directionalLight
          name="shadow-light"
          setDirectionToTarget={[Vector3.Zero()]}
          direction={Vector3.Zero()}
          position={new Vector3(-40, 30, -40)}
          intensity={0.4}
          shadowMinZ={1}
          shadowMaxZ={2500}
        >
          <shadowGenerator
            mapSize={1024}
            useBlurExponentialShadowMap={true}
            blurKernel={32}
            darkness={0.8}
            shadowCasters={['sphere1', 'dialog']}
            forceBackFacesOnly={true}
            depthScale={100}
          />
        </directionalLight>
        {props.children}
        <ground
          name="ground1"
          width={100}
          height={100}
          subdivisions={2}
          receiveShadows={true}
        >
          <standardMaterial name="groundMat" diffuseColor={new Color3(6, 1, 1)}>
            <texture name="grass" url={wood} />
          </standardMaterial>
        </ground>
        <Skybox
          rootUrl="assets/textures/TropicalSunnyDay"
          name="skybox"
        ></Skybox>
        <environmentHelper
          options={{
            enableGroundShadow: true /* true by default */,
            groundYBias: 1,
          }}
        />
        <XrExperience />
      </Scene>
    </Engine>
  );
};
