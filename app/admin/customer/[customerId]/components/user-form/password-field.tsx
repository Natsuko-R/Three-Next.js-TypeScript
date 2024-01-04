import React, { useMemo } from "react";

import { Box } from "@/components/custom-ui/box";
import { PasswordInput } from "@/components/custom-ui/password";
import { Field } from "@/components/form-base/field";
import { ValueText } from "@/components/form-base/text";

import { IFieldType } from "./types";

interface CustomerIdInputProps {
	preview?: boolean;
	label: string;
	field: IFieldType<"password">;
	placeholder?: string;
}

export const FormPasswordInput: React.FC<CustomerIdInputProps> = ({
	preview,
	label,
	field,
	placeholder,
}) => {
	const PreviewField = useMemo(() => {
		return (
			<Box className="p-0 h-10 items-center space-x-2">
				<ValueText>{field.value}</ValueText>
			</Box>
		);
	}, [field.value]);

	return (
		<Field labelStyle="w-[120px]" label={label} name={field.name}>
			{preview ? (
				PreviewField
			) : (
				<Box className="p-0 items-center flex-1 flex flex-wrap space-x-4">
					<PasswordInput
						className="w-[400px]"
						id={field.name}
						placeholder={placeholder}
						{...field}
					/>
				</Box>
			)}
		</Field>
	);
};
