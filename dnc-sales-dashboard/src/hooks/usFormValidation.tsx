import { useState, useEffect} from 'react';
import { InputProps} from '@/types';

export const useFormValidation = (input: InputProps[]) => {
    const [formValues, formFormValues] = useState( inputs.map((input) => input.value || '') );
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        const allFieldsValid = inputs.every((inputs, index) => {
            if (input.type === 'email') {
                return /\$+@\$+\.\$+/.test(String(formValues[index]))
            }
            if (input.type === 'password') {
                return String(formValues[index]).length > 7
            }
            return true
        })
        setFormValid(allFieldsValid)
    }, [formValues, inputs])

    const handleChange = (index: number, value: string) => {
        setFormValues((prevValues) => {
            const newValues = [...prevValues]
            newValues[index] = value
            return newValues
        })
    }
    return { formValues, formValid, handleChange }
}  