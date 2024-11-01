import * as React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";

const Musicos = () => {
  
  const musicians = [
    { id: 1, name: "Músico 1", instrument: "Violão", image: "https://i.ibb.co/0fcwMMM/pessoa1.jpg" },
    { id: 2, name: "Músico 2", instrument: "Bateria", image: "https://i.ibb.co/MN1qC3g/pessoa2.jpg" },
    { id: 3, name: "Músico 3", instrument: "Guitarra", image: "https://i.ibb.co/PzjRs20/pessoa3.webp" },
  ];

  const handleAddMusician = () => {
    console.log("Adicionar músico");
  };

  const handleViewMusician = (id: number) => {
    console.log("Visualizar músico com ID:", id);
  };

  const handleEditMusician = (id: number) => {
    console.log("Editar músico com ID:", id);
  };

  const handleDeleteMusician = (id: number) => {
    console.log("Excluir músico com ID:", id);
  };

  return (
    <Box>
      <BarraInicialHome />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Músicos
        </Typography>
        <Button variant="contained" onClick={handleAddMusician} sx={{ mb: 2 }}>
          Adicionar Músico
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Foto</TableCell>
                <TableCell>Músico</TableCell>
                <TableCell>Instrumento</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musicians.map((musician) => (
                <TableRow key={musician.id}>
                  <TableCell>
                    <img
                      src={musician.image}
                      alt={musician.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        objectFit: 'cover', 
                        backgroundColor: 'blue'
                      }}
                    />
                  </TableCell>
                  <TableCell>{musician.name}</TableCell>
                  <TableCell>{musician.instrument}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewMusician(musician.id)}
                      sx={{ mr: 1 }}
                    >
                      Visualizar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditMusician(musician.id)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteMusician(musician.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Musicos;
