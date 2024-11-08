import * as React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InstrumentoService } from "@/shared/services/api/InstrumentoService";
import { BarraInstrumentosProps, InstrumentoCreate } from "@/shared/interfaces/InstrumentoInterface";
import CadastrarInstrumento from "./CadastrarInstrumento";
import { Environment } from "@/shared/environment";

export const BarraInstrumentos: React.FC<BarraInstrumentosProps> = ({
    listar,
    onFilterIdChange,
}) => {
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const placeholder = Environment.INPUT_DE_BUSCA;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData: InstrumentoCreate) => {
        const result = await InstrumentoService.create(formData);
        
        if (result instanceof Error) {
            console.log(result.message);
        } else {
            alert('Instrumento criado com sucesso!');
            listar();
            handleClose();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            const [name] = newValue.split(' ');
            onFilterIdChange(name);
        }, 700); 

        setDebounceTimer(timer);
    }; 

    return (
        <Box
            sx={{
                m: 1,
                width: "100%",
                height: '60px',
                marginTop: "2%",
                paddingTop: '2%',
                paddingBottom: '2%',
                backgroundColor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
            }}
        >
            <Button 
                variant="contained" 
                onClick={handleOpen} 
                sx={{ 
                    mb: 2, 
                    minWidth: '150px',
                    whiteSpace: 'nowrap',
                    backgroundColor: '#ff8c00', 
                    color: 'white'
                }}
            >
                Adicionar Instrumento                 
            </Button>

            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <SearchIcon />
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <CadastrarInstrumento open={open} onClose={handleClose} title="Novo Instrumento" onSubmit={handleSubmit} />
        </Box>
    );
};
