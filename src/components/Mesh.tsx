'use client';

import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import { Suspense } from 'react';
import Loading from './Loading';

export function Mesh() {

    return (
        <Suspense fallback={<Loading />}>
            <Canvas camera={{ fov: 50, position: [5, 5, 5] }}>
                <OrbitControls enableZoom={false} autoRotate />
                <ambientLight intensity={0.4} />
                <directionalLight position={[6, 4, 2]} />
                <Sphere args={[1, 100, 200]} scale={1.2}>
                    <MeshDistortMaterial color="rgb(72,145,116)" attach='material' distort={0.5} speed={2} />
                </Sphere>
            </Canvas>
        </Suspense>
    )
}