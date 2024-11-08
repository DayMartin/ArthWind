import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { MusicoCreate } from "@/shared/interfaces/MusicoInterface";
import { CadastrarMusicoProps } from "@/shared/interfaces/MusicoInterface";
import { InstrumentoDetalhe } from "@/shared/interfaces/InstrumentoInterface";
import { InstrumentoService } from "@/shared/services/api/InstrumentoService";
import DeleteIcon from "@mui/icons-material/Delete";

const CadastrarMusico: React.FC<CadastrarMusicoProps> = ({
  open,
  onClose,
  title,
  onSubmit,
}) => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoDetalhe[]>([]);
  const [formData, setFormData] = useState<MusicoCreate>({
    fullName: "",
    email: "",
    senha: "",
    type: "",
    status: "Ativo",
    valorEvento: 0,
    instrumentos: [],
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "valorEvento" ? Number(value) : value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const instrumentoId = event.target.value as number;
    if (!formData.instrumentos.includes(instrumentoId)) {
      setFormData({
        ...formData,
        instrumentos: [...formData.instrumentos, instrumentoId],
      });
    }
  };
  const handleRemoveInstrumento = (instrumentoId: number) => {
    setFormData({
      ...formData,
      instrumentos: formData.instrumentos.filter((id) => id !== instrumentoId),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      senha: "",
      type: "",
      status: "Ativo",
      valorEvento: 0,
      instrumentos: [],
    });
  };

  const ConsultarInstrumentos = async () => {
    try {
      const instrumentos = await InstrumentoService.findListInstrumentos();
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

  useEffect(() => {
    ConsultarInstrumentos();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: "orange" }}>
          {title}
        </Typography>
        <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{
            mt: 2,
            '& .MuiTabs-indicator': {
            backgroundColor: 'orange',
            },
        }}
        >
        <Tab 
            label="Dados do Músico" 
            sx={{
            color: 'orange',
            '&.Mui-selected': {
                color: '#e38e00',
            },
            }} 
        />
        <Tab 
            label="Instrumentos" 
            sx={{
            color: 'orange', 
            '&.Mui-selected': {
                color: '#e38e00', 
            },
            }} 
        />
        </Tabs>

        <Box component="form" sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                  labelId="type"
                  name="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="musico">Músico</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fullName"
                    label="Nome Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="valorEvento"
                    label="Valor/Hora Evento"
                    type="number"
                    value={formData.valorEvento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="senha"
                    label="Senha"
                    type="password"
                    value={formData.senha || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="instrumento-label">Instrumentos</InputLabel>
                <Select
                  labelId="instrumento-label"
                  name="instrumento_id"
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  {instrumentos.map((instrumento) => (
                    <MenuItem key={instrumento.id} value={instrumento.id}>
                      {instrumento.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Table
                sx={{
                  mt: 2,
                  maxHeight: 200,
                  overflow: "auto",
                  display: "block",
                  width: "auto",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Instrumento</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.instrumentos.map((instrumentoId) => {
                    const instrumento = instrumentos.find(
                      (instr) => instr.id === instrumentoId
                    );
                    return (
                      <TableRow key={instrumentoId}>
                        <TableCell>
                          {instrumento?.name || "Instrumento desconhecido"}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleRemoveInstrumento(instrumentoId)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: "#ff8c00", color: "white" }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CadastrarMusico;
