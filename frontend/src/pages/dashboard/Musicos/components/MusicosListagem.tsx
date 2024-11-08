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
import MusicoDetalhesDialog from "./VisualizarEditarMusico";
import { Environment } from "@/shared/environment";

const MusicosListagem = () => {

  const [rows, setRows] = useState<MusicoDetalhe[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [filterId, setFilterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedMusico, setSelectedMusico] = useState<MusicoDetalhe | null>(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const limit = Environment.LIMITE_DE_LINHAS

  const listarMusicos = async () => {
      setIsLoading(true);
      try {
          const consulta = await MusicoService.findAllMusicos(page + 1, limit, filterId);
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

  const handleFilterIdChange = (name: string) => {
      setFilterId(name);
      setPage(0);
  };

  const listar = async() => {
    try {
        await listarMusicos();
    } catch (error) {
        console.error('Erro ao listar', error)
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMusico(null);
    setIsEditing(false);
  };

  const handleSave = async (updatedMusico: MusicoDetalhe) => {
      try {
          await MusicoService.updateMusico(updatedMusico.id, updatedMusico);
          alert('Músico atualizado com sucesso');
          console.log('updatedMusico', updatedMusico)
          await listarMusicos();
      } catch (error) {
          alert('Erro ao atualizar Músico');
      }
  };

  const handleVisualizarMusico = (musico: MusicoDetalhe) => {
    setSelectedMusico(musico);
    setOpen(true);
    setIsEditing(false);
  };

  const handleEditarMusico = (musico: MusicoDetalhe) => {
    setSelectedMusico(musico);
    setOpen(true);
    setIsEditing(true);
  };

  const handleStatusMusico = async(id: number, status: string) => {
    try {
      await MusicoService.updateStatus(id, status);
      listarMusicos();
    } catch (error) {
      alert(error)
    }
  };


  return (
    <Box>
      <Box sx={{ padding: 4, backgroundColor: '#e0e0e0', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Lista de Músicos
        </Typography>
        <BarraMusicos listar={listar} onFilterIdChange={handleFilterIdChange}/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor: '#f5f5f5'}}>
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
              {rows.map((musico) => (
                <TableRow key={musico.id}>
                <TableCell>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#E9967A',
                      color: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}
                  >
                    {musico.fullName
                      .split(' ')
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                </TableCell>
                  <TableCell>{musico.fullName}</TableCell>
                  <TableCell>
                      {musico.status === 'Ativo' ? (
                          <CheckCircleIcon color="success" />
                      ) : (
                          <DoDisturbOnIcon color="error" />
                      )}
                  </TableCell>
                  <TableCell>{musico.valorEvento}</TableCell>
                  <TableCell>{musico.type}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleVisualizarMusico(musico)}
                      sx={{
                        mr: 1,
                        backgroundColor: 'none', color: '#ffa500',
                        borderColor: '#ffa500'
                      }}
                    >
                    <VisibilityIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditarMusico(musico)}
                      sx={{
                        mr: 1,
                        backgroundColor: 'none', color: '#ffa500',
                        borderColor: '#ffa500'
                      }}
                    >
                    <EditIcon />
                    </Button>
                    {musico.status === 'Ativo' ? (
                          <Button onClick={() => handleStatusMusico(musico.id, 'Inativo')}
                          sx={{ backgroundColor: '#ff4700', color: 'white'}}
                          >
                              Desativar
                          </Button>
                      ) : (
                          <Button onClick={() => handleStatusMusico(musico.id, 'Ativo')}>
                              Ativar
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
      {selectedMusico && (
                <MusicoDetalhesDialog
                    open={open}
                    musico={selectedMusico}
                    isEditing={isEditing}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            )}
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default MusicosListagem;
