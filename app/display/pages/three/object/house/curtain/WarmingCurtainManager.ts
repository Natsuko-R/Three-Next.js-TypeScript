import ShadingCurtainManager from "./ShadingCurtainManager";

const PLANE_COLOR = {color: 0xffa500};
const POSITION_Y = 97

export default class WarmingCurtainManager extends ShadingCurtainManager {

    public constructor(line: number, row: number, minRowPosZ: number, maxRowPosZ: number, minLinePosX: number, maxLinePosX: number) {

        // 親クラスのコンストラクタ
        super(line, row, minRowPosZ, maxRowPosZ, minLinePosX, maxLinePosX)

        this.color = PLANE_COLOR
        this.posY = POSITION_Y 

    };
}