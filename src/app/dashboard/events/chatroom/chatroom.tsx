import HeaderBar from "./components/HeaderBar";
import ChatPanel from "./components/ChatPanel";
import ParticipantsPanel from "./components/ParticipantsPanel";
import CaptionsPanel from "./components/CaptionsPanel";
import SnackbarAlert, { SnackbarState } from "./components/SnackbarAlert";

const LiveEventPage = () => {
  const messages = []; // mock data
  const participants = [];
  const handleSend = (msg: string) => console.log("Send:", msg);
  const [captions, setCaptions] = React.useState([
    { id: "1", text: "Hello everyone!", translatedText: "大家好！" },
  ]);
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
  });

  const showMessage = (msg: string, type: SnackbarState["severity"] = "info") => {
    setSnackbar({ open: true, message: msg, severity: type });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <HeaderBar title="Test chat room event" />
      <Box display="flex" flex={1}>
        <ChatPanel messages={messages} onSend={handleSend} />
        <ParticipantsPanel participants={participants} />
        <CaptionsPanel captions={captions} isPaused={false} />
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
};
