import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useJsonDataStore } from "../hooks/useJsonDataStore";
import { useObjectDataStore } from "../hooks/useObjectDataStore";
import { useEffect, useMemo } from "react";
import { DeleteButton } from "./delete-button"
import { Device, Threedata } from "@/actions/get-3d-data";
import { DeviceAttributes } from "./types";

const FormSchema = z.object({
	deviceId: z.string(),
	place_type: z.string(),
	loc_id: z.string(),
	attribute: z.string(),
	posX: z.string(),
	posY: z.string(),
	posZ: z.string(),
	rotY: z.string(),
}).superRefine(({ deviceId, loc_id, posX, posY, posZ, rotY }, ctx) => {
	const numDeviceId = Number(deviceId)
	if (/[０-９]/.test(deviceId)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["deviceId"],
		})
	}
	if (isNaN(numDeviceId)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["deviceId"],
		})
	}
	if (numDeviceId > 1000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "設備番号は最大で1000です。",
			path: ["deviceId"],
		})
	}
	if (numDeviceId < 1) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "設備番号は最小で1です。",
			path: ["deviceId"],
		})
	}

	const numLocationId = Number(loc_id)
	if (/[０-９]/.test(loc_id)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["loc_id"],
		})
	}
	if (isNaN(numLocationId)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["loc_id"],
		})
	}
	if (numLocationId > 100) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "位置番号は最大で100です。",
			path: ["loc_id"],
		})
	}
	if (numLocationId < 1) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "位置番号は最小で1です。",
			path: ["loc_id"],
		})
	}

	const numPosX = Number(posX)
	if (/[０-９]/.test(posX)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["posX"],
		})
	}
	if (isNaN(numPosX)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["posX"],
		})
	}
	if (numPosX > 1000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Xは最大で1000です。",
			path: ["posX"],
		})
	}
	if (numPosX < -1000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Xは最小で-1000です。",
			path: ["posX"],
		})
	}

	const numPosY = Number(posY)
	if (/[０-９]/.test(posY)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["posY"],
		})
	}
	if (isNaN(numPosY)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["posY"],
		})
	}
	if (numPosY > 500) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Zは最大で500です。",
			path: ["posY"],
		})
	}
	if (numPosY < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Zは最小で0です。",
			path: ["posY"],
		})
	}

	const numPosZ = Number(posZ)
	if (/[０-９]/.test(posZ)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["posZ"],
		})
	}
	if (isNaN(numPosZ)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["posZ"],
		})
	}
	if (numPosZ > 1000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Yは最大で1000です。",
			path: ["posZ"],
		})
	}
	if (numPosZ < -1000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Yは最小で-1000です。",
			path: ["posZ"],
		})
	}

	const numRotY = Number(rotY)
	if (/[０-９]/.test(rotY)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "半角数字を入力してください。",
			path: ["rotY"],
		})
	}
	if (isNaN(numRotY)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "数字を入力してください。",
			path: ["rotY"],
		})
	}
	if (numRotY > 360) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Yは最大で360です。",
			path: ["rotY"],
		})
	}
	if (numRotY < -360) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "座標Yは最小で-360です。",
			path: ["rotY"],
		})
	}
});

const deviceTypes: (keyof Threedata)[] = [
	"co2Sensors",
	"solarRadSensors",
	"phSensors",
	"soilSensors",
	"pressureSensors",
	"windSensors",
	"rainSensors",
	"heatPumps",
	"waterTanks",
	"waterTanksBlack",
	"controlPanels",
	"co2GasCylinders",
	"plants",
	"co2Pipes",
	"compressors",
	"signBoards",
	"cameras",
	"airCylinders",
	"leds",
	"airvalve",
	"phvalve",
	"ecvalve",
	"circuratorFans",
	"exhaustFans",
	"gen3",
	"gen4",
	"coolers",
	"heaters",
	"heatersGray"
];

export const CreateObject = () => {
	const { JsonData, setJsonData } = useJsonDataStore();
	const { isPreview, SelectedObject } = useObjectDataStore();

	const selectedInfoType = useMemo(() => {
		return DeviceAttributes.find(item => item.attribute === SelectedObject?.attribute)?.infoType;
	}, [SelectedObject?.attribute]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			deviceId: "",
			place_type: "",
			loc_id: "",
			attribute: "",
			posX: "",
			posY: "",
			posZ: "",
			rotY: "",
		}
	});

	function deleteObject() {
		if (!SelectedObject) return

		const filteredData: Threedata = { ...JsonData };
		for (const type of deviceTypes) {
			(filteredData[type] as Device[]) = (filteredData[type] as Device[]).filter(
				item => item.deviceId !== SelectedObject.deviceId
			);
		}
		setJsonData(filteredData)

		form.setValue("deviceId", "");
		form.setValue("place_type", "");
		form.setValue("loc_id", "");
		form.setValue("attribute", "");
		form.setValue("posX", "");
		form.setValue("posY", "");
		form.setValue("posZ", "");
		form.setValue("rotY", "");
	}

	useEffect(() => {
		if (SelectedObject) {
			form.setValue("deviceId", SelectedObject?.deviceId.toString());
			form.setValue("place_type", SelectedObject?.place_type.toString());
			form.setValue("loc_id", SelectedObject?.loc_id.toString());
			form.setValue("posX", SelectedObject?.posX.toString());
			form.setValue("posY", SelectedObject?.posY.toString());
			form.setValue("posZ", SelectedObject?.posZ.toString());
			form.setValue("rotY", SelectedObject?.rotY.toString());
		} else {
			form.setValue("deviceId", "");
			form.setValue("place_type", "");
			form.setValue("loc_id", "");
			form.setValue("attribute", "");
			form.setValue("posX", "");
			form.setValue("posY", "");
			form.setValue("posZ", "");
			form.setValue("rotY", "");
		}
	}, [SelectedObject]);

	function createNewDevice(TYPEID: number, data: z.infer<typeof FormSchema>) {
		const newDevice = {
			deviceId: Number(data.deviceId),
			type_id: TYPEID,
			place_type: Number(data.place_type),
			loc_id: Number(data.loc_id),
			attribute: data.attribute,
			state: 0,
			posX: Number(data.posX),
			posY: Number(data.posY),
			posZ: Number(data.posZ),
			rotY: Number(data.rotY),
		};
		return newDevice
	}

	function onSubmit(data: z.infer<typeof FormSchema>) {

		let idx, updatedArray

		// Nullish coalescing operator (??)
		// data.attribute = SelectedObject?.attribute ?? data.attribute;
		data.attribute = SelectedObject?.attribute || data.attribute;

		switch (data.attribute) {
			case "ExhaustFan":
				idx = JsonData.exhaustFans.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.exhaustFans];
				idx === -1 ? updatedArray.push(createNewDevice(33, data)) : (updatedArray[idx] = createNewDevice(33, data));
				setJsonData({ ...JsonData, exhaustFans: updatedArray, });
				break;
			case "CircuratorFan":
				idx = JsonData.circuratorFans.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.circuratorFans];
				idx === -1 ? updatedArray.push(createNewDevice(32, data)) : (updatedArray[idx] = createNewDevice(32, data));
				setJsonData({ ...JsonData, circuratorFans: updatedArray, });
				break;
			case "Gen3":
				idx = JsonData.gen3.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.gen3];
				idx === -1 ? updatedArray.push(createNewDevice(34, data)) : (updatedArray[idx] = createNewDevice(34, data));
				setJsonData({ ...JsonData, gen3: updatedArray, });
				break;
			case "Gen4":
				idx = JsonData.gen4.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.gen4];
				idx === -1 ? updatedArray.push(createNewDevice(57, data)) : (updatedArray[idx] = createNewDevice(57, data));
				setJsonData({ ...JsonData, gen4: updatedArray, });
				break;
			case "CO2Sensor":
				idx = JsonData.co2Sensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.co2Sensors];
				idx === -1 ? updatedArray.push(createNewDevice(1, data)) : (updatedArray[idx] = createNewDevice(1, data));
				setJsonData({ ...JsonData, co2Sensors: updatedArray, });
				break;
			case "SolarRadSensor":
				idx = JsonData.solarRadSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.solarRadSensors];
				idx === -1 ? updatedArray.push(createNewDevice(2, data)) : (updatedArray[idx] = createNewDevice(2, data));
				setJsonData({ ...JsonData, solarRadSensors: updatedArray, });
				break;
			case "PhSensor":
				idx = JsonData.phSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.phSensors];
				idx === -1 ? updatedArray.push(createNewDevice(3, data)) : (updatedArray[idx] = createNewDevice(3, data));
				setJsonData({ ...JsonData, phSensors: updatedArray, });
				break;
			case "SoilSensor":
				idx = JsonData.soilSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.soilSensors];
				idx === -1 ? updatedArray.push(createNewDevice(4, data)) : (updatedArray[idx] = createNewDevice(4, data));
				setJsonData({ ...JsonData, soilSensors: updatedArray, });
				break;
			case "PressureSensor":
				idx = JsonData.pressureSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.pressureSensors];
				idx === -1 ? updatedArray.push(createNewDevice(5, data)) : (updatedArray[idx] = createNewDevice(5, data));
				setJsonData({ ...JsonData, pressureSensors: updatedArray, });
				break;
			case "WindSensor":
				idx = JsonData.windSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				console.log("idx", idx);

				updatedArray = [...JsonData.windSensors];
				idx === -1 ? updatedArray.push(createNewDevice(6, data)) : (updatedArray[idx] = createNewDevice(6, data));
				console.log("updatedWindSensor", updatedArray);
				setJsonData({ ...JsonData, windSensors: updatedArray, });
				break;
			case "RainSensor":
				idx = JsonData.rainSensors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.rainSensors];
				idx === -1 ? updatedArray.push(createNewDevice(7, data)) : (updatedArray[idx] = createNewDevice(7, data));
				setJsonData({ ...JsonData, rainSensors: updatedArray, });
				break;
			case "Cooler":
				idx = JsonData.coolers.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.coolers];
				idx === -1 ? updatedArray.push(createNewDevice(35, data)) : (updatedArray[idx] = createNewDevice(35, data));
				setJsonData({ ...JsonData, coolers: updatedArray, });
				break;
			case "Heater":
				idx = JsonData.heaters.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.heaters];
				idx === -1 ? updatedArray.push(createNewDevice(36, data)) : (updatedArray[idx] = createNewDevice(36, data));
				setJsonData({ ...JsonData, heaters: updatedArray, });
				break;
			case "HeaterGray":
				idx = JsonData.heatersGray.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.heatersGray];
				idx === -1 ? updatedArray.push(createNewDevice(36, data)) : (updatedArray[idx] = createNewDevice(36, data));
				setJsonData({ ...JsonData, heatersGray: updatedArray, });
				break;
			case "HeatPump":
				idx = JsonData.heatPumps.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.heatPumps];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, heatPumps: updatedArray, });
				break;
			case "WaterTank":
				idx = JsonData.waterTanks.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.waterTanks];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, waterTanks: updatedArray, });
				break;
			case "WaterTankBlack":
				idx = JsonData.waterTanksBlack.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.waterTanksBlack];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, waterTanksBlack: updatedArray, });
				break;
			case "ControlPanel":
				idx = JsonData.controlPanels.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.controlPanels];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, controlPanels: updatedArray, });
				break;
			case "Co2GasCylinder":
				idx = JsonData.co2GasCylinders.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.co2GasCylinders];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, co2GasCylinders: updatedArray, });
				break;
			case "Plant1":
			case "Plant2":
				idx = JsonData.plants.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.plants];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, plants: updatedArray, });
				break;
			case "Co2Pipe":
				idx = JsonData.co2Pipes.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.co2Pipes];
				idx === -1 ? updatedArray.push(createNewDevice(8, data)) : (updatedArray[idx] = createNewDevice(8, data));
				setJsonData({ ...JsonData, co2Pipes: updatedArray, });
				break;
			case "Compressor":
				idx = JsonData.compressors.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.compressors];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, compressors: updatedArray, });
				break;
			case "SignBoard":
				idx = JsonData.signBoards.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.signBoards];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, signBoards: updatedArray, });
				break;
			case "AirCylinder":
				idx = JsonData.airCylinders.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.airCylinders];
				idx === -1 ? updatedArray.push(createNewDevice(0, data)) : (updatedArray[idx] = createNewDevice(0, data));
				setJsonData({ ...JsonData, airCylinders: updatedArray, });
				break;
			case "Led1":
				idx = JsonData.leds.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.leds];
				idx === -1 ? updatedArray.push(createNewDevice(14, data)) : (updatedArray[idx] = createNewDevice(14, data));
				setJsonData({ ...JsonData, leds: updatedArray, });
				break;
			case "Led2":
				idx = JsonData.leds.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.leds];
				idx === -1 ? updatedArray.push(createNewDevice(15, data)) : (updatedArray[idx] = createNewDevice(15, data));
				setJsonData({ ...JsonData, leds: updatedArray, });
				break;
			case "Led3":
				idx = JsonData.leds.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.leds];
				idx === -1 ? updatedArray.push(createNewDevice(16, data)) : (updatedArray[idx] = createNewDevice(16, data));
				setJsonData({ ...JsonData, leds: updatedArray, });
				break;
			case "Led4":
				idx = JsonData.leds.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.leds];
				idx === -1 ? updatedArray.push(createNewDevice(17, data)) : (updatedArray[idx] = createNewDevice(17, data));
				setJsonData({ ...JsonData, leds: updatedArray, });
				break;
			case "Airvalve":
				idx = JsonData.airvalve.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.airvalve];
				idx === -1 ? updatedArray.push(createNewDevice(9, data)) : (updatedArray[idx] = createNewDevice(9, data));
				setJsonData({ ...JsonData, airvalve: updatedArray, });
				break;
			case "Phvalve":
				idx = JsonData.phvalve.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.phvalve];
				idx === -1 ? updatedArray.push(createNewDevice(10, data)) : (updatedArray[idx] = createNewDevice(10, data));
				setJsonData({ ...JsonData, phvalve: updatedArray, });
				break;
			case "Ecvalve":
				idx = JsonData.ecvalve.findIndex(item => item.deviceId === Number(data.deviceId));
				updatedArray = [...JsonData.ecvalve];
				idx === -1 ? updatedArray.push(createNewDevice(11, data)) : (updatedArray[idx] = createNewDevice(11, data));
				setJsonData({ ...JsonData, ecvalve: updatedArray, });
				break;
			default:
				break;
		}

		form.setValue("deviceId", "");
		form.setValue("place_type", "");
		form.setValue("loc_id", "");
		form.setValue("attribute", "");
		form.setValue("posX", "");
		form.setValue("posY", "");
		form.setValue("posZ", "");
		form.setValue("rotY", "");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>

				<div className="grid grid-cols-2 gap-2 pr-1">

					<FormField
						control={form.control}
						name="attribute"
						render={({ field }) => (
							<>
								{
									isPreview
										? <FormItem className="flex items-center">
											<FormLabel className="whitespace-nowrap">設備種別 : <span className="pl-1"> {selectedInfoType}</span></FormLabel>
										</FormItem>
										:
										<FormItem>
											<div className="flex items-center">
												<FormLabel className="whitespace-nowrap pr-2">設備種別</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl className="bg-transparent" >
														<SelectTrigger>
															<SelectValue placeholder="デバイス種別を選択" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="overflow-y-auto h-[13rem]">
														<SelectGroup>
															<SelectItem value="ExhaustFan">換気扇</SelectItem>
															<SelectItem value="CircuratorFan">循環扇</SelectItem>
															<SelectItem value="CO2Sensor">CO2センサー</SelectItem>
															<SelectItem value="SolarRadSensor">日射センサー</SelectItem>
															<SelectItem value="WindSensor">風速センサー</SelectItem>
															<SelectItem value="RainSensor">感雨センサー</SelectItem>
															<SelectItem value="Heater">加温器</SelectItem>
															<SelectItem value="HeaterGray">加温器(灰)</SelectItem>
															<SelectItem value="HeatPump">ヒートパンプ</SelectItem>
															<SelectItem value="WaterTank">タンク</SelectItem>
															<SelectItem value="WaterTankBlack">タンク(黒)</SelectItem>
															<SelectItem value="ControlPanel">制御盤</SelectItem>
															<SelectItem value="Co2GasCylinder">CO2ガスボンベ</SelectItem>
															<SelectItem value="Plant1">作物：イチゴ</SelectItem>
															<SelectItem value="Plant2">作物：トマト</SelectItem>
															<SelectItem value="Co2Pipe">CO2パイプ</SelectItem>
															<SelectItem value="Compressor">圧縮機</SelectItem>
															<SelectItem value="SignBoard">看板</SelectItem>
															<SelectItem value="AirCylinder">エアシリンダー</SelectItem>
															<SelectItem value="Led1">Led1</SelectItem>
															<SelectItem value="Led2">Led2</SelectItem>
															<SelectItem value="Led3">Led3</SelectItem>
															<SelectItem value="Led4">Led4</SelectItem>
															<SelectItem value="Gen3" disabled>Gen3</SelectItem>
															<SelectItem value="Gen4" disabled>Gen4</SelectItem>
															<SelectItem value="PhSensor" disabled>PHセンサー</SelectItem>
															<SelectItem value="SoilSensor" disabled>土壌センサー</SelectItem>
															<SelectItem value="PressureSensor" disabled>圧力センサー</SelectItem>
															<SelectItem value="Cooler" disabled>冷房</SelectItem>
															<SelectItem value="Airvalve" disabled>AIRバルブ</SelectItem>
															<SelectItem value="Phvalve" disabled>PHバルブ</SelectItem>
															<SelectItem value="Ecvalve" disabled>ECバルブ</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</div>
											<FormMessage />
										</FormItem>
								}
							</>
						)}
					/>

					<FormField
						control={form.control}
						name="deviceId"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-2">設備番号</FormLabel>
									<FormControl className="bg-transparent" >
										<Input {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="place_type"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-2">放置位置</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl className="bg-transparent" >
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="0">屋外</SelectItem>
												<SelectItem value="1">ハウス</SelectItem>
												<SelectItem value="2">エリア</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="loc_id"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-2">位置番号</FormLabel>
									<FormControl className="bg-transparent" >
										<Input {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="posX"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-7">座標X</FormLabel>
									<FormControl className="bg-transparent" >
										<Input  {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="posZ"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-7">座標Y</FormLabel>
									<FormControl className="bg-transparent" >
										<Input {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="posY"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-7">座標Z</FormLabel>
									<FormControl className="bg-transparent" >
										<Input {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="rotY"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="whitespace-nowrap pr-7">回転Y</FormLabel>
									<FormControl className="bg-transparent" >
										<Input {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

				</div>

				<div className="flex justify-end gap-2 pt-2 pr-1">
					{isPreview ? <DeleteButton onDelete={deleteObject} /> : null}
					<Button type="submit">確定</Button>
				</div>
			</form>
		</Form>
	);
};



