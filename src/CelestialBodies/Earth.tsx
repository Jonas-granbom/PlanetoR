
import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import earthMap from '../../assets/earth.jpg';
import cloudsMap from '../../assets/clouds.jpg';
import specularMap from '../../assets/specular.jpg';
import normalMap from '../../assets/normal.jpg';
import Moon from './Moon';



export function Earth({ position, onUpdatePosition }) {
    const [earth, normal, specular, clouds] = useLoader(THREE.TextureLoader, [earthMap, normalMap, specularMap, cloudsMap]);
    const groupRef = useRef<THREE.Group>(null);

    const earthPositionRef = useRef(new THREE.Vector3(0, 0, 0))

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.000011
            const distance = 10.8
            const x = Math.sin(angle) * distance
            const z = Math.cos(angle) * distance
            groupRef.current.position.set(x, 0, z)
            groupRef.current.rotation.y += 0.0005

            earthPositionRef.current = groupRef.current.position
            onUpdatePosition(groupRef.current.position.clone());
        }
    });

    return (
        <>
            <group ref={groupRef} position={position} castShadow receiveShadow>
                <mesh position={position} >
                    <sphereGeometry args={[0.0094, 128, 128]} />
                    <meshPhongMaterial map={clouds} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={position}   >
                    <sphereGeometry args={[0.0092, 128, 128]} />
                    <meshPhongMaterial specularMap={specular} />

                    <meshStandardMaterial
                        map={earth}
                        normalMap={normal}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
                <Moon />
            </group>

        </>
    );
}
export default Earth;