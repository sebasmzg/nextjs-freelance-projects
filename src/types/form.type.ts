export enum FieldType {
  Text = "text",
  Email = "email",
  Password = "password",
  Number = "number",
  Date = "date",
  Url = "url",
  Tel = "tel",
  Search = "search",
  Color = "color",
  Checkbox = "checkbox",
  Radio = "radio",
  File = "file",
  Select = "select",
}

export type FormType = "login" | "register";

export interface Options {
  label: string;
  value: string;
}

export interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: Options[];
}

export interface FormFieldProps {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: Options[];
}

export interface DynamicFormProps {
  type: FormType;
  onSubmit: (data: any) => void;
    isLoading?: boolean;
    globalError?: string | null;
}
