import { OrbitControls, Stage } from '../@react-three/drei';
import { Canvas } from '../@react-three/fiber';
import React from 'react'
import { Wifi } from './models/Wifi';

const Networking = () => {
    return (
        <Canvas>
            <Stage environment='city' intensity={0.6}>
                <Wifi />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

export default Networking;