import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useJsonDataStore } from "../hooks/useJsonDataStore";

const FormSchema = z.object({
    floor: z.string(),
    roofNumber: z.number().int(),
    length: z.number().int(),
});

export const CreateHouse = () => {

    const { JsonData, setJsonData } = useJsonDataStore()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const houseData = {
            floorType: parseInt(data.floor, 10),
            roofNumber: data.roofNumber,
            length: data.length,
        };
        // console.log("House Data:", JSON.stringify(houseData, null, 2));

        setJsonData({
            ...JsonData,
            houseSize: houseData,
        });
        // localStorage.setItem('houseData', JSON.stringify(houseData));

        form.setValue('floor', "");
        form.setValue('roofNumber', 0);
        form.setValue('length', 0);
        // form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RoofSize</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue="m">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="s" disabled>Sサイズ</SelectItem>
                                        <SelectItem value="m">Mサイズ</SelectItem>
                                        <SelectItem value="l" disabled>Lサイズ</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="roofNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RoofNum</FormLabel>
                            <FormControl>
                                <Input placeholder="屋顶的个数" value={field.value} onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                                <Input placeholder="房屋的长度" value={field.value} onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Floor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="種別を選択" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Floor</SelectLabel>
                                        <SelectItem value="1">Floor 1</SelectItem>
                                        <SelectItem value="2">Floor 2</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="m-2">確定</Button>
            </form>
        </Form>
    );
};
