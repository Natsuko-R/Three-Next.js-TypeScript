import OuterCurtainManager from "./OuterCurtainManager";

const BOX_COLOR: object = { color: 0x808080 }
const CURTAIN_SPACING: number = -2

export default class InnerCurtainManager extends OuterCurtainManager {

    public constructor(line: number, row: number, minRowPosZ: number, maxRowPosZ: number, minLinePosX: number, maxLinePosX: number) {

        // 親クラスのコンストラクタ
        super(line, row, minRowPosZ, maxRowPosZ, minLinePosX, maxLinePosX)

        this.color = BOX_COLOR
        this.spacing = CURTAIN_SPACING

        this.systemNumLeft = 30 
        this.systemNumRight = 28

    };
}