import { ControllerRenderProps } from "react-hook-form";
// ControllerRenderProps 是一个类型，用于定义在使用 React Hook Form 中的 <Controller> 组件时，render 函数接受的属性。这个类型包含了用于处理表单字段的方法和属性

type Schema = {
	userId: string;
	password: string;
};

// SchemaKey 是一个类型别名，它表示 Schema 中的字段名，这是通过 keyof Schema 来定义的。
// 允许你将 Schema 中的字段名（name、furigana 等）作为类型使用，以便在其他地方引用
type SchemaKey = keyof Schema;

// IFieldType 是一个泛型类型，定义一个表单字段的类型，其中 T 是 SchemaKey 的子类型，表示可以根据 Schema 中的字段名来定义不同的表单字段类型。 
// IFieldType 是与 React Hook Form 一起使用的，它包含了有关表单字段的信息和方法，以便在表单中进行验证和处理
export type IFieldType<T extends SchemaKey> = ControllerRenderProps<Schema, T>;
