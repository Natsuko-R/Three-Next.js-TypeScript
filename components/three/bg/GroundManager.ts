import { Scene, Vector3, TextureLoader, Texture, CircleGeometry, MeshStandardMaterial, Mesh } from "three"

import ObjectData from "../object/object-data/ObjectData"

const TEXTURE_PATH: string = '/images/ground_01.jpg'

const GROUND_RADIUS: number = 1000
const GROUND_SEGMENT: number = 24

const BASE_POSITION: Vector3 = new Vector3(0, -0.05, 0)
const BASE_ROTATION_X: number = -0.5 * Math.PI

export default class GroundManager {
    private targetScene: Scene
    private textureLoader: TextureLoader
    private texture: Texture
    private geometry: CircleGeometry
    private material: MeshStandardMaterial
    private model: Mesh

    public constructor(scene: Scene) {
        this.targetScene = scene
        this.textureLoader = new TextureLoader()
        this.texture = new Texture()
        this.geometry = new CircleGeometry(GROUND_RADIUS, GROUND_SEGMENT)
        this.material = new MeshStandardMaterial()
        this.model = new Mesh()
    }

    public addGround() {
        this.texture = this.textureLoader.load(
            TEXTURE_PATH,
            () => {
                // console.log(" GroundManager : succeeded on loading " + TEXTURE_PATH)
            },
            undefined,
            () => {
                console.log(" GroundManager : failed on loading " + TEXTURE_PATH);
                return
            }
        )

        this.material.map = this.texture

        this.model.geometry = this.geometry
        this.model.material = this.material
        this.model.position.set(BASE_POSITION.x, BASE_POSITION.y, BASE_POSITION.z)
        this.model.rotateX(BASE_ROTATION_X)

        const objectData = new ObjectData(this.model, 99999, "ground")
        this.model.userData = objectData

        this.targetScene.add(this.model)
    }

    public terminate() {
        this.texture.dispose()
    }

    public getModel() {
        return this.model
    }
}