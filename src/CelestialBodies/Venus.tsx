
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import venusMap from '../../assets/8k_venus_surface.jpg';
import Orbit from './Orbit';



export function Venus({ position, onUpdatePosition }) {
    const venus = useLoader(THREE.TextureLoader, venusMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.00010
            const distance = 7.7
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
                    <sphereGeometry args={[0.0087, 128, 128]} />
                    <meshStandardMaterial
                        map={venus}
                        metalness={0.4}
                        roughness={0.4}
                    />
                    {/* <Orbit distance={7.7} /> */}
                </mesh>
            </group>

        </>
    );
}
export default Venus;