import { Vector3, PhysicsImpostor, Color3 } from '@babylonjs/core';
import { Engine, Model, Scene } from 'react-babylonjs';

import * as React from 'react';

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

let baseUrl =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
export const EngineSceneWithLightCamera = (props: { children: any }) => (
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
        lowerRadiusLimit={8}
        upperRadiusLimit={20}
        upperBetaLimit={Math.PI / 2}
      />
      <hemisphericLight
        name="hemi"
        direction={new Vector3(0, -1, 0)}
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
        width={10}
        height={10}
        subdivisions={2}
        receiveShadows={true}
      >
        <physicsImpostor
          type={PhysicsImpostor.BoxImpostor}
          _options={{ mass: 0, restitution: 0.9 }}
        />
      </ground>
    </Scene>
  </Engine>
);
