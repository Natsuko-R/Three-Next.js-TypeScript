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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJsonDataStore } from "../hooks/useJsonDataStore";

const FormSchema = z.object({
	deviceId: z.string(),
	deviceName: z.string(),
	posX: z.string(),
	posY: z.string(),
	posZ: z.string(),
	rotY: z.string(),
})

export const CreateObject = () => {
	const { JsonData, setJsonData } = useJsonDataStore();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			deviceId: "",
			deviceName: "",
			posX: "",
			posY: "",
			posZ: "",
			rotY: "",
		}
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {

		let idx, updatedArray

		idx = JsonData.heatPumps.findIndex(item => item.deviceId === Number(data.deviceId));
		updatedArray = [...JsonData.heatPumps];
		idx === -1 ? updatedArray.push(createNewDevice(data)) : (updatedArray[idx] = createNewDevice(data));
		setJsonData({ ...JsonData, heatPumps: updatedArray, });

	}

	function createNewDevice(data: z.infer<typeof FormSchema>) {
		const newDevice = {
			deviceId: Number(data.deviceId),
			deviceName: data.deviceName,
			state: 0,
			posX: Number(data.posX),
			posY: Number(data.posY),
			posZ: Number(data.posZ),
			rotY: Number(data.rotY),
		};
		return newDevice
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>

				<div className="grid grid-cols-2 gap-2 pr-1">

					<FormField
						control={form.control}
						name="deviceName"
						render={({ field }) => (
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
												<SelectItem value="HeatPump">ヒートパンプ</SelectItem>
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

				<Button type="submit">確定</Button>
			</form>
		</Form>
	);
}