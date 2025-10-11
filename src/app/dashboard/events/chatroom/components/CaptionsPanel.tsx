import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface Caption {
  id: string;
  text: string;
  speaker?: string;
  translatedText?: string;
}

interface CaptionsPanelProps {
  captions: Caption[];
  isPaused?: boolean;
  onStart?: () => void;
}

const CaptionsPanel: React.FC<CaptionsPanelProps> = ({ captions, isPaused = false, onStart }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        m: 2,
        p: 2,
        bgcolor: "#1c1c1c",
        color: "#fff",
        overflowY: "auto",
        borderRadius: 2,
      }}
    >
      {captions.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          color="#999"
        >
          <Typography>No captions yet</Typography>
          {isPaused && (
            <Typography
              variant="body2"
              sx={{ mt: 1, cursor: "pointer", color: "#66f" }}
              onClick={onStart}
            >
              Click to start live captions
            </Typography>
          )}
        </Box>
      ) : (
        captions.map((c) => (
          <Box key={c.id} mb={1.5}>
            {c.speaker && (
              <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
                {c.speaker}:
              </Typography>
            )}
            <Typography variant="body1">{c.text}</Typography>
            {c.translatedText && (
              <Typography variant="body2" sx={{ color: "#66bb6a" }}>
                {c.translatedText}
              </Typography>
            )}
          </Box>
        ))
      )}
    </Paper>
  );
};

export default CaptionsPanel;
