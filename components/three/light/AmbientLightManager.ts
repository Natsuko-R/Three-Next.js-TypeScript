import { Scene, AmbientLight } from "three"

const LIGHT_COLOR: number = 0xffffff
const LIGHT_INTENSITY: number = 2


export default class AmbientLightManager {
    private ambientLight: AmbientLight

    public constructor(scene: Scene) {
        this.ambientLight = new AmbientLight(LIGHT_COLOR, LIGHT_INTENSITY)

        scene.add(this.ambientLight)
    }

    public terminate() {
        this.ambientLight.dispose()
    }
}