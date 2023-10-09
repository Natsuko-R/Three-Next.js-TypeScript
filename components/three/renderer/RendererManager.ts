import { Camera, Scene, WebGLRenderer } from "three"

const CANVAS_NAME: string = "#glcanvas"
const CLEAR_COLOR: number = 0x2A2A2A
const CLEAR_ALPHA: number = 1

export default class RendererManager {

    private renderer: WebGLRenderer
    private canvasWidth: number
    private canvasHeight: number
    private targetScene: Scene
    private targetCamera: Camera

    public constructor(width: number, height: number, scene: Scene, camera: Camera) {

        this.canvasWidth = width
        this.canvasHeight = height
        this.targetScene = scene
        this.targetCamera = camera

        this.renderer = new WebGLRenderer({
            canvas: document.querySelector(CANVAS_NAME) as HTMLCanvasElement
        })

        this.renderer.setSize(this.canvasWidth, this.canvasHeight)
        this.renderer.setPixelRatio(1)
        this.renderer.setClearColor(CLEAR_COLOR, CLEAR_ALPHA)

    }

    public render() {
        this.renderer.render(this.targetScene, this.targetCamera)
    }

    public resize(width: number, height: number) {
        this.canvasWidth = width
        this.canvasHeight = height

        this.renderer.setSize(this.canvasWidth, this.canvasHeight)
    }

    public getRenderer() {
        return this.renderer
    }

    public terminate() {
        this.renderer.dispose()
    }
}