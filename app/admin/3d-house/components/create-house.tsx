import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useJsonDataStore } from "../hooks/useJsonDataStore";
import { useEffect } from "react";

const FormSchema = z.object({
    RoofSize: z.string({ required_error: "屋根のサイズは必要です" }),
    floor: z.string({ required_error: "床を選択してください" }),
    roofNumber: z.string(),
    length: z.string(),
}).superRefine(({ roofNumber, length }, ctx) => {
    const numRoof = Number(roofNumber)
    if (/[０-９]/.test(roofNumber)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "半角数字を入力してください。",
            path: ["roofNumber"],
        })
    }
    if (isNaN(numRoof)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "数字を入力してください。",
            path: ["roofNumber"],
        })
    }
    if (numRoof > 10) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "屋根の数は最大で10です。",
            path: ["roofNumber"],
        })
    }
    if (numRoof < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "屋根の数は最小で1です。",
            path: ["roofNumber"],
        })
    }

    const numLength = Number(length)
    if (/[０-９]/.test(length)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "半角数字を入力してください。",
            path: ["length"],
        })
    }
    if (isNaN(numLength)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "数字を入力してください。",
            path: ["length"],
        })
    }
    if (numLength > 30) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "側面の長さは最大で30です。",
            path: ["length"],
        })
    }
    if (numLength < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "側面の長さは最小で1です。",
            path: ["length"],
        })
    }
});

export const CreateHouse = () => {

    const { JsonData, setJsonData } = useJsonDataStore()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            RoofSize: "",
            floor: "",
            roofNumber: "",
            length: ""
        }
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const houseData = {
            floorType: Number(data.floor),
            roofNumber: Number(data.roofNumber),
            length: Number(data.length),
        };

        setJsonData({
            ...JsonData,
            houseSize: houseData,
        });
    }

    useEffect(() => {
        if (JsonData.houseSize) {
            form.setValue("RoofSize", "m");
            form.setValue("floor", JsonData.houseSize.floorType.toString());
            form.setValue("roofNumber", JsonData.houseSize.roofNumber.toString());
            form.setValue("length", JsonData.houseSize.length.toString());
        }
    }, [JsonData]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pr-1">

                <FormField
                    control={form.control}
                    name="RoofSize"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel className="w-40">屋根のサイズ</FormLabel>
                                <Select onValueChange={field.onChange} value="m">
                                    <FormControl className="bg-transparent" >
                                        <SelectTrigger>
                                            <SelectValue placeholder="屋根のサイズを選択" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="s" disabled>サイズ S</SelectItem>
                                            <SelectItem value="m">サイズ M</SelectItem>
                                            <SelectItem value="l" disabled>サイズ L</SelectItem>
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
                    name="roofNumber"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel className="w-40">屋根の数</FormLabel>
                                <FormControl>
                                    <Input placeholder="屋根の数"  {...field} className="bg-transparent" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel className="w-40">側面の長さ</FormLabel>
                                <FormControl>
                                    <Input placeholder="側面の長さ"  {...field} className="bg-transparent" />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel className="w-40">床</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl className="bg-transparent" >
                                        <SelectTrigger>
                                            <SelectValue placeholder="床の種別を選択" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">床：土</SelectItem>
                                            <SelectItem value="2">床：白</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-2">
                    <Button type="submit">確定</Button>
                </div>

            </form>

        </Form>
    );
};
