import { useCallback, useEffect } from "react"
import { IntegrationData } from "@/actions/get-integration"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useController from "@/hooks/use-controller"
import { Button } from "@/components/ui/button"
import { useDetailDataStore } from "@/components/common-3d-house/hooks/useDetailDataStore"
import { useIntegrationAddModal } from "@/components/common-3d-house/hooks/useIntegrationAddModal"
import { Box } from "@/components/custom-ui/box"
import { Form, FormControl, FormField, FormItem } from "@/components/form"
import { FormActionsContainer } from "@/components/sensor-form-base/form-actions-container"

import { DateField } from "./date-field"
import { InputField } from "./input-field"
import { InputNumberField } from "./input-number-field"

const formSchema = z
  .object({
    integration_name: z
      .string()
      .min(1, "積算設定名を入力してください")
      .max(10, "積算設定名は最大 10 文字までしか入力できません"),
    crops_name: z.string().min(1, "作物名を入力してください"),
    initial_date: z.date({ required_error: "開始日を入力してください" }),
    finish_date: z.date({ required_error: "終了日を入力してください" }),
    base_temp_air: z.string().min(1, "基準気温を入力してください"),
    integration_target_value_air: z
      .string()
      .min(1, "目標積算気温を入力してください"),
    base_temp_soil: z.string(),
    integration_target_value_soil: z.string(),
  })
  .superRefine(
    (
      {
        initial_date,
        finish_date,
        base_temp_soil,
        integration_target_value_soil,
      },
      ctx
    ) => {
      if (finish_date && initial_date > finish_date) {
        ctx.addIssue({
          code: "custom",
          message: "終了日を開始日よりも前にすることはできません",
          path: ["finish_date"],
        })
      }
    }
  )

interface IntegrationFormProps {
  isEditing: boolean
  data: IntegrationData | null
}

export const IntegrationForm: React.FC<IntegrationFormProps> = ({
  isEditing,
  data,
}) => {
  const { controllerValue, houseValue, areaValue } = useController()
  const { addIntegration, loading } = useDetailDataStore()
  const { onClose } = useIntegrationAddModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (isEditing && data) {
      form.setValue("integration_name", data.integration_name)
      form.setValue("crops_name", data.crops_name)
      form.setValue("initial_date", new Date(data.initial_date))
      if (data.finish_date) {
        form.setValue("finish_date", new Date(data.finish_date))
      }
      form.setValue("base_temp_air", data.base_temp_air)
      form.setValue(
        "integration_target_value_air",
        data.integration_target_value_air
      )
      form.setValue("base_temp_soil", data.base_temp_soil)
      form.setValue(
        "integration_target_value_soil",
        data.integration_target_value_soil
      )
    }
  }, [isEditing, data, form.setValue])

  const onSubmit = useCallback(
    async ({
      integration_name,
      crops_name,
      initial_date,
      finish_date,
      base_temp_air,
      integration_target_value_air,
      base_temp_soil,
      integration_target_value_soil,
    }: z.infer<typeof formSchema>) => {
      if (isEditing) {
        addIntegration(
          {
            controller_id: Number(controllerValue),
            house_id: Number(houseValue),
            area_id: Number(areaValue),
            integration_name,
            crops_name,
            initial_date: dayjs(initial_date).format("YYYY-MM-DD"),
            finish_date: finish_date
              ? dayjs(finish_date).format("YYYY-MM-DD")
              : undefined,
            base_temp_air: base_temp_air,
            integration_target_value_air: integration_target_value_air,
            base_temp_soil: base_temp_soil,
            integration_target_value_soil: integration_target_value_soil,
          },
          () => {
            onClose()
          }
        )
      } else {
        addIntegration(
          {
            controller_id: Number(controllerValue),
            house_id: Number(houseValue),
            area_id: Number(areaValue),
            integration_name,
            crops_name,
            initial_date: dayjs(initial_date).format("YYYY-MM-DD"),
            finish_date: finish_date
              ? dayjs(finish_date).format("YYYY-MM-DD")
              : undefined,
            base_temp_air: base_temp_air,
            integration_target_value_air: integration_target_value_air,
            base_temp_soil: base_temp_soil,
            integration_target_value_soil: integration_target_value_soil,
          },
          () => {
            onClose()
          }
        )
      }
    },
    [controllerValue, houseValue, areaValue, isEditing, addIntegration, onClose]
  )

  return (
    <Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            defaultValue=""
            name="integration_name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    label={"積算設定名："}
                    preview={isEditing}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue=""
            name="crops_name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    label={"作物名："}
                    preview={isEditing}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="initial_date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateField
                    field={field}
                    preview={isEditing}
                    label="開始日："
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue={undefined}
            name="finish_date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateField field={field} preview={false} label="終了日：" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue=""
            name="base_temp_air"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputNumberField
                    label="基準気温："
                    preview={false}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue=""
            name="integration_target_value_air"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputNumberField
                    label="目標積算気温："
                    preview={false}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue=""
            name="base_temp_soil"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputNumberField
                    label="基準土壌温度："
                    preview={false}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            defaultValue=""
            name="integration_target_value_soil"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputNumberField
                    label="目標積算土壌温度："
                    preview={false}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormActionsContainer>
            <>
              <Button disabled={loading} type="submit">
                確定
              </Button>
              <Button
                disabled={loading}
                onClick={onClose}
                variant="secondary"
                type="button"
              >
                キャンセル
              </Button>
            </>
          </FormActionsContainer>
        </form>
      </Form>
    </Box>
  )
}
