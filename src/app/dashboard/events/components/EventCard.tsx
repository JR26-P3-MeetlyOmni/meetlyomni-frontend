import { Event } from '@/constants/Event';

import React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import EditEventModal from './EditEvent/EditEventModal';
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
  onEventUpdated?: (event: Event) => void;
};

// Convert EventItem to Event type
const convertEventItemToEvent = (eventItem: EventItem): Event => {
  return {
    id: eventItem.id,
    name: eventItem.title,
    date: eventItem.createdAt,
    description: eventItem.description || '',
    coverImageUrl: eventItem.coverImageUrl,
    status: eventItem.isDraft ? 0 : 1,
    createdByName: eventItem.creator.name,
    createdByAvatar: eventItem.creator.avatarUrl,
    createdAt: eventItem.createdAt,
    updatedAt: eventItem.createdAt,
  };
};

export const EventCard: React.FC<Props> = ({ event, onEventUpdated }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const onEditClick = () => {
    setEditModalOpen(true);
  };

  const onEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    onEventUpdated?.(updatedEvent);
  };

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
          <Button variant="outlined" size="small" onClick={onEditClick}>
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
      <EditEventModal
        open={editModalOpen}
        event={convertEventItemToEvent(event)}
        onClose={onEditModalClose}
        onEventUpdated={handleEventUpdated}
      />
    </CardRoot>
  );
};

export default EventCard;
