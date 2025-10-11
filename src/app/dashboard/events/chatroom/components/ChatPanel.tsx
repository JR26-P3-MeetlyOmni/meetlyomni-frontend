import React, { useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatMessage {
  id: string;
  user: string;
  text: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSend }) => {
  const [input, setInput] = React.useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <Box display="flex" flexDirection="column" flex={1} bgcolor="#222" color="#fff" p={2}>
      <Box flex={1} overflow="auto" mb={1}>
        {messages.map((m) => (
          <Typography key={m.id} sx={{ mb: 0.5 }}>
            <b>{m.user}: </b>{m.text}
          </Typography>
        ))}
        <div ref={chatEndRef} />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            sx: { bgcolor: "#fff", borderRadius: 2 },
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPanel;
