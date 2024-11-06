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
    Grid,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Tabs,
    Tab,
} from "@mui/material";
import { EventCreate, NovoEventoProps } from "@/shared/interfaces/EventoInterface";
import { MusicoService } from "@/shared/services/api/MusicoService";
import { MusicoDetalhe } from "@/shared/interfaces/MusicoInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import { MusicoInstrumento } from "@/shared/services/api/MusicoInstrumento";
import { MusicoInstrumentoDetalhe } from "@/shared/interfaces/MusicoInstrumentoInterface";

const NovoEvento: React.FC<NovoEventoProps> = ({ open, onClose, title, onSubmit }) => {
    const [musicos, setMusicos] = useState<MusicoDetalhe[]>([]);
    const [instrumentos, setInstrumentos] = useState<MusicoInstrumentoDetalhe[]>([]);
    const [selectedMusico, setSelectedMusico] = useState<number>(0);
    const [selectedInstrumento, setSelectedInstrumento] = useState<number>(0);
    const [formData, setFormData] = useState<EventCreate>({
        descricao: "",
        data_de: "",
        data_ate: "",
        hora_de: "",
        hora_ate: "",
        status: "Agendado",
        valor_total: 0,
        musicos: [],
    });
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        listarMusicos();
    }, []);

    const listarMusicos = async () => {
        try {
            const consulta = await MusicoService.findListMusicos();
            if (consulta instanceof Error) {
                setMusicos([]);
            } else {
                const musicosAtivos = consulta.filter((musico) => musico.status === 'Ativo');
                setMusicos(musicosAtivos);
            }
        } catch (error) {
            setMusicos([]);
        }
    };
    

    const listarInstrumentoMusico = async (idMusico: number) => {
        try {
            const consulta = await MusicoInstrumento.findInstrumentosByMusico(idMusico);
            if (consulta instanceof Error) {
                setInstrumentos([]);
            } else {
                setInstrumentos(consulta);
            }
        } catch (error) {
            setInstrumentos([]);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddMusico = () => {
        if (selectedMusico) {
            const musicoExistente = formData.musicos.some(
                (musico) => musico.id === selectedMusico
            );
    
            if (musicoExistente) {
                alert("Este músico já foi adicionado ao evento.");
            } else {
                const musico = musicos.find((m) => m.id === selectedMusico);
                const valorMusico = musico ? musico.valorEvento : 0;
    
                setFormData((prevData) => ({
                    ...prevData,
                    musicos: [
                        ...prevData.musicos,
                        { id: selectedMusico, instrumento: selectedInstrumento },
                    ],
                    valor_total: prevData.valor_total + valorMusico,
                }));
    
                setSelectedMusico(0);
                setSelectedInstrumento(0);
            }
        }
    };
    

    const handleRemoveMusico = (musicoId: number, instrumentoId: number) => {
        const musico = musicos.find((m) => m.id === musicoId);
        const valorMusico = musico ? musico.valorEvento : 0;

        setFormData((prevData) => ({
            ...prevData,
            musicos: prevData.musicos.filter(
                (musico) => musico.id !== musicoId || musico.instrumento !== instrumentoId
            ),
            valor_total: prevData.valor_total - valorMusico,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            descricao: "",
            data_de: "",
            data_ate: "",
            hora_de: "",
            hora_ate: "",
            status: "Agendado",
            valor_total: 0,
            musicos: [],
        });
    };

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
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>

                <Tabs value={tabIndex} onChange={(e, newTabIndex) => setTabIndex(newTabIndex)} centered>
                    <Tab label="Dados do Evento" />
                    <Tab label="Seleção de Músicos" />
                </Tabs>

                <Box component="form" sx={{ mt: 2 }}>
                    {tabIndex === 0 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="descricao"
                                    label="Descrição"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="data_de"
                                    label="Data de Início"
                                    type="date"
                                    value={formData.data_de}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="data_ate"
                                    label="Data de Fim"
                                    type="date"
                                    value={formData.data_ate}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="hora_de"
                                    label="Hora de Início"
                                    type="time"
                                    value={formData.hora_de}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="hora_ate"
                                    label="Hora de Fim"
                                    type="time"
                                    value={formData.hora_ate}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )}

                    {tabIndex === 1 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Músicos</InputLabel>
                                    <Select
                                        value={selectedMusico}
                                        onChange={(e) => {
                                            const musicoId = Number(e.target.value);
                                            setSelectedMusico(musicoId);
                                            listarInstrumentoMusico(musicoId);
                                        }}
                                        label="Músicos"
                                    >
                                        {musicos.map((musico) => (
                                            <MenuItem key={musico.id} value={musico.id}>
                                                {musico.fullName} - R${musico.valorEvento.toFixed(2)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {selectedMusico > 0 && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Instrumentos</InputLabel>
                                        <Select
                                            value={selectedInstrumento}
                                            onChange={(e) => setSelectedInstrumento(Number(e.target.value))}
                                            label="Instrumentos"
                                        >
                                            {instrumentos.map((instrumento) => (
                                                <MenuItem key={instrumento.id} value={instrumento.id}>
                                                    {instrumento.instrumento.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Button
                                    onClick={handleAddMusico}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Adicionar Músico
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <List>
                                    {formData.musicos.map((musico, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={`Músico: ${musicos.find((m) => m.id === musico.id)?.fullName}`}
                                                secondary={`Instrumento: ${instrumentos.find((i) => i.id === musico.instrumento)?.instrumento.name}`}
                                            />
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleRemoveMusico(musico.id, musico.instrumento)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    <strong>Total: R${formData.valor_total.toFixed(2)}</strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mr: 2 }}
                        >
                            Salvar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default NovoEvento;
