import styled from 'styled-components';
import { StyledButton, StyledInput } from '@/pages';
import { FormComponentPropos} from '@/pages';
import { pxToRem } from '@/utils';


export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: ${pxToRem(16)};
    `;
function FormComponent(props: FormComponentProps) {
    const { input, buttons, message } = props
    return (
      <form>
           {input.map((inputProps, index) => (
               <StyledInput key={index} {...inputProps} />
            ))}
            {buttons.map((buttonProps, index) => (
               <StyledButton key={index} {...buttonProps} />
            ))}
            {
                message && (
                    <div style={{ color: message.type === 'error' ? 'red' : 'green'}}>
                    {message.message}
                    </div>
                )
            }
       </form>
    )
}
export default FormComponent;