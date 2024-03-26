
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import jupiterMap from '../../assets/8k_jupiter.jpg';



export function Jupiter({ position, onUpdatePosition }) {

    const jupiter = useLoader(THREE.TextureLoader, jupiterMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.00005
            const distance = 56
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
                    <sphereGeometry args={[.1006, 128, 128]} />
                    <meshStandardMaterial
                        map={jupiter}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
            </group>

        </>
    );
}
export default Jupiter;