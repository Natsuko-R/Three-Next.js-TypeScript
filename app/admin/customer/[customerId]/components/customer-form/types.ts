import { ControllerRenderProps } from "react-hook-form";

type Schema = {
	name: string;
};

type SchemaKey = keyof Schema;

export type IFieldType<T extends SchemaKey> = ControllerRenderProps<Schema, T>;
