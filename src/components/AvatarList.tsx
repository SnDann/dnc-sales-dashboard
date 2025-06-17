import React from 'react';
import { Avatar, Box } from '@mui/material';
import { pxToRem } from '@/utils';
import { StyledH2, StyledSpan } from './Typographies';
import type { AvatarListProps } from '@/types';

const AvatarList: React.FC<AvatarListProps> = ({ listData }) => (
  <Box>
    {listData.map((item) => (
      <Box
        key={item.avatar ?? item.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: `${pxToRem(12)} 0`,
          marginBottom: pxToRem(16),
        }}
      >
        <Avatar
          src={item.avatar}
          alt={item.name}
          sx={{
            width: pxToRem(48),
            height: pxToRem(48),
            marginRight: pxToRem(16),
          }}
        />
        <Box>
          <StyledH2>{item.name}</StyledH2>
          {item.subtitle && <StyledSpan>{item.subtitle}</StyledSpan>}
        </Box>
      </Box>
    ))}
  </Box>
);

export default AvatarList;
