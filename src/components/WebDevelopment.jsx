import { OrbitControls, Stage } from '../@react-three/drei'
import { Canvas } from '../@react-three/fiber'
import React from 'react'
import { Laptop } from './models/Laptop'

const WebDevelopment = () => {
    return (
        <Canvas>
            <Stage environment='city' intensity={0.6}>
                <Laptop />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

export default WebDevelopment