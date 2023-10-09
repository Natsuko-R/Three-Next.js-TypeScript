import { Scene, Object3D, Mesh } from "three"

export default class SceneManager {
    private scene: Scene

    public constructor() {
        this.scene = new Scene()
    }

    public add(object: Object3D) {
        this.scene.add(object)
    }

    public getScene() {
        return this.scene
    }

    public terminate() {

        this.scene.traverse(child => {
            if (child instanceof Mesh) {
                if (child.geometry) {
                    child.geometry.dispose()
                }

                if (child.material) {

                    if (Array.isArray(child.material)) {
                        child.material.forEach(child => child.material.dispose())
                    }
                    else {
                        child.material.dispose()
                    }

                }
            }
        })

    }
}