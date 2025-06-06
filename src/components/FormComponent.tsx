import styled from 'styled-components'
import { pxToRem } from '@/utils'
import type { FormComponentProps } from '@/types/form.Component' // type-only import

import { StyledButton } from './StyledButton'
import { StyledInput } from './StyledInput'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`

function FormComponent({
  inputs,
  buttons,
  message,
}: Readonly<FormComponentProps>) {
  return (
    <StyledForm>
      {inputs.map((inputProps, idx) => (
        <StyledInput
          key={inputProps.name ?? inputProps.type ?? idx}
          {...inputProps}
        />
      ))}
      {buttons.map((buttonProps, idx) => (
        <StyledButton key={buttonProps.type ?? idx} {...buttonProps} />
      ))}
      {message && (
        <div className={`form-message ${message.type}`}>{message.message}</div>
      )}
    </StyledForm>
  )
}

export default FormComponent
