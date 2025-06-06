import styled from 'styled-components'
import { pxToRem } from '@/utils'

export const BannerImage = styled.figure<{ heigth: number, width: number }>`
  background-image: url(/${(props) => props.theme.appLogo});
    background-size: cover;
    height: ${(props) => pxToRem(props.heigth)};
    width: ${(props) => pxToRem(props.width)};
`