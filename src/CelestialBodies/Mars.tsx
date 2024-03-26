
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import marsMap from '../../assets/8k_mars.jpg';



export function Mars({ position, onUpdatePosition }) {
    const venus = useLoader(THREE.TextureLoader, marsMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.000011
            const distance = 16.4
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
                    <sphereGeometry args={[0.0049, 128, 128]} />
                    <meshStandardMaterial
                        map={venus}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
            </group>

        </>
    );
}
export default Mars;