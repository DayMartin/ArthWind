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
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MusicoDetalhe } from "@/shared/interfaces/MusicoInterface";
import { MusicoService } from "@/shared/services/api/MusicoService";
import { BarraPerfilUsuarioProps } from "@/shared/interfaces/UsuarioInterface";
import { MusicoInstrumentoDetalhe } from "@/shared/interfaces/MusicoInstrumentoInterface";
import { InstrumentoDetalhe } from "@/shared/interfaces/InstrumentoInterface";
import { MusicoInstrumento } from "@/shared/services/api/MusicoInstrumento";
import { InstrumentoService } from "@/shared/services/api/InstrumentoService";

const PerfilUsuario: React.FC<BarraPerfilUsuarioProps> = ({
  open,
  onClose,
  idUser,
}) => {
  const isEditing = true;
  const [editUser, setEditUser] = React.useState<MusicoDetalhe | null>(null);
  const [instrumentos, setInstrumentos] = React.useState<
    MusicoInstrumentoDetalhe[]
  >([]);
  const [todosInstrumentos, setTodosInstrumentos] = React.useState<
    InstrumentoDetalhe[]
  >([]);
  const [selectedInstrument, setSelectedInstrument] = React.useState<
    number | ""
  >("");

  const consultaUser = async () => {
    try {
      const dados = await MusicoService.findOneMusico(idUser);
      if (dados instanceof Error) {
        setEditUser(null);
      } else {
        setEditUser(dados);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  React.useEffect(() => {
    if (open) {
      consultaUser();
    } else {
      setEditUser(null);
    }
  }, [open, idUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({
        ...editUser,
        [name]: name === "valorEvento" ? Number(value) : value,
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    if (editUser) {
      setEditUser({
        ...editUser,
        type: event.target.value,
      });
    }
  };

  const handleInstrumentSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedInstrument(Number(event.target.value));
  };

  const handleAddInstrumento = async () => {
    if (selectedInstrument && editUser) {
      const instrumentoId = selectedInstrument;
      const dados = {
        musicoId: editUser.id,
        instrumentoId: selectedInstrument,
      };
      const resultMusicoInstrumento = await MusicoInstrumento.create(dados);
      if (resultMusicoInstrumento instanceof Error) {
        return resultMusicoInstrumento.message;
      } else {
        alert("Instrumento adicionado com sucesso!");
        onClose();
      }
    }
  };

  const handleRemoveInstrumento = async (instrumentoId: number) => {
    if (editUser) {
      const resultMusicoInstrumento =
        await MusicoInstrumento.deleteMusicoInstrumento(instrumentoId);
      if (resultMusicoInstrumento instanceof Error) {
        return resultMusicoInstrumento.message;
      } else {
        alert("Instrumento excluído com sucesso!");
        onClose();
      }
    }
  };

  const ConsultarInstrumentosMusico = async (musicoId: number) => {
    try {
      const instrumentos = await MusicoInstrumento.findInstrumentosByMusico(
        musicoId
      );
      if (instrumentos instanceof Error) {
        console.error("Erro ao consultar instrumentos:", instrumentos.message);
        setInstrumentos([]);
      } else {
        setInstrumentos(instrumentos);
      }
    } catch (error) {
      console.error("Erro ao consultar instrumentos:", error);
      setInstrumentos([]);
    }
  };

  const ConsultarInstrumentos = async () => {
    try {
      const instrumentos = await InstrumentoService.findListInstrumentos();
      if (instrumentos instanceof Error) {
        console.error("Erro ao consultar instrumentos:", instrumentos.message);
        setTodosInstrumentos([]);
      } else {
        setTodosInstrumentos(instrumentos);
      }
    } catch (error) {
      console.error("Erro ao consultar instrumentos:", error);
      setTodosInstrumentos([]);
    }
  };

  const handleSave = async () => {
    if (editUser) {
      await onSave(editUser);
      onClose();
    }
  };

  const onSave = async (updatedMusico: MusicoDetalhe) => {
    try {
      await MusicoService.updateMusico(updatedMusico.id, updatedMusico);
      alert("Músico atualizado com sucesso");
      console.log("updatedMusico Perfil", updatedMusico);
      await consultaUser();
    } catch (error) {
      console.log("error", error);
      alert("Erro ao atualizar Músico");
    }
  };

  React.useEffect(() => {
    ConsultarInstrumentosMusico(idUser);
    ConsultarInstrumentos();
  }, [editUser]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEditing ? "Editar Músico" : "Detalhes do Músico"}
      </DialogTitle>
      <DialogContent>
        {editUser ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="id"
                label="ID"
                name="id"
                value={editUser.id}
                fullWidth
                margin="normal"
                disabled
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fullName"
                label="Nome Completo"
                name="fullName"
                value={editUser.fullName}
                fullWidth
                margin="normal"
                disabled={!isEditing}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                  labelId="type"
                  name="type"
                  value={editUser.type}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="musico">Músico</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="valorEvento"
                label="Valor/Hora Evento"
                name="valorEvento"
                type="number"
                value={editUser.valorEvento}
                fullWidth
                margin="normal"
                disabled={!isEditing}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="status"
                label="Status"
                name="status"
                value={editUser.status}
                fullWidth
                margin="normal"
                disabled
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                value={editUser.email}
                fullWidth
                margin="normal"
                disabled={!isEditing}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="senha"
                label="Senha"
                name="senha"
                type="password"
                value={editUser.senha || ""}
                fullWidth
                margin="normal"
                disabled={!isEditing}
                onChange={handleChange}
              />
            </Grid>
            {isEditing && (
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="select-instrumento">
                    Adicionar Instrumento
                  </InputLabel>
                  <Select
                    labelId="select-instrumento"
                    value={selectedInstrument}
                    onChange={handleInstrumentSelectChange}
                  >
                    <MenuItem value="">
                      <em>Selecionar Instrumento</em>
                    </MenuItem>
                    {todosInstrumentos.map((instrumento) => (
                      <MenuItem key={instrumento.id} value={instrumento.id}>
                        {instrumento.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  onClick={handleAddInstrumento}
                  sx={{ backgroundColor: "#ff7f50", color: "white" }}
                  variant="contained"
                >
                  Adicionar
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Instrumentos do Músico
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instrumentos.map((instrumento) => (
                      <TableRow key={instrumento.id}>
                        <TableCell>{instrumento.instrumento.id}</TableCell>
                        <TableCell>{instrumento.instrumento.name}</TableCell>
                        <TableCell>
                          {isEditing && (
                            <Button
                              onClick={() =>
                                handleRemoveInstrumento(instrumento.id)
                              }
                              color="error"
                              variant="outlined"
                            >
                              Remover
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Carregando...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "none",
            color: "#ff7f50",
            border: 1,
            borderColor: "#ff7f50",
          }}
        >
          Fechar
        </Button>
        {isEditing && (
          <Button
            onClick={handleSave}
            sx={{ backgroundColor: "#ff7f50", color: "white" }}
          >
            Salvar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PerfilUsuario;
