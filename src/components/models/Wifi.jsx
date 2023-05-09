/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 wifi.gltf --transform
Author: JakeCarvey (https://sketchfab.com/JakeCarvey)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/wifi-antenna-642d897d3549497589809c8567edbfdb
Title: WiFI Antenna
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';


export function Wifi(props) {
  const { nodes, materials } = useGLTF('./models/wifi-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.5, 3.85, 0.05]}>
            <mesh geometry={nodes['Material-Tower_1'].geometry} material={materials.Tower} />
            <mesh geometry={nodes['Material-solar'].geometry} material={materials.solar} />
          </group>
          <group position={[0, 5.85, 0]}>
            <mesh geometry={nodes['Material-Default'].geometry} material={materials.Default} />
            <mesh geometry={nodes['Material-Tower_2'].geometry} material={materials.Tower} />
          </group>
          <mesh geometry={nodes['Material-Tower'].geometry} material={materials.Tower} />
          <mesh geometry={nodes['Material-Cel_Boix'].geometry} material={materials.Cel_Boix} position={[0.02, 4.21, -0.27]} />
          <mesh geometry={nodes['Material-Default_1'].geometry} material={materials.Default} position={[0, -3.49, 0]} scale={1.4} />
          <mesh geometry={nodes['Material-Tower_3'].geometry} material={materials.Tower} position={[0, 3.97, 0.02]} rotation={[-0.45, 0, 0]} />
          <mesh geometry={nodes['Material-Tower_4'].geometry} material={materials.Tower} position={[-0.02, 3.97, -0.01]} rotation={[-2.38, -0.9, -2.5]} />
          <mesh geometry={nodes['Material-Tower_5'].geometry} material={materials.Tower} position={[0.02, 3.97, -0.01]} rotation={[-2.38, 0.9, 2.5]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/wifi-transformed.glb')
