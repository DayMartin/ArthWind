import { Box, Button, Modal, Typography } from "@mui/material";

interface Activity {
    id: string;
    title: string;
    date: string;
  }
  

  export const ViewEvento: React.FC<{ activity: Activity | null; onClose: () => void }> = ({ activity, onClose }) => {
    if (!activity) return null;
  
    return (
      <Modal
        open={Boolean(activity)}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {activity.title}
          </Typography>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Data: {activity.date}
          </Typography>
          <Button onClick={onClose} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Fechar
          </Button>
        </Box>
      </Modal>
    );
  };