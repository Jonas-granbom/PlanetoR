import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import moon from '../../assets/moon_map.jpg'

const Moon = () => {
    const moonRef = useRef<THREE.Mesh>(null);

    const [moonTexture] = useTexture([moon]);

    useFrame(({ clock }) => {
        if (moonRef.current) {
            const angle = clock.getElapsedTime() * 0.00001
            const distance = 1
            const x = Math.sin(angle) * distance
            const z = Math.cos(angle) * distance
            moonRef.current.position.set(x, 0, z)
            moonRef.current.rotation.y += 0.001
        }
    });

    return (
        <mesh castShadow receiveShadow ref={moonRef} >
            <sphereGeometry args={[0.0025, 64, 64]} />
            <meshPhongMaterial map={moonTexture} />
        </mesh>
    );
}

export default Moon;
