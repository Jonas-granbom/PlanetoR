//uranus 206.9


import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import uranusMap from '../../assets/2k_uranus.jpg';



export function Uranus({ position, onUpdatePosition }) {

    const uranus = useLoader(THREE.TextureLoader, uranusMap);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const angle = clock.getElapsedTime() * 0.00001
            const distance = 206.9
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
                    <sphereGeometry args={[.0365, 128, 128]} />
                    <meshStandardMaterial
                        map={uranus}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
            </group>

        </>
    );
}
export default Uranus;