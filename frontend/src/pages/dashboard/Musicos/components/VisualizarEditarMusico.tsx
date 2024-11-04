import * as React from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, Typography, Grid, FormControl, Select,
    SelectChangeEvent, InputLabel, MenuItem, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper
} from "@mui/material";
import { MusicoDetalhe, MusicoDetalhesDialogProps } from "@/shared/interfaces/MusicoInterface";
import { MusicoInstrumentoDetalhe } from "@/shared/interfaces/MusicoInstrumentoInterface";
import { MusicoInstrumento } from "@/shared/services/api/MusicoInstrumento";
import { InstrumentoService } from "@/shared/services/api/InstrumentoService";
import { InstrumentoDetalhe } from "@/shared/interfaces/InstrumentoInterface";

const MusicoDetalhesDialog: React.FC<MusicoDetalhesDialogProps> = ({ open, onClose, musico, onSave, isEditing }) => {
    const [editMusico, setEditMusico] = React.useState<MusicoDetalhe | null>(null);
    const [instrumentos, setInstrumentos] = React.useState<MusicoInstrumentoDetalhe[]>([]);
    const [todosInstrumentos, setTodosInstrumentos] = React.useState<InstrumentoDetalhe[]>([]);
    const [selectedInstrument, setSelectedInstrument] = React.useState<number | "">("");

    React.useEffect(() => {
        if (musico) {
            setEditMusico({
                ...musico,
                instrumentos: musico.instrumentos || []
            });
            ConsultarInstrumentosMusico(musico.id);
        } else {
            setEditMusico({
                id: 0,
                fullName: "",
                email: "",
                senha: "",
                type: "",
                status: "Ativo",
                valorEvento: 0,
                instrumentos: []
            });
        }
        ConsultarInstrumentos();
    }, [musico]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editMusico) {
            setEditMusico({
                ...editMusico,
                [name]: name === 'valorEvento' ? Number(value) : value
            });
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        if (editMusico) {
            setEditMusico({
                ...editMusico,
                type: event.target.value,
            });
        }
    };

    const handleInstrumentSelectChange = (event: SelectChangeEvent<number>) => {
        setSelectedInstrument(Number(event.target.value));
    };

    const handleAddInstrumento = async() => {
        if (selectedInstrument && editMusico) {
            const instrumentoId = selectedInstrument;
            const instrumentoExists = editMusico.instrumentos.includes(instrumentoId);
            if (!instrumentoExists) {
                const dados = {
                    musicoId: editMusico.id,
                    instrumentoId: selectedInstrument

                }
                const resultMusicoInstrumento = await MusicoInstrumento.create(dados)
                if (resultMusicoInstrumento instanceof Error) {
                    return resultMusicoInstrumento.message;
                } else {
                    alert('Instrumento adicionado com sucesso!');
                    onClose();
                }
            }
        }
    };

    const handleRemoveInstrumento = async(instrumentoId: number) => {
        if (editMusico) {
            const resultMusicoInstrumento = await MusicoInstrumento.deleteMusicoInstrumento(instrumentoId)
            if (resultMusicoInstrumento instanceof Error) {
                return resultMusicoInstrumento.message;
            } else {
                alert('Instrumento excluído com sucesso!');
                onClose();
            }
        }
    };

    const handleSave = () => {
        if (editMusico && onSave) {
            onSave(editMusico);
            onClose();
        }
    };

    const ConsultarInstrumentosMusico = async (musicoId: number) => {
        try {
            const instrumentos = await MusicoInstrumento.findInstrumentosByMusico(musicoId);
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEditing ? "Editar Músico" : "Detalhes do Músico"}</DialogTitle>
            <DialogContent>
                {editMusico ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="id"
                                label="ID"
                                name="id"
                                value={editMusico.id}
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
                                value={editMusico.fullName}
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
                                    value={editMusico.type}
                                    onChange={handleSelectChange}
                                    displayEmpty
                                    disabled={!isEditing}
                                >
                                    <MenuItem value="adm">Administrador</MenuItem>
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
                                value={editMusico.valorEvento}
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
                                value={editMusico.status}
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
                                value={editMusico.email}
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
                                value={editMusico.senha || ""}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        {isEditing && (
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="select-instrumento">Adicionar Instrumento</InputLabel>
                                    <Select
                                        labelId="select-instrumento"
                                        value={selectedInstrument}
                                        onChange={handleInstrumentSelectChange}
                                    >
                                        <MenuItem value=""><em>Selecionar Instrumento</em></MenuItem>
                                        {todosInstrumentos.map((instrumento) => (
                                            <MenuItem key={instrumento.id} value={instrumento.id}>
                                                {instrumento.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button onClick={handleAddInstrumento} color="primary" variant="contained">Adicionar</Button>
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
                                                            onClick={() => handleRemoveInstrumento(instrumento.id)}
                                                            color="secondary"
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
                <Button onClick={onClose} color="primary">Fechar</Button>
                {isEditing && <Button onClick={handleSave} color="primary">Salvar</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default MusicoDetalhesDialog;
