import { DeviceWithSize } from "@/actions/get-3d-data";
import { Scene, Sprite, SpriteMaterial, TextureLoader, Vector3 } from "three";

const TEXTURE_PATH = "/texture/co2_purple.png";
const SPRITE_SCALE = 30.0;
const PIPE_MODEL_SCALE = 30;
const OFFSET = 25;
const EMIT_RATE = 0.7;

export default class SpriteManager {

    public scene: Scene;
    public sprite: Sprite;
    public sprites: Sprite[];

    public constructor(scene: Scene, arr: DeviceWithSize[]) {

        this.scene = scene;
        const spriteMaterial = new SpriteMaterial({
            map: new TextureLoader().load(TEXTURE_PATH),
            opacity: 0.8,
        });
        this.sprite = new Sprite(spriteMaterial)
        this.sprite.scale.set(SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE);
        this.sprites = [];

        arr.forEach(p => {
            const spriteCount = PIPE_MODEL_SCALE * p.size / OFFSET;
            const halfSpriteLength = PIPE_MODEL_SCALE * p.size / 2;

            for (let i = 0; i < spriteCount; i++) {

                const originPosZ = i * OFFSET - halfSpriteLength;

                const obj = this.sprite.clone();
                obj.position.set(p.posX, p.posY, originPosZ);
                obj.userData.originPosZ = originPosZ;

                this.scene.add(obj);
                this.sprites.push(obj);
            }
        })
    }

    public updateSprites() {

        this.sprites.forEach(sprite => {
            sprite.position.z += EMIT_RATE;            

            if (sprite.position.z > sprite.userData.originPosZ + OFFSET) {
                sprite.position.z = sprite.userData.originPosZ;
            }
        })
    }


}