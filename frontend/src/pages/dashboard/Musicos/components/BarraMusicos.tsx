import { Box, Button } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import { MusicoService } from "@/shared/services/api/MusicoService";
import { BarraMusicosProps, MusicoCreate } from "@/shared/interfaces/MusicoInterface";
import CadastrarMusico from "./CadastrarMusico";


export const BarraMusicos: React.FC<BarraMusicosProps> = ({
    listar
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData: MusicoCreate) => {
        const result = await MusicoService.create(formData);
        
        if (result instanceof Error) {
            console.log(result.message);
        } else {
          alert('Músico criado com sucesso!');
          listar();
          handleClose();
        }
      };
      

    return (
        <Box
            sx={{
                m: 1,
                width: "auto",
                height: '30px',
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

        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
            Adicionar Músico                 
        </Button>
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
        </Box>
            <CadastrarMusico open={open} onClose={handleClose} title="Novo Músico" onSubmit={handleSubmit} />
        </Box>
    );
};
