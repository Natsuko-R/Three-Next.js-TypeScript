import React, { useMemo } from "react";

import { Box } from "@/components/custom-ui/box";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/form-base/field";
import { Text, ValueText } from "@/components/form-base/text";

import { IFieldType } from "../../app/admin/customer/[customerId]/components/user-form/types";

interface CustomerIdInputProps {
	preview?: boolean;
	label: string;
	field: IFieldType<"userId">;
	extra?: React.ReactNode;
	placeholder?: string;
}

export const FormInput: React.FC<CustomerIdInputProps> = ({
	preview,
	label,
	field,
	extra,
	placeholder,
}) => {
	const PreviewField = useMemo(() => {
		return (
			<Box className="p-0 h-10 items-center space-x-2">
				<ValueText>{field.value}</ValueText>
				{extra}
			</Box>
		);
	}, [field.value]);

	return (
		<Field labelStyle="w-[120px]" label={label} name={field.name}>
			{preview ? (
				PreviewField
			) : (
				<Box className="p-0 w-[400px] items-center flex-1 flex flex-wrap space-x-4">
					<Input
						className="w-full"
						id={field.name}
						placeholder={placeholder}
						{...field}
					/>
				</Box>
			)}
		</Field>
	);
};
