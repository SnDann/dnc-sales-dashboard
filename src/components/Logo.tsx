import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '@/utils'

const LogoStyled = styled.img<{ height?: number; width?: number }>`
  height: ${({ height }) => (height ? pxToRem(height) : pxToRem(41))};
  width: ${({ width }) => (width ? pxToRem(width) : pxToRem(100))};
`

export const Logo: React.FC<{ height?: number; width?: number }> = ({
  height = 41,
  width = 100,
}) => (
  <LogoStyled
    src="/dnc-logo-black.svg.avif"
    alt="Logo"
    height={height}
    width={width}
  />
)

export default Logo
