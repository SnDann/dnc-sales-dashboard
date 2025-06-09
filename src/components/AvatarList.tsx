import { StyledH2, StyledSpan } from './Typographies'
import { Avatar, Box } from '@mui/material'
import { pxToRem } from '@/utils'
import type { AvatarListProps } from '@/types'

function AvatarList(props: AvatarListProps) {
  return (
    <>
      {props.listData.map((item) => (
        <Box
          key={item.avatar ?? item.name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: `${pxToRem(12)} 0`,
          }}
        >
          <Box>
            <Avatar
              src={item.avatar}
              alt={item.name}
              sx={{
                width: pxToRem(48),
                height: pxToRem(48),
                marginRight: pxToRem(16),
              }}
            />
          </Box>
          <Box>
            <StyledH2>{item.name}</StyledH2>
            <StyledSpan>{item.subtitle}</StyledSpan>
          </Box>
        </Box>
      ))}
    </>
  )
}

export default AvatarList
