import styled from 'styled-components';
import { ButtonProps } from '@/pages';
import { pxToRem } from '@/utils';

export const StyledButton = styled.button<ButtonProps>`
  border-radius: ${pxToRem(8)};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${pxToRem(16)};
  font-weight: bold;
  height: ${pxToRem(50)};
  padding: 0 ${pxToRem(16)};
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;

  &.primary {
    background-color: ${props => props.theme.buttons.primary};
    color: ${props => props.theme.buttons.primaryColor};
    &:hover {
      background-color: ${props => props.theme.buttons.primaryHover};
    }
  }

  &.alert {
    background-color: ${props => props.theme.buttons.alert};
    color: ${props => props.theme.buttons.alertColor};
    &:hover {
      background-color: ${props => props.theme.buttons.alertHover};
    }
  }

  &.borderless-alert {
    background: none;
    color: ${props => props.theme.buttons.alert};
    height: 0;
    padding: 0;
    &:hover {
      color: ${props => props.theme.buttons.alertHover};
    }
  }

  &.disabled {
    background-color: ${props => props.theme.buttons.disabled};
    color: ${props => props.theme.buttons.disabledColor};
    cursor: not-allowed;
    &:hover {
      color: ${props => props.theme.buttons.disabledColor};
    }
  }
`;
