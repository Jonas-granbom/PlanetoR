//neptune 323.4



import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import neptuneMap from '../../assets/2k_neptune.jpg';



export function Neptune({ position, onUpdatePosition }) {

    const neptune = useLoader(THREE.TextureLoader, neptuneMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.00001
            const distance = 323.4
            const x = Math.sin(angle) * distance
            const z = Math.cos(angle) * distance
            groupRef.current.position.set(x, 0, z)
            groupRef.current.rotation.y += 0.0010

            onUpdatePosition(groupRef.current.position.clone());
        }
    });

    return (
        <>
            <group ref={groupRef}>
                <mesh position={position} >
                    <sphereGeometry args={[.0354, 128, 128]} />
                    <meshStandardMaterial
                        map={neptune}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
            </group>

        </>
    );
}
export default Neptune;