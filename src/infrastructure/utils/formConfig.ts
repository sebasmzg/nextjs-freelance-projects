import { BaseField, FieldType, FormType } from "types/form.type";

export const formConfigs: Record<FormType, BaseField[]> = {
    login: [
        {
            name:'email',
            label: 'Email',
            type: FieldType.Email,
            required: true
        },
        {
            name:'password',
            label: 'Password',
            type: FieldType.Password,
            required: true
        }
    ],
    register: [
        {
            name:'name',
            label: 'Name',
            type: FieldType.Text,
            required: true
        },
        {
            name:'email',
            label: 'Email',
            type: FieldType.Email,
            required: true
        },
        {
            name:'password',
            label: 'Password',
            type: FieldType.Password,
            required: true
        }
    ]
}