"use client"

import { useFormContext } from "react-hook-form";
import { FieldType, FormFieldProps } from "types/form.type";
import { Checkbox } from "ui/atoms/Checkbox";
import { ErrorMessage } from "ui/atoms/ErrorMessage";
import { Input } from "ui/atoms/Input";
import { Select } from "ui/atoms/Select";
import { Label } from "ui/atoms/Label";
import { useState } from "react";

export const FormField = ({
  name,
  label,
  type,
  placeholder,
  options,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let autoCompleteProps = {};
  if (type === FieldType.Email) {
    autoCompleteProps = { autoComplete: "email" };
  } else if (type === FieldType.Password) {
    autoCompleteProps = { autoComplete: "current-password" };
  } else if (type === FieldType.Text && name.toLowerCase().includes("name")) {
    autoCompleteProps = { autoComplete: "name" };
  } else if (type === FieldType.Tel) {
    autoCompleteProps = { autoComplete: "tel" };
  }

  return (
    <div className="mb-4">
      {type !== FieldType.Checkbox && <Label htmlFor={name}>{label}</Label>}
      {type === FieldType.Text ||
      type === FieldType.Email ||
      type === FieldType.Number ||
      type === FieldType.Tel ? (
        <>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            hasError={!!error}
            {...register(name)}
            {...autoCompleteProps}
          />
          <ErrorMessage message={error} />
        </>
      ) : type === FieldType.Password ? (
        <div className="relative">
          <Input 
            id={name}
            type={showPassword ? "text" : "password"}
            hasError={!!error}
            {...register(name)}
            {...autoCompleteProps}
            className="pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <span>Hide</span>
            ): (
              <span>Show</span>
            )}
          </button>
        </div>
      ) : type === FieldType.Select && options ? (
        <>
          <Select
            id={name}
            options={options}
            hasError={!!error}
            {...register(name)}
          />
          <ErrorMessage message={error} />
        </>
      ) : type === FieldType.Checkbox ? (
        <>
          <Checkbox label={label} {...register(name)} hasError={!!error} />
          <ErrorMessage message={error} />
        </>
      ) : null}
    </div>
  );
};
