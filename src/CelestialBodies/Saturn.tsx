import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import SaturnMap from '../../assets/8k_saturn.jpg';
import SaturnRings from '../../assets/saturnring.png';

export function Saturn({ position, onUpdatePosition }) {
    const saturnTexture = useLoader(THREE.TextureLoader, SaturnMap);
    const saturnRingsTexture = useLoader(THREE.TextureLoader, SaturnRings);

    const groupRef = useRef<THREE.Group>(null);



    useFrame(({ clock }) => {
        if (groupRef.current) {
            const elapsedTime = clock.getElapsedTime();
            // Orbital motion around the Sun
            const orbitalAngle = elapsedTime * 0.00005;
            const orbitalDistance = 103.1;
            const x = Math.sin(orbitalAngle) * orbitalDistance;
            const z = Math.cos(orbitalAngle) * orbitalDistance;
            groupRef.current.position.set(x, 0, z);

            // Simulate day/night cycle by rotating Saturn around its y-axis
            groupRef.current.children.forEach((child, index) => {
                if (index === 0) { // Assuming the first child is Saturn itself
                    child.rotation.y += 0.005;
                } else {
                    // Optional: Animate rings individually
                    child.rotation.z += -0.0015 + index * -0.001;
                }
            });

            // Update the position for external use if necessary
            if (typeof onUpdatePosition === 'function') {
                onUpdatePosition(groupRef.current.position.clone());
            }
        }
    });

    // Convert tilt angle to radians
    const tiltAngleRadians = 26.7 * (Math.PI / 180); // Saturn's axial tilt

    return (
        <>
            <group ref={groupRef} position={position} rotation={[0, 0, tiltAngleRadians]}>
                <mesh>
                    <sphereGeometry args={[.0837, 128, 128]} />
                    <meshStandardMaterial map={saturnTexture} metalness={0.4} roughness={0.4} />
                </mesh>
                {[{ inner: 0.12, outer: 0.15, opacity: 0.5 }, { inner: 0.152, outer: 0.178 }, { inner: 0.179, outer: 0.25 }].map((ring, index) => (
                    <mesh
                        key={index}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <ringGeometry args={[ring.inner, ring.outer, 128]} />
                        <meshBasicMaterial
                            map={saturnRingsTexture}
                            side={THREE.DoubleSide}
                            transparent={true}
                            opacity={index === 0 ? ring.opacity : 1} />
                    </mesh>
                ))}
            </group>
        </>
    );
}

export default Saturn;
