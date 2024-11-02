import * as React from "react";
import { useState, useEffect } from 'react';
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
  TablePagination,
  LinearProgress,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DeleteIcon from '@mui/icons-material/Delete';

import { ApiResponseMusico, MusicoDetalhe } from "@/shared/interfaces/MusicoInterface";
import { MusicoService } from "@/shared/services/api/MusicoService";
import { BarraMusicos } from "./BarraMusicos";

const MusicosListagem = () => {

  const [rows, setRows] = useState<MusicoDetalhe[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [filterId, setFilterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const listarMusicos = async () => {
      setIsLoading(true);
      try {
          const consulta = await MusicoService.findAll(page + 1, filterId);
          if (consulta instanceof Error) {
              setRows([]);
              setTotalRecords(0);
          } else {
              setRows(consulta.rows);
              setTotalRecords(consulta.total);
          }
      } catch (error) {
          setRows([]);
          setTotalRecords(0);
      }
      setIsLoading(false);
  };

  useEffect(() => {
    listarMusicos();
  }, [page, filterId]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleFilterIdChange = (id: string) => {
      setFilterId(id);
      setPage(0);
  };

  const listar = async() => {
    try {
        await listarMusicos();
    } catch (error) {
        console.error('Erro ao listar', error)
    }
}

  const handleViewMusico = (id: number) => {
    console.log("Visualizar músico com ID:", id);
  };

  const handleEditMusico = (id: number) => {
    console.log("Editar músico com ID:", id);
  };

  const handleDeleteMusico = (id: number) => {
    console.log("Excluir músico com ID:", id);
  };

  return (
    <Box>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Músicos
        </Typography>
        <BarraMusicos listar={listar}/>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Iniciais</TableCell>
                <TableCell>Músico</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valor/Hora</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((musicos) => (
                <TableRow key={musicos.id}>
                  <TableCell>
                    <img
                      src={musicos.fullName}
                      alt={musicos.fullName}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        objectFit: 'cover', 
                        backgroundColor: 'blue'
                      }}
                    />
                  </TableCell>
                  <TableCell>{musicos.fullName}</TableCell>
                  <TableCell>
                      {musicos.status === 'Ativo' ? (
                          <CheckCircleIcon color="success" />
                      ) : (
                          <DoDisturbOnIcon color="error" />
                      )}
                  </TableCell>
                  <TableCell>{musicos.valorEvento}</TableCell>
                  <TableCell>{musicos.type}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewMusico(musicos.id)}
                      sx={{ mr: 1 }}
                    >
                    <VisibilityIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditMusico(musicos.id)}
                      sx={{ mr: 1 }}
                    >
                    <EditIcon />
                    </Button>
                    {musicos.status === 'Ativo' ? (
                          <Button onClick={() => handleDeleteMusico(musicos.id)}>
                              <DeleteIcon color="error" />
                          </Button>
                      ) : (
                          <Button onClick={() => handleDeleteMusico(musicos.id)}>
                              <CheckCircleIcon color="success" />
                          </Button>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          />
      </Box>
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default MusicosListagem;
