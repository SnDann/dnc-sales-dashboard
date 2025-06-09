import React from 'react'
import { Box, Avatar } from '@mui/material'

import type { AvatarsList } from '../types/avatarsList'

interface AvatarListProps {
  avatars: AvatarsList
}

const AvatarList: React.FC<AvatarListProps> = ({ avatars }) => (
  <Box>
    {avatars.map((item) => (
      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={item.src} alt={item.name} sx={{ mr: 2 }} />
        <Box>
          <div>{item.name}</div>
          {item.subtitle && <div>{item.subtitle}</div>}
        </Box>
      </Box>
    ))}
  </Box>
)

export default AvatarList
