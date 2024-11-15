import { EventDetalhe } from "@/shared/interfaces/EventoInterface";
import { MusicoInstrumentoCompleto } from "@/shared/interfaces/MusicoInstrumentoInterface";
import { EventoMusico } from "@/shared/services/api/EventoMusicoService";
import { EventoService } from "@/shared/services/api/EventoService";
import {
  Box,
  Button,
  Modal,
  Typography,
  Divider,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const ViewEvento: React.FC<{
  activity: EventDetalhe | null;
  onClose: () => void;
}> = ({ activity, onClose }) => {
  if (!activity) return null;

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const excluirEvento = async (eventoId: number) => {
    await excluirEventoMusico(eventoId);
    const resultMusicoInstrumento = await EventoService.deleteEvento(eventoId);
    if (resultMusicoInstrumento instanceof Error) {
      alert(`Erro: ${resultMusicoInstrumento.message}`);
    } else {
      alert("Evento excluído com sucesso!");
      onClose();
    }
  };

  const excluirEventoMusico = async (eventoId: number) => {
    const resultMusicoInstrumento = await EventoMusico.deleteMusicoEventoByEvento(eventoId);
    if (resultMusicoInstrumento instanceof Error) {
      alert(`Erro: ${resultMusicoInstrumento.message}`);
    } else {
      alert("EventoMusico excluído com sucesso!");
      onClose();
    }
  };

  return (
    <Modal
      open={Boolean(activity)}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {activity.descricao}
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            mt: 2,
            "& .MuiTabs-indicator": {
              backgroundColor: "#ff7f50",
            },
          }}
        >
          <Tab
            label="Dados Gerais"
            sx={{
              color: "#ff7f50",
              "&.Mui-selected": {
                color: "#ff7f50",
              },
            }}
          />
          <Tab label="Músicos e Instrumentos" 
          sx={{
            color: "#ff7f50",
            "&.Mui-selected": {
              color: "#ff7f50",
            },
          }}
          />
        </Tabs>

        {tabIndex === 0 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Data"
              value={`${activity.data_de} - ${activity.data_ate}`}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Horário"
              value={`${activity.hora_de} - ${activity.hora_ate}`}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Status"
              value={activity.status}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Valor Total"
              value={`R$ ${activity.valor_total.toFixed(2)}`}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ mt: 2 }}>
            {activity.musicos && activity.musicos.length > 0 ? (
              <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                {activity.musicos.map((musico, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      padding: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <TextField
                      label="Nome do Músico"
                      value={musico.musico.fullName}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Email"
                      value={musico.musico.email}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Valor por Evento"
                      value={`R$ ${musico.musico.valorEvento.toFixed(2)}`}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Instrumento"
                      value={musico.instrumento.name}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ mb: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                Nenhum músico associado.
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            sx={{ mr: 2, backgroundColor: "#ff7f50", color: "white" }}

          >
            Fechar
          </Button>
          <Button
            onClick={() => excluirEvento(activity.id)}
            variant="contained"
            sx={{ width: "100px", backgroundColor: '#c90808' }}
          >
            Excluir
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
