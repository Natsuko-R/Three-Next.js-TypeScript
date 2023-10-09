import { Scene, WebGLRenderer, TextureLoader, Texture, WebGLCubeRenderTarget } from "three"

const TEXTURE_PATH: string = '/images/sky_01.jpg'

export default class SkyBoxManager {
    private targetScene: Scene
    private targetRenderer: WebGLRenderer
    private textureLoader: TextureLoader
    private texture: Texture
    private renderTarget: WebGLCubeRenderTarget

    public constructor(scene: Scene, renderer: WebGLRenderer) {
        this.targetScene = scene
        this.targetRenderer = renderer

        this.textureLoader = new TextureLoader()
        this.texture = new Texture()
        this.renderTarget = new WebGLCubeRenderTarget()
    }

    public addSkyBox() {
        this.texture = this.textureLoader.load(
            TEXTURE_PATH,
            () => {
                this.renderTarget = new WebGLCubeRenderTarget(this.texture.image.height) // ?
                this.renderTarget.fromEquirectangularTexture(this.targetRenderer, this.texture) // ?
                this.targetScene.background = this.renderTarget.texture // ?

                // console.log(" SkyBoxManager : succeeded on loading " + TEXTURE_PATH)
            },
            undefined,
            () => {
                console.log(" SkyBoxManager : failed on loading " + TEXTURE_PATH);
                // return
            }
        )
    }

    public terminate() {
        this.texture.dispose()
    }

}