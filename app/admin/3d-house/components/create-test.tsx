import { CustomSelect } from "@/components/custom-ui/select";
import { useCallback, useEffect, useState } from "react";
import { Form, FormField } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { RangeField } from "./range-field";
import { FormActionsContainer } from "@/components/form-base/form-actions-container";

const testOptions = [
    { value: "ExhaustFan", label: "ExhaustFan" },
    { value: "CircuratorFan", label: "CircuratorFan" },
    { value: "CO2Sensor", label: "CO2センサー" },
    { value: "HeatPump", label: "ヒートシンク" },
    { value: "ControlPanel", label: "ControlPanel" }
]

const posSchema = (label: string) =>
    z.string().refine(
        (val) => val.length > 10,
        { message: `${label} is not more than 10 characters` }
    );

const formSchema = z.object({
    posX: posSchema("posX")
});

export const CreateTest = () => {
    const [currentValue, setCurrenValue] = useState("")
    const [isPreview, setIsPreview] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleBlockChange = useCallback(
        (value: string) => {
            setCurrenValue(value)
        },
        [setCurrenValue]
    )

    const onSubmit = useCallback(
        () => { }
        ,
        []
    )

    const onChangePreview = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsPreview(false)
    }, [])

    const handleCancel = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()
        form.unregister()
        setIsPreview(true)
    }, [])

    useEffect(() => {
        // if (!data) return
        form.setValue("posX", "111")
    }, [form.setValue, isPreview])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <CustomSelect
                        placeholder=""
                        label="デバイス種別"
                        options={testOptions}
                        defaultValue={testOptions[0].value}
                        value={currentValue}
                        onChange={handleBlockChange}
                    />

                    <FormField
                        defaultValue=""
                        name="posX"
                        control={form.control}
                        render={({ field }) => (
                            <RangeField
                                foobar={"下限"}
                                label="TEST温度："
                                field={field}
                                preview={isPreview}
                            />
                        )}
                    />

                    <FormActionsContainer>
                        {isPreview ?
                            (
                                <>
                                    <Button onClick={onChangePreview}>変更</Button>
                                    <Button variant="destructive">削除</Button>
                                </>
                            ) : (
                                <>
                                    <Button type="submit">確定</Button>
                                    <Button onClick={handleCancel} variant="secondary">キャンセル</Button>
                                </>
                            )}
                    </FormActionsContainer>
                </form>
            </Form>
        </div>
    );
};
