// src/app/dashboard/events/components/EventCard.tsx
import React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import {
  Actions,
  CardRoot,
  Cover,
  CreatorAvatar,
  CreatorRow,
  Desc,
  Middle,
  PlayCountText,
  Right,
  Title,
  TitleRow,
} from './EventCard.styles';
import type { EventItem } from './eventMocks';
import { AVATAR_PLACEHOLDER, COVER_PLACEHOLDER } from './eventMocks';

type Props = {
  event: EventItem;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const coverSrc = event.coverImageUrl || COVER_PLACEHOLDER;
  const avatarSrc = event.creator.avatarUrl || AVATAR_PLACEHOLDER;

  return (
    <CardRoot role="listitem" aria-label={event.title}>
      <Cover src={coverSrc} alt="event-cover" />
      <Middle>
        <TitleRow>
          <Title variant="h6">{event.title}</Title>
          {event.isDraft ? <Chip size="small" label="Draft" color="default" /> : null}
        </TitleRow>
        <Desc variant="body2">{event.description}</Desc>
        <CreatorRow>
          <CreatorAvatar src={avatarSrc} alt={event.creator.name || 'creator'} />
          <Typography variant="body2">{event.creator.name}</Typography>
        </CreatorRow>
      </Middle>
      <Right>
        <PlayCountText variant="body2">
          Play {event.playCount} {event.playCount === 1 ? 'time' : 'times'}
        </PlayCountText>
        <Actions>
          <Button variant="contained" size="small" disableElevation>
            Host live game
          </Button>
          <Button variant="outlined" size="small">
            Edit
          </Button>
          <IconButton aria-label="more actions" onClick={onMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={onMenuClose}>
            <MenuItem onClick={onMenuClose}>Rename</MenuItem>
            <MenuItem onClick={onMenuClose}>Share</MenuItem>
            <MenuItem onClick={onMenuClose}>Delete</MenuItem>
          </Menu>
        </Actions>
      </Right>
    </CardRoot>
  );
};

export default EventCard;
