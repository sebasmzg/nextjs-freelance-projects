import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemas } from "lib/validation/form.schema";
import { useForm } from "react-hook-form";
import { FormType } from "types/form.type";
import { z } from "zod";

export function useFormBuilder<T extends FormType>(type: T) {
    const schema = formSchemas[type] as z.ZodType<any>;
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    })

    return methods;
}