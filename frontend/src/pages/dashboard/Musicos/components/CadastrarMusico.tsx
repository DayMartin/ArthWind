import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Grid } from "@mui/material";
import { MusicoCreate } from "@/shared/interfaces/MusicoInterface";

interface CadastrarMusicoProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: any) => void; 
}

const CadastrarMusico: React.FC<CadastrarMusicoProps> = ({ open, onClose, title, onSubmit }) => {
    const [formData, setFormData] = useState<MusicoCreate>({
        fullName: "",
        email: "",
        senha: "",
        type: "",
        status: "Ativo",
        valorEvento: 0,
      });
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'valorEvento' ? Number(value) : value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setFormData({
            ...formData,
            type: event.target.value
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
            status: "",
            valorEvento: 0,
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 600,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="type">Tipo</InputLabel>
                        <Select
                            labelId="type"
                            name="type"
                            value={formData.type}
                            onChange={handleSelectChange}
                            displayEmpty
                        >
                            <MenuItem value="adm">Administrador</MenuItem>
                            <MenuItem value="musico">Musico</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="fullName"
                                label="fullName"
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
                                id="senha"
                                label="Senha"
                                name="senha"
                                type="password"
                                value={formData.senha || ""}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CadastrarMusico;
