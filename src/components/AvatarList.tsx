import React from 'react'
import { Box, Avatar } from '@mui/material'
import type { AvatarsList as AvatarsListType } from '@/types/avatarsList'

interface AvatarListProps {
  avatars: {
    avatar: string
    name: string
    subtilte: string
  }[]
}

const AvatarList: React.FC<AvatarListProps> = ({ avatars }) => (
  <Box>
    {avatars.map((item, idx) => (
      <Box
        key={item.name + idx}
        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
      >
        <Avatar src={item.avatar} alt={item.name} sx={{ mr: 2 }} />
        <Box>
          <div>{item.name}</div>
          <div>{item.subtilte}</div>
        </Box>
      </Box>
    ))}
  </Box>
)

export default AvatarList
