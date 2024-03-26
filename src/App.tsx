import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, ScrollControls, Html, } from "@react-three/drei";
import './index.css'
import * as THREE from 'three';
import Earth from './CelestialBodies/Earth';
import Sun from './CelestialBodies/Sun';
import Mercury from './CelestialBodies/Mercury';
import Venus from './CelestialBodies/Venus';
import Mars from './CelestialBodies/Mars';
import Jupiter from './CelestialBodies/Jupiter';
import { TextureLoader } from 'three';
import milkyWayMap from '../assets/8k_stars_milky_way.jpg';

import CameraControl from './UI/CameraControl';
import ZoomButton from './UI/ZoomButton';
import Saturn from './CelestialBodies/Saturn';
import Uranus from './CelestialBodies/Uranus';
import Neptune from './CelestialBodies/Neptune';


interface CameraControls {
  zoomIn?: (targetPosition: THREE.Vector3, cameraDistance: number, offsetX: number, offsetY: number) => void;
}

function Background() {
  const texture = useLoader(TextureLoader, milkyWayMap);
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} opacity={0.001} />
    </mesh>
  );
}

function App() {
  const [cameraControls, setCameraControls] = useState<CameraControls>({});
  const [mercuryPosition, setMercuryPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [venusPosition, setVenusPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [earthPosition, setEarthPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [marsPosition, setMarsPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [jupiterPosition, setJupiterPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [saturnPosition, setSaturnPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [uranusPosition, setUranusPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [neptunePosition, setNeptunePosition] = useState(new THREE.Vector3(0, 0, 0));



  return (
    <div className="h-[100vh] w-[100vw] relative">
      <Suspense fallback={<span>loading...</span>}>

        <Canvas
          camera={{ position: [4, 0, 5], near: 0.01, far: 1000 }}
        >
          <ambientLight intensity={1.0} />

          <ScrollControls pages={3} damping={0.25}>
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
            />
            <Background />
            <CameraControl setControlFunctions={setCameraControls} />

            <Sun position={[0, 0, 0]} />
            <Mercury position={[0, 0, 0]} onUpdatePosition={setMercuryPosition} />
            <Venus position={[0, 0, 0]} onUpdatePosition={setVenusPosition} />
            <Earth position={[0, 0, 0]} onUpdatePosition={setEarthPosition} />
            <Mars position={[0, 0, 0]} onUpdatePosition={setMarsPosition} />
            <Jupiter position={[0, 0, 0]} onUpdatePosition={setJupiterPosition} />
            <Saturn position={[0, 0, 0]} onUpdatePosition={setSaturnPosition} />
            <Uranus position={[0, 0, 0]} onUpdatePosition={setUranusPosition} />
            <Neptune position={[0, 0, 0]} onUpdatePosition={setNeptunePosition} />
          </ScrollControls>
          <Html fullscreen>
            <nav className="absolute px-10 py-6 tracking-widest text-white text-md bg-opacity-80">
              <div className='flex items-center gap-28'>
                <h1 className='flex-grow text-4xl'>PLANETOR</h1>
                <div className='flex flex-grow ml-10 gap-14'>
                  <div className='pt-2' >
                    <ZoomButton label="Mercury" onClick={() => cameraControls.zoomIn?.(mercuryPosition, 0.05, -0.03, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Venus" onClick={() => cameraControls.zoomIn?.(venusPosition, 0.05, -0.03, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Earth" onClick={() => cameraControls.zoomIn?.(earthPosition, 0.05, -0.03, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Mars" onClick={() => cameraControls.zoomIn?.(marsPosition, 0.03, -0.020, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Jupiter" onClick={() => cameraControls.zoomIn?.(jupiterPosition, 0.3, -0.18, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Saturn" onClick={() => cameraControls.zoomIn?.(saturnPosition, 0.5, -0.18, 0)} />
                  </div>
                  <div className='pt-2' >
                    <ZoomButton label="Uranus" onClick={() => cameraControls.zoomIn?.(uranusPosition, 0.2, -0.07, 0)} />
                  </div>
                  <div className='pt-2'>
                    <ZoomButton label="Neptune" onClick={() => cameraControls.zoomIn?.(neptunePosition, 0.2, -0.07, 0)} />
                  </div>
                </div >
              </div>
            </nav>
          </Html>
        </Canvas>
      </Suspense>

    </div>
  );
}

export default App;

