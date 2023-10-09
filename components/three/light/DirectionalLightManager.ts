import { Scene, DirectionalLight } from "three"

const LIGHT_COLOR: number = 0xffffff
const LIGHT_INTENSITY: number = 1

export default class DirectionalLightManager {
    private directionalLight: DirectionalLight

    public constructor(scene: Scene) {
        this.directionalLight = new DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)

        scene.add(this.directionalLight)
    }

    public terminate() {
        this.directionalLight.dispose()
    }
}