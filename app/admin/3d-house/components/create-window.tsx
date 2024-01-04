import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useJsonDataStore } from "../hooks/useJsonDataStore";

const FormSchema = z.object({
    deviceId: z.string(),
    place_type: z.string(),
    loc_id: z.string(),
    attribute: z.string({
        required_error: "请选择device类型",
    }),
});

export const CreateWindow = () => {
    const { JsonData, setJsonData } = useJsonDataStore();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            deviceId: "",
            place_type: "",
            loc_id: "",
            attribute: "",
        }
    })

    function createNew(TYPEID: number, data: z.infer<typeof FormSchema>) {
        const newItem = {
            deviceId: Number(data.deviceId),
            type_id: TYPEID,
            place_type: Number(data.place_type),
            loc_id: Number(data.loc_id),
            attribute: data.attribute,
            degree: 0,
        };
        return newItem
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        switch (data.attribute) {
            case "window1":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(18, data)],
                });
                break;
            case "window2":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(20, data)],
                });
            case "window3":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(22, data)],
                });
                break;
            case "window4":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(24, data)],
                });
            case "window5":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(37, data)],
                });
                break;
            case "window6":
                setJsonData({
                    ...JsonData,
                    windows: [...JsonData.windows, createNew(58, data)],
                });
            case "curtain1":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(26, data)],
                });
            case "curtain2":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(28, data)],
                });
            case "curtain3":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(30, data)],
                });
            case "curtain4":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(60, data)],
                });
            case "curtain5":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(62, data)],
                });
            case "curtain6":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(64, data)],
                });
            case "curtain7":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(66, data)],
                });
            case "curtain8":
                setJsonData({
                    ...JsonData,
                    curtains: [...JsonData.curtains, createNew(68, data)],
                });
                break;
            default:
                break;
        }

        form.setValue("deviceId", "");
		form.setValue("place_type", "");
		form.setValue("loc_id", "");
		form.setValue("attribute", "");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">

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
                                <SelectContent className="overflow-y-auto max-h-[16rem]">
                                    <SelectGroup>
                                        <SelectItem value="window1">window1</SelectItem>
                                        <SelectItem value="window2">window2</SelectItem>
                                        <SelectItem value="window3">window3</SelectItem>
                                        <SelectItem value="window4">window4</SelectItem>
                                        <SelectItem value="window5">window5</SelectItem>
                                        <SelectItem value="window6">window6</SelectItem>
                                        <SelectItem value="curtain1">curtain1</SelectItem>
                                        <SelectItem value="curtain2">curtain2</SelectItem>
                                        <SelectItem value="curtain3">curtain3</SelectItem>
                                        <SelectItem value="curtain4">curtain4</SelectItem>
                                        <SelectItem value="curtain5">curtain5</SelectItem>
                                        <SelectItem value="curtain6">curtain6</SelectItem>
                                        <SelectItem value="curtain7">curtain7</SelectItem>
                                        <SelectItem value="curtain8">curtain8</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage className="pl-2" />
                        </FormItem>
                    )}
                />

                <Button type="submit">確定</Button>
            </form>
        </Form>
    );
};
