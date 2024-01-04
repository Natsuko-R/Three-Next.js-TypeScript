import { Scene, Object3D, Clock, AnimationClip, AnimationMixer, LoopRepeat, AnimationAction, Group } from "three";
import ObjectManager from "./ObjectManager";
import { Device } from "@/actions/get-3d-data";

export default class AnimationObjectManager extends ObjectManager {

    public animations: AnimationClip[];
    public mixers: AnimationMixer[];
    public actions: AnimationAction[];
    public clocks: Clock[];

    public constructor(scene: Scene) {

        super(scene);

        this.animations = [];
        this.mixers = [];
        this.actions = [];
        this.clocks = [];

    }

    public async addDevices(array: Device[]) {

        if (!array || array.length === 0) return;

        try {
            const gltf = await this.loadGltfModel(this.pathModel);
            this.baseModel = gltf.scene;

            const group = new Group();
            group.name = array[0].attribute;

            for (let i = 0; i < array.length; i++) {

                const { deviceId, attribute, place_type, loc_id, type_id, posX, posY, posZ, rotY, state } = array[i];

                const model: Object3D = this.baseModel.clone();
                model.name = attribute;
                const objectData = this.newUserData(model, deviceId, attribute, place_type, loc_id, type_id, posX, posY, posZ, rotY, state, 1, "");
                model.traverse(m => m.userData = objectData);
                model.scale.set(this.scaleModel, this.scaleModel, this.scaleModel);
                model.position.set(posX, posY, posZ);
                model.rotation.y = rotY * (Math.PI / 180);

                this.targetScene.add(model);


                // アニメーションの設定
                if (gltf.animations) {

                    const clock: Clock = new Clock();
                    this.clocks.push(clock);

                    model.animations = Array.from(gltf.animations);

                    const mixer: AnimationMixer = new AnimationMixer(model);
                    this.mixers.push(mixer);

                    const clipActionNumber = (attribute === "ExhaustFan") ? 0 : 1;
                    const action: AnimationAction = mixer.clipAction(model.animations[clipActionNumber]);
                    // console.log("action", action);

                    action.setDuration(1.5);
                    action.setLoop(LoopRepeat, Infinity);
                    action.clampWhenFinished = true;
                    this.actions.push(action);
                    action.play();
                    // if (state === 1) { action.play() };
                }
                this.children.push(model);
                // group.add(model);
            }

            // this.targetScene.add(group);

        } catch (error) {
            console.log("ObjectManager: failed on loading " + this.pathModel);
            console.error(error);
        }
    };

    public updateFanAnimation(deviceId: number, state: number) {

        console.log("DDD", deviceId, state);


        const target = this.actions.find(a => this.getChildByDeviceId(deviceId) === a.getRoot());
        console.log("state === 1", state === 1);
        console.log("target", target?.play());

        target && (state === 1 ? target.play() : target.stop());

    };

}