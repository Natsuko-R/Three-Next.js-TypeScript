import { Group, Scene, Sprite, SpriteMaterial, TextureLoader, Vector3 } from "three";

const SPRITE_PATH: string = "/texture/sprite.png"
const SPRITE_SCALE: number = 50;
const MOVE_VALUE: number = 50;

const pipesPosition = [
    { posX: 250, posY: 35, posZ: 0 },
    { posX: 150, posY: 35, posZ: 0 },
    { posX: 50, posY: 35, posZ: 0 },
    { posX: -50, posY: 35, posZ: 0 },
    { posX: -150, posY: 35, posZ: 0 },
    { posX: -250, posY: 35, posZ: 0 }
]

export default class SpriteManager {

    public scene: Scene;
    public sprite: Sprite;
    public spriteGroup: Group;
    public isEmitting: boolean[];
    public spriteMaterial: SpriteMaterial;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.spriteGroup = new Group();
        this.isEmitting = [];

        this.spriteMaterial = new SpriteMaterial({
            map: new TextureLoader().load(SPRITE_PATH),
            opacity: 0.8,
            rotation: Math.PI / 2 // 设置旋转角度为90度（Math.PI/2弧度）
        });
        this.sprite = new Sprite(this.spriteMaterial);
    }

    public initSprite(states: boolean[]) {

        this.clearSprites()

        this.isEmitting = states

        this.sprite.scale.set(SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE)

        for (let i = 0; i < pipesPosition.length; i++) {

            for (let j = 0; j < 4; j++) {

                const initialPosition = new Vector3(pipesPosition[i].posX, pipesPosition[i].posY, j * 50)

                const sprite = this.sprite.clone()
                sprite.position.copy(initialPosition)

                sprite.userData.initialPosition = initialPosition
                sprite.userData.emitFlag = this.isEmitting[i]

                if (this.isEmitting[i]) {
                    this.spriteGroup.add(sprite)
                }
            }
        }

        this.scene.add(this.spriteGroup)

    }

    public emitSprite() {

        this.spriteGroup.traverse(child => {

            if (child instanceof Sprite) {

                if (child.userData.emitFlag) {
                    child.position.z++

                    if (child.position.z > child.userData.initialPosition.z + MOVE_VALUE) {
                        child.position.copy(child.userData.initialPosition)
                    }
                }
            }

        })
    }

    private clearSprites() {
        this.spriteGroup.children.length = 0
    }


}