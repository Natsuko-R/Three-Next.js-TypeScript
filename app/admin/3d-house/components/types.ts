import { ControllerRenderProps } from "react-hook-form";

type Schema = {
    posX: string
}

export type SchemaKey = keyof Schema

export type IFieldType<T extends SchemaKey> = ControllerRenderProps<Schema, T>

export const DeviceAttributes = [
    { attribute: "ExhaustFan", infoType: "換気扇" },
    { attribute: "CircuratorFan", infoType: "循環扇" },
    { attribute: "CO2Sensor", infoType: "CO2センサー" },
    { attribute: "SolarRadSensor", infoType: "日射センサー" },
    { attribute: "WindSensor", infoType: "風速センサー" },
    { attribute: "RainSensor", infoType: "感雨センサー" },
    { attribute: "Heater", infoType: "加温器" },
    { attribute: "HeaterGray", infoType: "加温器(灰)" },
    { attribute: "HeatPump", infoType: "ヒートパンプ" },
    { attribute: "WaterTank", infoType: "タンク" },
    { attribute: "WaterTankBlack", infoType: "タンク(黒)" },
    { attribute: "ControlPanel", infoType: "制御盤" },
    { attribute: "Co2GasCylinder", infoType: "CO2ガスボンベ" },
    { attribute: "Plant1", infoType: "作物：イチゴ" },
    { attribute: "Plant2", infoType: "作物：トマト" },
    { attribute: "Co2Pipe", infoType: "CO2パイプ" },
    { attribute: "Compressor", infoType: "圧縮機" },
    { attribute: "SignBoard", infoType: "看板" },
    { attribute: "AirCylinder", infoType: "エアシリンダー" },
    { attribute: "Led1", infoType: "Led1" },
    { attribute: "Led2", infoType: "Led2" },
    { attribute: "Led3", infoType: "Led3" },
    { attribute: "Led4", infoType: "Led4" },
    { attribute: "Gen3", infoType: "Gen3" },
    { attribute: "Gen4", infoType: "Gen4" },
    { attribute: "PhSensor", infoType: "PHセンサー" },
    { attribute: "SoilSensor", infoType: "土壌センサー" },
    { attribute: "PressureSensor", infoType: "圧力センサー" },
    { attribute: "Cooler", infoType: "冷房" },
    { attribute: "Airvalve", infoType: "AIRバルブ" },
    { attribute: "Phvalve", infoType: "PHバルブ" },
    { attribute: "Ecvalve", infoType: "ECバルブ" },
]


// const validateNumber = (input: string, fieldName: string, min: number, max: number, ctx) => {
// 	const numInput = Number(input);
// 	if (/[０-９]/.test(input)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}には半角数字を入力してください。`,
// 			path: [fieldName],
// 		});
// 	}
// 	if (isNaN(numInput)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}には数字を入力してください。`,
// 			path: [fieldName],
// 		});
// 	}
// 	if (numInput > max) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}は最大で${max}です。`,
// 			path: [fieldName],
// 		});
// 	}
// 	if (numInput < min) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}は最小で${min}です。`,
// 			path: [fieldName],
// 		});
// 	}
// };

// export const numSchema = (label: string, min: number, max: number) =>
// 	z.string().refine(
// 		(val) => {
// 			const num = Number(val);
// 			return !isNaN(num) && num >= min && num <= max;
// 		},
// 		{ message: `${label}は最小で${min}、最大で${max}です` }
// 	);

// const FormSchema = z.object({
// 	deviceId: z.string(),
// 	// deviceId: numSchema("設備番号", 0, 1000),
// 	place_type: z.string(),
// 	// loc_id: numSchema("位置番号", 0, 100),
// 	loc_id: z.string(),
// 	attribute: z.string(),
// 	posX: numSchema("座標X", -1000, 1000),
// 	posY: numSchema("座標Z", 0, 500),
// 	posZ: numSchema("座標Y", -1000, 1000),
// 	rotY: numSchema("回転Y", -360, 360),
// }).superRefine(({ deviceId, loc_id }, ctx) => {
// 	const numDeviceId = Number(deviceId)
// 	const numLocationId = Number(loc_id)
// 	if (/[０-９]/.test(deviceId)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "半角数字を入力してください。",
// 			path: ["deviceId"],
// 		})
// 	}
// 	if (isNaN(numDeviceId)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "数字を入力してください。",
// 			path: ["deviceId"],
// 		})
// 	}
// 	if (numDeviceId >= 1000) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "設備番号は最大で1000です。",
// 			path: ["deviceId"],
// 		})
// 	}
// 	if (numDeviceId <= 0) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "設備番号は最小で0です。",
// 			path: ["deviceId"],
// 		})
// 	}
// 	if (/[０-９]/.test(loc_id)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "半角数字を入力してください。",
// 			path: ["loc_id"],
// 		})
// 	}
// 	if (isNaN(numLocationId)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "数字を入力してください。",
// 			path: ["loc_id"],
// 		})
// 	}
// 	if (numLocationId >= 100) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "位置番号は最大で100です。",
// 			path: ["loc_id"],
// 		})
// 	}
// 	if (numLocationId <= 0) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: "位置番号は最小で0です。",
// 			path: ["loc_id"],
// 		})
// 	}
// });

// export const numSchema = (label: string, min: number, max: number) =>
//   z.string().superRefine(
//     (val) => {
//       const num = Number(val);
//       if (isNaN(num) || /[０-９]/.test(val)) return false
//       return num >= min && num <= max;
//     },
//     { message: `半角数字を入力してください。${label}は最小で${min}、最大で${max}です。半角数字を入力してください。` }
//   );

// const validateNumber = (value: string, fieldName: string, min: number, max: number, ctx: z.RefinementCtx) => {
// 	const num = Number(value);
// 	if (/[０-９]/.test(value)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}には半角数字を入力してください。`,
// 			path: [value],
// 		});
// 	}
// 	if (isNaN(num)) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}には数字を入力してください。`,
// 			path: [value],
// 		});
// 	}
// 	if (num >= max) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}は最大で${max}です。`,
// 			path: [value],
// 		});
// 	}
// 	if (num <= min) {
// 		ctx.addIssue({
// 			code: "custom",
// 			message: `${fieldName}は最小で${min}です。`,
// 			path: [value],
// 		});
// 	}
// };