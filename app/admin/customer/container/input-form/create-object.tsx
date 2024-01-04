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
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useJsonDataStore } from "../hooks/useJsonDataStore";
import { useObjectDataStore } from "../hooks/useObjectDataStore";
import { useEffect } from "react";

const FormSchema = z.object({
	deviceId: z.string(),
	place_type: z.string(),
	loc_id: z.string(),
	attribute: z.string({
		required_error: "请选择device类型",
	}),
	posX: z.string(),
	posY: z.string(),
	posZ: z.string(),
	rotY: z.string(),
});

export const CreateObject = () => {
	const { JsonData, setJsonData } = useJsonDataStore();
	const { SelectedObject } = useObjectDataStore();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		if (!SelectedObject) return

		form.setValue("deviceId", SelectedObject?.deviceId.toString());
		form.setValue("place_type", SelectedObject?.place_type.toString());
		form.setValue("loc_id", SelectedObject?.loc_id.toString());
		form.setValue("attribute", SelectedObject?.attribute);
		form.setValue("posX", SelectedObject?.posX.toString());
		form.setValue("posY", SelectedObject?.posY.toString());
		form.setValue("posZ", SelectedObject?.posZ.toString());
		form.setValue("rotY", SelectedObject?.rotY.toString());

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

		switch (data.attribute) {
			case "ExhaustFan":
				setJsonData({
					...JsonData,
					exhaustFans: [...JsonData.exhaustFans, createNewDevice(33, data)],
				});
				break;
			case "CircuratorFan":
				setJsonData({
					...JsonData,
					circuratorFans: [...JsonData.circuratorFans, createNewDevice(32, data)],
				});
				break;
			case "Gen3":
				setJsonData({
					...JsonData,
					gen3: [...JsonData.gen3, createNewDevice(34, data)],
				});
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="deviceId"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">DeviceId</FormLabel>
							<FormControl>
								<Input
									placeholder="请输入"
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="place_type"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">PlaceType</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="loc_id"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">LocationId</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="attribute"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">デバイス種別</FormLabel>
							<Select onValueChange={field.onChange} defaultValue="">
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="デバイス種別を選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="overflow-y-auto max-h-[20rem]">
									<SelectGroup>
										<SelectItem value="ExhaustFan">ExhaustFan</SelectItem>
										<SelectItem value="CircuratorFan">CircuratorFan</SelectItem>
										<SelectItem value="Gen3" disabled>Gen3</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="posX"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">posX</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="posY"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">posY</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="posZ"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">posZ</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="rotY"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="w-40">rotY</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormMessage className="pl-2" />
						</FormItem>
					)}
				/>

				<Button type="submit" className="m-2">
					確定
				</Button>
			</form>
		</Form>
	);
};
