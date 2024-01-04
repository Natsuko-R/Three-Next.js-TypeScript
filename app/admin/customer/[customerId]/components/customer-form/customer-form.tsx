import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { FormActionsContainer } from "@/components/form-base/form-actions-container";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FormInput } from "./input-field";

export interface CustomerFormProps {
    title: string;
    isNew?: boolean;
}

const formSchema = z.object({
    name: z
        .string()
        .min(1, "顧客名を入力してください")
        .max(200, "顧客名を200文字以内で入力してください"),
});

export const CustomerForm: React.FC<CustomerFormProps> = ({ title, isNew }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "test"
        },
    });

    const router = useRouter();

    const handleBack = useCallback(
        (e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            router.back();
        },
        [router]
    );

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                        <CardTitle className="flex items-center">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => <FormInput label="名称：" field={field} />}
                        />
                    </CardContent>
                    <CardFooter>
                        <FormActionsContainer labelStyles="w-[120px]">
                            <Button type="submit">
                                登録
                            </Button>
                            <Button
                                onClick={handleBack}
                                type="button"
                                variant="secondary"
                            >
                                戻る
                            </Button>
                        </FormActionsContainer>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );

}

