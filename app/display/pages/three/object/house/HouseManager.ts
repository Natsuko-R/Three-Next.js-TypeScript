import {
	AnimationMixer,
	AnimationObjectGroup,
	BoxGeometry,
	Clock,
	Group,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	Scene,
	Texture,
	TextureLoader,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// モデルのパス
const PATH_BASEWALL: string = "/models/BasicWall.glb";
const PATH_ENDWALL: string = "/models/EndWall.glb";
const PATH_BASEROOF: string = "/models/BasicRoof.glb";
const PATH_ENDROOF: string = "/models/EndRoof.glb";
const PATH_TRIANGLEWALL: string = "/models/TriangleWall.glb";

// モデルのスケール
const MODEL_SCALE = 50.0;
const MODEL_SPACING = 50.0;
const HOUSE_SPACING = 200;

const WARM_MATERIAL = new MeshBasicMaterial({ color: 0xFF9900, transparent: true, opacity: 0.5 });
const SHADE_MATERIAL = new MeshBasicMaterial({ color: 0xFFE599, transparent: true, opacity: 0.5 });

export default class HouseManager {
	public targetScene: Scene;
	public mixers: AnimationMixer[];
	public clock: Clock;
	public groupWinCur: Group;

	// ハウスの範囲
	public minRowPosZ: number;
	public maxRowPosZ: number;
	public minLinePosX: number;
	public maxLinePosX: number;

	public constructor(scene: Scene) {
		this.targetScene = scene;
		this.mixers = [];
		this.clock = new Clock();
		this.groupWinCur = new Group();

		// ハウスの範囲
		this.minRowPosZ = 0;
		this.maxRowPosZ = 0;
		this.minLinePosX = 0;
		this.maxLinePosX = 0;
	}

	// ハウスオブジェクト配列にしたがってモデルを配置
	public createHouse(
		houseWidth: number,
		houseLength: number,
		floorType: number,
	) {
		// houseWidth --> line
		// houseLength --> row

		// 列の計算
		this.minRowPosZ = (-houseLength * MODEL_SPACING) / 2;
		this.maxRowPosZ = (houseLength * MODEL_SPACING) / 2;

		// 行の計算
		this.minLinePosX = (-houseWidth * HOUSE_SPACING) / 2;
		this.maxLinePosX = (houseWidth * HOUSE_SPACING) / 2;

		this.createBaseWall(houseWidth, houseLength);
		this.createBaseRoof(houseWidth, houseLength);
		this.createEndRoof(houseWidth);
		this.createTriangleWall(houseWidth);
		this.createEndWall(houseWidth);
		this.createFloor(floorType);
		this.createLRWindow()

		this.targetScene.add(this.groupWinCur);

	}

	// 壁の作成
	public createBaseWall(houseWidth: number, houseLength: number) {
		// ローダの作成
		const loader = new GLTFLoader();

		// モデルの読み込み
		loader.load(
			PATH_BASEWALL,
			(gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

				// 登録用グループ
				const group = new Group();

				// 側面の壁を作成 lineで指定回数実行
				for (let i = 0; i < houseLength; i++) {
					// 左側
					const modelLeft = baseModel.clone();
					modelLeft.rotation.y = -0.5 * Math.PI;

					// 座標設定
					modelLeft.position.x = this.minLinePosX;
					modelLeft.position.y = 0;
					modelLeft.position.z = this.minRowPosZ + i * MODEL_SPACING + 25;

					// 右側
					const modelRight = baseModel.clone();
					modelRight.rotation.y = 0.5 * Math.PI;

					// 座標設定
					modelRight.position.x = this.maxLinePosX;
					modelRight.position.y = 0;
					modelRight.position.z = this.minRowPosZ + i * MODEL_SPACING + 25;

					// 登録用グループに登録
					group.add(modelLeft);
					group.add(modelRight);
				}

				// 繰り返す回数を設定
				const repeat = 4 * houseWidth;

				// 前面・後面の壁を作成
				for (let i = 0; i < repeat; i++) {
					// 背面
					const modelBack = baseModel.clone();
					modelBack.rotation.y = 1 * Math.PI;

					// 座標設定
					modelBack.position.x = this.maxLinePosX - i * MODEL_SPACING - 25;
					modelBack.position.y = 0;
					modelBack.position.z = this.minRowPosZ;

					// 後面
					const modelFront = baseModel.clone();

					// 座標設定
					modelFront.position.x = this.minLinePosX + i * MODEL_SPACING + 25;
					modelFront.position.y = 0;
					modelFront.position.z = this.maxRowPosZ;

					// 背面を登録
					group.add(modelFront);

					// 前面はスペースを開ける
					if (i === repeat / 2 || i === repeat / 2 - 1) {
						continue;
					} else {
						// 登録用グループに登録
						group.add(modelBack);
					}
				}

				// モデルをシーンに追加
				this.targetScene.add(group);
			},
			undefined,
			() => {
				// モデル読み込み失敗時
				console.error("HouseManager: failed on loading " + PATH_BASEWALL);
			}
		);
	}

	// 壁の作成
	public createTriangleWall(houseWidth: number) {
		// ローダの作成
		const loader = new GLTFLoader();

		// モデルの読み込み
		loader.load(
			PATH_TRIANGLEWALL,
			(gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

				// 登録用グループ
				const group = new Group();

				// 前面の壁を作成 lineで指定回数実行
				for (let i = 0; i < houseWidth; i++) {
					// 前
					const modelFront = baseModel.clone();

					// 座標設定
					modelFront.position.x = this.minLinePosX + i * HOUSE_SPACING + 100;
					modelFront.position.y = 100;
					modelFront.position.z = this.maxRowPosZ;

					// 後
					const modelBack = baseModel.clone();

					// 座標設定
					modelBack.position.x = this.minLinePosX + i * HOUSE_SPACING + 100;
					modelBack.position.y = 100;
					modelBack.position.z = this.minRowPosZ;

					// 登録用グループに登録
					group.add(modelFront);
					group.add(modelBack);
				}

				// モデルをシーンに追加
				this.targetScene.add(group);
			},
			undefined,
			() => {
				// モデル読み込み失敗時
				console.error("HouseManager: failed on loading " + PATH_TRIANGLEWALL);
			}
		);
	}

	// 屋根の作成
	public createBaseRoof(houseWidth: number, houseLength: number) {
		// ローダの作成
		const loader = new GLTFLoader();

		// モデルの読み込み
		loader.load(
			PATH_BASEROOF,
			(gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

				// 登録用グループ
				const group = new Group();
				group.name = "BaseRoofs";

				// lineで指定回数実行
				for (let j = 0; j < houseWidth; j++) {
					const windowGroup = new Group();
					const animationGroup = new AnimationObjectGroup();
					const mixer = new AnimationMixer(animationGroup);

					// rowで指定回数実行
					for (let i = 0; i < houseLength; i++) {
						// 左側
						const modelLeft = baseModel.clone();
						modelLeft.rotation.y = -0.5 * Math.PI;

						// 座標設定
						modelLeft.position.x = this.minLinePosX + j * HOUSE_SPACING + 50;
						modelLeft.position.y = 100;
						modelLeft.position.z = this.minRowPosZ + i * MODEL_SPACING + 50;

						// 右側
						const modelRight = baseModel.clone();
						modelRight.rotation.y = 0.5 * Math.PI;

						// 座標設定
						modelRight.position.x = this.minLinePosX + j * HOUSE_SPACING + 150;
						modelRight.position.y = 100;
						modelRight.position.z = this.minRowPosZ + i * MODEL_SPACING;

						// 登録用グループに登録
						windowGroup.add(modelLeft, modelRight);
						animationGroup.add(modelLeft, modelRight);
					}

					const action = mixer.clipAction(gltf.animations[2]);
					action.setDuration(5);
					action.play();
					this.mixers.push(mixer);

					group.add(windowGroup);
				}
				this.targetScene.add(group);
			},
			undefined,
			() => {
				console.error("HouseManager: failed on loading " + PATH_BASEROOF);
			}
		);
	}

	// 屋根の終わりの作成
	public createEndRoof(houseWidth: number) {
		// ローダの作成
		const loader = new GLTFLoader();

		// モデルの読み込み
		loader.load(
			PATH_ENDROOF,
			(gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

				// 登録用グループ
				const group = new Group();

				// lineで指定回数実行
				for (let i = 0; i < houseWidth; i++) {
					// 左側
					const modelLeft = baseModel.clone();
					modelLeft.rotation.y = -0.5 * Math.PI;

					// 座標設定
					modelLeft.position.x = this.minLinePosX + i * HOUSE_SPACING + 50;
					modelLeft.position.y = 100;
					modelLeft.position.z = this.minRowPosZ;

					// 右側
					const modelRight = baseModel.clone();
					modelRight.rotation.y = 0.5 * Math.PI;

					// 座標設定
					modelRight.position.x = this.minLinePosX + i * HOUSE_SPACING + 150;
					modelRight.position.y = 100;
					modelRight.position.z = this.maxRowPosZ;

					// 登録用グループに登録
					group.add(modelLeft);
					group.add(modelRight);
				}

				// モデルをシーンに追加
				this.targetScene.add(group);
			},
			undefined,
			() => {
				// モデル読み込み失敗時
				console.error("HouseManager: failed on loading " + PATH_ENDROOF);
			}
		);
	}

	// 壁の終わりを作成
	public createEndWall(houseWidth: number) {
		// ローダの作成
		const loader = new GLTFLoader();

		// モデルの読み込み
		loader.load(
			PATH_ENDWALL,
			(gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

				const group = new Group();
				group.name = "EndWalls";
				// 座標設定
				const targetCount = (houseWidth * 4) / 2;
				baseModel.position.x =
					this.minLinePosX + targetCount * MODEL_SPACING + 50;
				baseModel.position.y = 0;
				baseModel.position.z = -this.maxRowPosZ;

				group.add(baseModel);
				this.targetScene.add(group);
			},
			undefined,
			() => {
				// モデル読み込み失敗時
				console.error("HouseManager: failed on loading " + PATH_ENDWALL);
			}
		);
	}

	public createLRWindow() {

		const geometry = new BoxGeometry(1, 1, this.maxRowPosZ * 2);
		const material = new MeshBasicMaterial({ color: 0x878787, transparent: true, opacity: 0.4 });

		const left = new Mesh(geometry, material);
		left.name = "leftWindow"
		left.rotation.z = Math.PI / 2;
		left.position.setX(this.maxLinePosX)

		const right = left.clone()
		right.name = "rightWindow"
		right.position.setX(this.minLinePosX)

		const geometryBack = new BoxGeometry(this.maxLinePosX * 2, 1, 1);
		const back = new Mesh(geometryBack, material);
		back.name = "backWindow"
		back.rotation.x = Math.PI / 2;
		back.position.setZ(this.maxRowPosZ)

		this.groupWinCur.add(left, right, back);
	}

	public createOneCurtain() {

		const geometry = new BoxGeometry(1, 1, this.maxRowPosZ * 2);

		// warm curtain
		const warmL = new Mesh(geometry, WARM_MATERIAL);
		warmL.name = "leftWarmC"
		warmL.position.set(this.maxLinePosX, 103, 0)

		const warmR = warmL.clone()
		warmR.name = "rightWarmC"
		warmR.position.set(this.minLinePosX, 103, 0)

		// shade curtain
		const shadeL = new Mesh(geometry, SHADE_MATERIAL);
		shadeL.name = "leftShadeC"
		shadeL.position.set(this.maxLinePosX, 98, 0)

		const shadeR = shadeL.clone()
		shadeR.name = "rightShadeC"
		shadeR.position.set(this.minLinePosX, 98, 0)

		// add to group
		this.groupWinCur.add(warmL, warmR, shadeL, shadeR);
	}

	public createCurtains(roofNumber: number) {

		const geometry = new BoxGeometry(1, 1, this.maxRowPosZ * 2);

		for (let i = 0; i < roofNumber; i++) {

			// warm curtain
			const warmL = new Mesh(geometry, WARM_MATERIAL);
			warmL.name = `WarmCurtainL${i + 1}`
			warmL.position.setY(103)

			const warmR = warmL.clone()
			warmR.name = `WarmCurtainR${i + 1}`

			// shade curtain
			const shadeL = new Mesh(geometry, SHADE_MATERIAL);
			shadeL.name = `ShadeCurtainL${i + 1}`
			shadeL.position.setY(98)

			const shadeR = shadeL.clone()
			shadeR.name = `ShadeCurtainR${i + 1}`

			// add to group
			this.groupWinCur.add(warmL, shadeL, warmR, shadeR)

		}
	}

	// ハウスの地面の作成
	public async createFloor(floorType: number) {
		try {
			const width = Math.abs(this.minLinePosX) + Math.abs(this.maxLinePosX);
			const height = Math.abs(this.minRowPosZ) + Math.abs(this.maxRowPosZ);

			let pathTexture: string;

			switch (floorType) {
				case 1:
					pathTexture = "/texture/floor1.png";
					break;
				case 2:
					pathTexture = "/texture/floor2.png";
					break;
				default:
					pathTexture = "/texture/floor1.png";
					break;
			}

			const texture = await this.loadTexture(pathTexture);

			const geometry = new PlaneGeometry(width, height, 1, 1);
			const material = new MeshStandardMaterial({ map: texture });
			const model = new Mesh(geometry, material);
			model.position.set(0, 0.05, 0);
			// 現在x軸上に起立しているためX軸に沿って90度回転
			model.rotation.x = -0.5 * Math.PI;

			const group = new Group();
			group.name = "HouseFloor";
			group.add(model);

			this.targetScene.add(group);
		} catch (error) {
			console.error("FloorManager: failed on loading ", error);
		}
	}

	public setRoofDegree(array: number[]) {

		const degree = array.map(deg => {
			if (deg < 0 || deg > 100) return 0
			return deg
		});

		const times = degree.map(deg => 4.9 * (deg * 0.01));
		times?.forEach((time, index) => {
			this.mixers[index] && this.mixers[index].setTime(time)
		});

	}

	public setLRWinDegree(degL: number, degR: number) {

		for (const child of this.groupWinCur.children) {
			if (child instanceof Mesh) {
				if (degL > 0 && child.name === "leftWindow") {
					child.scale.x = degL;
					child.position.setY(100 - (degL / 10) * 5)
				}
				if (degR > 0 && child.name === "rightWindow") {
					child.scale.x = degR;
					child.position.setY(100 - (degR / 10) * 5)
				}
				// if (child.name === "backWindow") {
				// 	child.scale.z = 50;
				// 	child.position.setY(75)
				// }
			}
		}
	}

	public setOneCurtainDegree(warmDeg: number, shadeDeg: number) {

		if (warmDeg < 0 || shadeDeg < 0) return

		const wd = warmDeg / 100 * this.maxLinePosX
		const sd = shadeDeg / 100 * this.maxLinePosX

		for (const child of this.groupWinCur.children) {
			if (child instanceof Mesh) {
				if (child.name === "leftWarmC") {
					child.scale.x = wd;
					child.position.setX(this.minLinePosX + wd / 2)
				}
				if (child.name === "rightWarmC") {
					child.scale.x = wd;
					child.position.setX(this.maxLinePosX - wd / 2)
				}
				if (child.name === "leftShadeC") {
					child.scale.x = sd;
					child.position.setX(this.minLinePosX + sd / 2)
				}
				if (child.name === "rightShadeC") {
					child.scale.x = sd;
					child.position.setX(this.maxLinePosX - sd / 2)
				}
			}
		}
	}

	public setCurtainsDegree(arrW: number[], arrS: number[]) {

		// warm

		const warmDegs = arrW.reverse()
		const WarmLeft = this.groupWinCur.children.filter(c => c.name.startsWith("WarmCurtainL"))
		const WarmRight = this.groupWinCur.children.filter(c => c.name.startsWith("WarmCurtainR"))

		WarmLeft?.forEach((child, idx) => {
			if (child.name.endsWith(`${idx + 1}`)) {
				child.scale.x = warmDegs[idx]
			}
			child.position.setX((idx + 1) * 200 - warmDegs[idx] / 2 - this.maxLinePosX)
		})

		WarmRight?.forEach((child, idx) => {
			if (child.name.endsWith(`${idx + 1}`)) {
				child.scale.x = warmDegs[idx]
			}
			child.position.setX(idx * 200 + warmDegs[idx] / 2 - this.maxLinePosX)
		})

		// shade

		const shadeDegs = arrS.reverse()
		const ShadeLeft = this.groupWinCur.children.filter(c => c.name.startsWith("ShadeCurtainL"))
		const ShadeRight = this.groupWinCur.children.filter(c => c.name.startsWith("ShadeCurtainR"))

		ShadeLeft?.forEach((child, idx) => {
			if (child.name.endsWith(`${idx + 1}`)) {
				child.scale.x = shadeDegs[idx]
			}
			child.position.setX((idx + 1) * 200 - shadeDegs[idx] / 2 - this.maxLinePosX)
		})

		ShadeRight?.forEach((child, idx) => {
			if (child.name.endsWith(`${idx + 1}`)) {
				child.scale.x = shadeDegs[idx]
			}
			child.position.setX(idx * 200 + shadeDegs[idx] / 2 - this.maxLinePosX)
		})

	}

	private loadTexture(path: string): Promise<Texture> {
		return new Promise((resolve, reject) => {
			const loader = new TextureLoader();
			loader.load(
				path,
				(texture) => {
					resolve(texture);
				},
				undefined,
				(error) => {
					reject(error);
				}
			);
		});
	}

}
