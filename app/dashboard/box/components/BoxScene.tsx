// BoxScene.tsx
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import BoxInfo from './BoxInfo';

interface BoxSceneProps {
    boxes: BoxInfo[];
    // onBoxClick: (box: BoxInfo) => void;
}

const BoxScene: React.FC<BoxSceneProps> = ({ boxes }) => {

    const [boxMeshes, setBoxMeshes] = useState<THREE.Mesh[]>([])


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        boxes.forEach((box, index) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);

            cube.position.x = index * 2;

            cube.userData = {
                id: box.id,
                name: box.name,
            };

            // cube.onClick = () => {
            //     onBoxClick(cube.userData);
            // };

            scene.add(cube);

            setBoxMeshes((prevBoxMeshes) => [...prevBoxMeshes, cube])
        });

        scene.addEventListener('click', (event) => {
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            const onMouseMove = (event: MouseEvent) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            };

            const onClick = () => {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(boxMeshes);

                if (intersects.length > 0) {
                    const selectedBox = intersects[0].object as THREE.Mesh;
                    const { id, name } = selectedBox.userData as BoxInfo;
                    console.log(`Clicked Box - ID: ${id}, Name: ${name}`);
                }
            };

            raycaster.setFromCamera(mouse, camera);

        })

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            boxMeshes.forEach((box) => {
                box.rotation.x += 0.01;
                box.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        };

        animate();
    }, [boxes]);

    return null;
};

export default BoxScene;
