import React from "react";
import { Box, Typography, Chip } from "@mui/material";

interface HeaderBarProps {
  title: string;
  isLive?: boolean;
  role?: "host" | "participant";
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, isLive = true, role = "host" }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      py={1.5}
      bgcolor="#1e1e1e"
      color="#fff"
      boxShadow={1}
    >
      <Typography variant="h6" noWrap>{title}</Typography>

      <Box display="flex" alignItems="center" gap={1}>
        {isLive && <Chip label="LIVE" color="error" size="small" />}
        <Chip label={role.toUpperCase()} color="default" size="small" />
      </Box>
    </Box>
  );
};

export default HeaderBar;
