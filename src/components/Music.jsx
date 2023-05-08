import { OrbitControls, Stage } from '../@react-three/drei';
import { Canvas } from '../@react-three/fiber';
import React from 'react';
import { Controller } from './models/Controller';

const Music = () => {
    return (
        <Canvas>
            <Stage environment='city' intensity={0.6}>
                <Controller />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

export default Music;