"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FormInput } from "@/components/form-base/input-field"
import { FormPasswordInput } from "./password-field"
import { FormActionsContainer } from "@/components/form-base/form-actions-container"

const userIdPattern = /^[a-zA-Z0-9]*$/;
const passwordPattern = /^[a-zA-Z0-9!@#%&*()\-_[\]{};:'",./?]+$/;
const availablePasswordCha = `!@#%&*()\-_[\]{};:'",./?`;

const formSchema = z.object({
    userId: z
        .string()
        .min(1, "ユーザーIDを入力してください")
        .max(18, "ユーザーIDを18文字以内で入力してください")
        .refine((val) => userIdPattern.test(val), {
            message: "正しい文字（英字と数字）の組み合わせを入力してください",
        }),
    password: z
        .string()
        .min(1, "パスワードを入力してください")
        .max(64, "パスワードを64文字以内で入力してください")
        .refine((val) => passwordPattern.test(val), {
            message: `パスワードは英字、数字、および記号(${availablePasswordCha})を入力してください`,
        }),
})

export function UserForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "Natsuki",
            password: "46552"
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormInput
                                    placeholder="ユーザーID（英字と数字）を入力してください"
                                    label="ユーザーID："
                                    field={field}
                                    preview={false}
                                />
                            )}
                        />
                        <FormField
                            name="password"
                            defaultValue=""
                            control={form.control}
                            render={({ field }) => (
                                <FormPasswordInput
                                    placeholder={`英字、数字、および記号(${availablePasswordCha})のみ`}
                                    label="パスワード："
                                    field={field}
                                    preview={false}
                                />
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <FormActionsContainer labelStyles="w-[120px]">
                            <Button disabled={false} type="submit">
                                登録
                            </Button>
                        </FormActionsContainer>
                    </CardFooter>
                </form>
            </Form>
        </Card>

    )
}
