import * as React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MusicoService } from "@/shared/services/api/MusicoService";
import { BarraMusicosProps, MusicoCreate } from "@/shared/interfaces/MusicoInterface";
import CadastrarMusico from "./CadastrarMusico";
import { Environment } from "@/shared/environment";
import { MusicoInstrumento } from "@/shared/services/api/MusicoInstrumento";
import { MusicoInstrumentoCreate } from "@/shared/interfaces/MusicoInstrumentoInterface";

export const BarraMusicos: React.FC<BarraMusicosProps> = ({
    listar,
    onFilterIdChange,
}) => {
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const placeholder = Environment.INPUT_DE_BUSCA;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData: MusicoCreate) => {
        const result = await MusicoService.create(formData);
        if (result instanceof Error) {
            console.log(result.message);
        } else {
            const musicoId = result.id;
            if (formData.instrumentos && formData.instrumentos.length > 0) {
                for (const instrumentoId of formData.instrumentos) {
                    const dados: MusicoInstrumentoCreate = {
                        musicoId: musicoId,
                        instrumentoId: instrumentoId
                    };

                    const instrumentoResult = await createMusicoInstrumento(dados);

                    if (instrumentoResult instanceof Error) {
                        console.log(instrumentoResult.message);
                    } else {
                        console.log(`Instrumento ${instrumentoId} adicionado ao músico ${musicoId}`);
                    }
                }
            }
            listar();
            handleClose();
        }
    };

    const createMusicoInstrumento = async (dados: MusicoInstrumentoCreate) => {
        const resultMusicoInstrumento = await MusicoInstrumento.create(dados)

        if (resultMusicoInstrumento instanceof Error) {
            return resultMusicoInstrumento.message;
        } else {
            return resultMusicoInstrumento
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
                    backgroundColor: '#ff7f50', 
                    color: 'white'
                }}

            >
                Adicionar Músico
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

            <CadastrarMusico open={open} onClose={handleClose} title="Novo Músico" onSubmit={handleSubmit} />
        </Box>
    );
};
