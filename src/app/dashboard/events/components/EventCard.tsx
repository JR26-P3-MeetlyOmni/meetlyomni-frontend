'use client';

import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Event } from '../../../../constants/Event';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(1),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PlaceholderBox = styled(Box)(({ theme }) => ({
  height: 200,
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit }) => {
  const handleEditClick = () => {
    onEdit(event);
  };

  return (
    <StyledCard>
      <EditButton onClick={handleEditClick} aria-label="edit event" size="small">
        <EditIcon />
      </EditButton>

      {event.coverImageUrl ? (
        <StyledCardMedia image={event.coverImageUrl} title={event.name} />
      ) : (
        <PlaceholderBox>
          <Typography variant="body2" color="text.secondary">
            No Image
          </Typography>
        </PlaceholderBox>
      )}

      <StyledCardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {event.description}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default EventCard;
