import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from 'three';

export function Orbit({ distance }) {
    const points = useMemo(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 360; i++) {
            const angle = THREE.MathUtils.degToRad(i);
            const x = Math.sin(angle) * distance;
            const z = Math.cos(angle) * distance;
            points.push(new THREE.Vector3(x, 0, z));
        }
        return points;
    }, [distance]);

    return <Line points={points} color="white" lineWidth={0.2} />;
}

export default Orbit
