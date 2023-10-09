import { Scene, PerspectiveCamera, Vector3 } from "three"

const FOV: number = 45
const NEAR: number = 10
const FAR: number = 2500
const BASE_POSITION: Vector3 = new Vector3(0, 500, -1000)
const BASE_LOOKAT: Vector3 = new Vector3(0, 0, 0)

export default class PerspectiveCameraManager {
    private camera: PerspectiveCamera
    private canvasWidth: number
    private canvasHeight: number
    private fov: number
    private near: number
    private far: number

    public constructor(width: number, height: number, scene: Scene) {
        this.fov = FOV
        this.canvasWidth = width
        this.canvasHeight = height
        this.near = NEAR
        this.far = FAR

        this.camera = new PerspectiveCamera(this.fov, this.canvasWidth / this.canvasHeight, this.near, this.far)

        this.setPosition(BASE_POSITION)
        this.setLookAt(BASE_LOOKAT)
    }

    public setPosition(position: Vector3) {
        this.camera.position.set(position.x, position.y, position.z)
    }

    public setLookAt(position: Vector3) {
        this.camera.lookAt(position.x, position.y, position.z)
    }

    public setAspect(width: number, height: number) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
    }

    public getCamera() {
        return this.camera
    }
}