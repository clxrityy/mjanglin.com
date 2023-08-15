'use client';

import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Loading from './Loading';

export function Mesh() {

    const [clicked, setClicked] = useState<boolean>(false);

    const color = 'rgb(72, 145, 116)';

    return (
        <Suspense fallback={<Loading />}>
            <Canvas camera={{ fov: 50, position: [5, 5, 5] }}>
                <OrbitControls enableZoom={false} autoRotate />
                <ambientLight intensity={0.4} />
                <directionalLight position={[6, 4, 2]} />
                <Sphere args={[1, 100, 200]} scale={1.2}>
                    <MeshDistortMaterial color={color} attach='material' distort={0.6} speed={1.5} clipShadows={true} roughness={2} />
                </Sphere>
            </Canvas>
        </Suspense>
    )
}