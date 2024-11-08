import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Grid } from "@mui/material";
import { InstrumentoCreate } from "@/shared/interfaces/InstrumentoInterface";
import { CadastrarInstrumentoProps } from "@/shared/interfaces/InstrumentoInterface";

const CadastrarInstrumento: React.FC<CadastrarInstrumentoProps> = ({ open, onClose, title, onSubmit }) => {
    const [formData, setFormData] = useState<InstrumentoCreate>({
        name: "",
      });
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'name' ? String(value) : value
        });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
        resetForm();

    };

    const resetForm = () => {
        setFormData({
            name: "",
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name"
                                label="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>

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

export default CadastrarInstrumento;
