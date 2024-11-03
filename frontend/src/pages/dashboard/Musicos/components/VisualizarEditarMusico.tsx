import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Grid, FormControl, Select, SelectChangeEvent, InputLabel, MenuItem } from "@mui/material";
import { MusicoDetalhe, MusicoDetalhesDialogProps } from "@/shared/interfaces/MusicoInterface";

const MusicoDetalhesDialog: React.FC<MusicoDetalhesDialogProps> = ({ open, onClose, musico: musico, onSave, isEditing }) => {
    const [editMusico, setEditMusico] = React.useState<MusicoDetalhe | null>(null);


    React.useEffect(() => {
        setEditMusico(musico || {
            id: 0,
            fullName: "",
            email: "",
            senha: "",
            type: "",
            status: "Ativo",
            valorEvento: 0,
        });
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

    const handleSave = () => {
        if (editMusico && onSave) {
            onSave(editMusico);
            onClose();
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
                                    <MenuItem value="musico">Musico</MenuItem>

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
                    </Grid>
                ) : (
                    <Typography variant="body1">Nenhum Musico selecionado.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                {isEditing && <Button onClick={handleSave} color="primary">Salvar</Button>}
                <Button onClick={onClose} color="primary">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MusicoDetalhesDialog;
