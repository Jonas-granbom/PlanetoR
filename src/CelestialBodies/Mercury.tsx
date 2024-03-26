
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import MercuryMap from '../../assets/8k_mercury.jpg';



export function Mercury({ position, onUpdatePosition }) {
    const mercury = useLoader(THREE.TextureLoader, MercuryMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.0001
            const distance = 4.2
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
                    <sphereGeometry args={[0.0035, 128, 128]} />
                    <meshStandardMaterial
                        map={mercury}
                        metalness={0.4}
                        roughness={0.4}
                    />
                    {/* <Orbit distance={4.2} /> */}
                </mesh>
            </group>

        </>
    );
}
export default Mercury;