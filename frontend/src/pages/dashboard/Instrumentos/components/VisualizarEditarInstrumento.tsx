import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  InstrumentoDetalhe,
  InstrumentoDetalhesDialogProps,
} from "@/shared/interfaces/InstrumentoInterface";

const InstrumentoDetalhesDialog: React.FC<InstrumentoDetalhesDialogProps> = ({
  open,
  onClose,
  instrumento,
  onSave,
  isEditing,
}) => {
  const [editInstrumento, setEditInstrumento] =
    React.useState<InstrumentoDetalhe | null>(null);

  React.useEffect(() => {
    setEditInstrumento(
      instrumento || {
        id: 0,
        name: "",
      }
    );
  }, [instrumento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (editInstrumento) {
      setEditInstrumento({
        ...editInstrumento,
        [name]: name === "name" ? String(value) : value,
      });
    }
  };

  const handleSave = () => {
    if (editInstrumento && onSave) {
      onSave(editInstrumento);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEditing ? "Editar Instrumento" : "Detalhes do Instrumento"}
      </DialogTitle>
      <DialogContent>
        {editInstrumento ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="id"
                label="ID"
                name="id"
                value={editInstrumento.id}
                fullWidth
                margin="normal"
                disabled
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                label="Nome"
                name="name"
                value={editInstrumento.name}
                fullWidth
                margin="normal"
                disabled={!isEditing}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">
            Nenhum Instrumento selecionado.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {isEditing && (
          <Button
            onClick={handleSave}
            sx={{ mt: 2, backgroundColor: "#ff7f50", color: "white" }}
          >
            Salvar
          </Button>
        )}
        <Button
          onClick={onClose}
          sx={{ mt: 2, backgroundColor: "#ff7f50", color: "white" }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstrumentoDetalhesDialog;
