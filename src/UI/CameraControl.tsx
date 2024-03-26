import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import gsap from 'gsap';

const CameraControl = ({ setControlFunctions }) => {
    const { camera } = useThree();

    useEffect(() => {
        const zoomIn = (targetPosition, cameraDistance, offsetX = 0, offsetY = 0) => {
            const offsetPosition = new THREE.Vector3(
                targetPosition.x + offsetX,
                targetPosition.y + offsetY,
                targetPosition.z + cameraDistance
            );

            gsap.to(camera.position, {
                x: offsetPosition.x,
                y: offsetPosition.y,
                z: offsetPosition.z,
                duration: 2,
                ease: "power2.inOut",
            });
        };
        setControlFunctions({ zoomIn });
    }, [camera, setControlFunctions]);

    return null;
};

export default CameraControl;
