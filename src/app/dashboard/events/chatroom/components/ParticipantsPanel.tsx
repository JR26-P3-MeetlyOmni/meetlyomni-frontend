import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

interface Participant {
  id: string;
  name: string;
  email?: string;
}

interface ParticipantsPanelProps {
  participants: Participant[];
}

const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({ participants }) => {
  return (
    <Box width="260px" bgcolor="#111" color="#fff" p={2}>
      <Typography variant="subtitle1" gutterBottom>
        Participants ({participants.length})
      </Typography>
      {participants.map((p) => (
        <Box key={p.id} display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar sx={{ width: 28, height: 28 }}>{p.name.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="body2">{p.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ParticipantsPanel;
