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
import DeleteIcon from '@mui/icons-material/Delete';

import { InstrumentoDetalhe } from "@/shared/interfaces/InstrumentoInterface";
import { InstrumentoService } from "@/shared/services/api/InstrumentoService";
import { BarraInstrumentos } from "./BarraInstrumento"; 
import InstrumentoDetalhesDialog from "./VisualizarEditarInstrumento";
import { Environment } from "@/shared/environment";

const InstrumentosListagem = () => {

  const [rows, setRows] = useState<InstrumentoDetalhe[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [filterId, setFilterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedInstrumento, setSelectedInstrumento] = useState<InstrumentoDetalhe | null>(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const limit = Environment.LIMITE_DE_LINHAS

  const listarInstrumentos = async () => {
      setIsLoading(true);
      try {
          const consulta = await InstrumentoService.findAllInstrumentos(page + 1, limit, filterId);
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
    listarInstrumentos();
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
        await listarInstrumentos();
    } catch (error) {
        console.error('Erro ao listar', error)
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInstrumento(null);
    setIsEditing(false);
  };

  const handleSave = async (updatedInstrumento: InstrumentoDetalhe) => {
      try {
          await InstrumentoService.updateInstrumento(updatedInstrumento.id, updatedInstrumento);
          alert('Instrumento atualizado com sucesso');
          await listarInstrumentos();
      } catch (error) {
          alert('Erro ao atualizar Instrumento');
      }
  };

  const handleVisualizarInstrumento = (instrumento: InstrumentoDetalhe) => {
    setSelectedInstrumento(instrumento);
    setOpen(true);
    setIsEditing(false);
  };

  const handleEditarInstrumento = (instrumento: InstrumentoDetalhe) => {
    setSelectedInstrumento(instrumento);
    setOpen(true);
    setIsEditing(true);
  };

  const handleExcluirInstrumento = async(id: number) => {
    try {
      await InstrumentoService.deleteInstrumento(id)
      listarInstrumentos();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box>
      <Box sx={{ padding: 4, backgroundColor: '#e0e0e0', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
          Lista de Instrumentos
        </Typography>
        <BarraInstrumentos listar={listar} onFilterIdChange={handleFilterIdChange}/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor: '#f5f5f5'}}>
              <TableRow>
                <TableCell>Iniciais</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((instrumento) => (
                <TableRow key={instrumento.id}>
                <TableCell>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#3CB371',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}
                  >
                    {instrumento.name
                      .split(' ')
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                </TableCell>
                  <TableCell>{instrumento.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleVisualizarInstrumento(instrumento)}
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
                      onClick={() => handleEditarInstrumento(instrumento)}
                      sx={{
                        mr: 1,
                        backgroundColor: 'none', color: '#ffa500',
                        borderColor: '#ffa500'
                      }}
                    >
                    <EditIcon />
                    </Button>
                    <Button onClick={() => handleExcluirInstrumento(instrumento.id)}>
                      <DeleteIcon color="error" />
                    </Button>
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
      {selectedInstrumento && (
                <InstrumentoDetalhesDialog
                    open={open}
                    instrumento={selectedInstrumento}
                    isEditing={isEditing}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            )}
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default InstrumentosListagem;
