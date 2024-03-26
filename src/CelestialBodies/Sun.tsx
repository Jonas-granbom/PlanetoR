
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';

import sunMap from '../../assets/8k_sun.jpg';
import Orbit from './Orbit';

function Sun({ position }) {
    const sunTexture = useLoader(THREE.TextureLoader, sunMap)
    const sunRef = useRef<THREE.Mesh>(null);

    
    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.001;
        }
    });
    return (
        <mesh ref={sunRef} position={position} >
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                map={sunTexture}
                emissive={0xffff00}
                emissiveIntensity={4}
                emissiveMap={sunTexture}
            />
            <Orbit distance={4.2} />
            <Orbit distance={7.7} />
            <Orbit distance={10.8} />
            <Orbit distance={16.4} />
            <Orbit distance={56} />

            <pointLight intensity={800} />
        </mesh>
    );
}
export default Sun;