import React from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Typewriter } from './models/Typewriter';

const Writing = () => {
    return (
        <Canvas>
            <Stage environment='city' intensity={0.6}>
                <Typewriter />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

export default Writing;