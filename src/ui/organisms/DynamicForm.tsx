import { useFormBuilder } from "infrastructure/hooks/useFormBuilder";
import { formConfigs } from "infrastructure/utils/formConfig";
import { FormProvider } from "react-hook-form";
import { DynamicFormProps } from "types/form.type";
import { Button } from "ui/atoms/Button";
import { Title } from "ui/atoms/FormTitle";
import { FormField } from "ui/molecule/FormField";
import { ErrorMessage as GlobalErrorMessage } from "ui/atoms/ErrorMessage";

export const DynamicForm = ({
  type,
  onSubmit,
  isLoading,
  globalError,
}: DynamicFormProps) => {
  const config = formConfigs[type];
  const methods = useFormBuilder(type);

  const baseClasses = "mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg";

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={baseClasses}>
        <Title>{type === "login" ? "Login" : "Sign up"}</Title>
        {globalError && <GlobalErrorMessage message={globalError} />}
        {config.map((field) => (
          <FormField key={field.name} {...field} />
        ))}
        <Button variant="primary" size="medium" type="submit">
          {isLoading ? "Signing in..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};
