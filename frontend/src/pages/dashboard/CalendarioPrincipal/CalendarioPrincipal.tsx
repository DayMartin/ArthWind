import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Button, Typography } from '@mui/material';
import { ViewEvento } from '@/shared/components/view_detalhe_evento/view_evento';
import { NextEvento } from './components/NextEvento/NextEvento';
import './CustomCalendar.module.css';
import { CustomCalendarProps, EventCreate, EventDetalhe } from '@/shared/interfaces/EventoInterface';
import { BarraInicialHome } from '@/shared/components/barra-inicial/BarraInicialHome';
import { EventoService } from '@/shared/services/api/EventoService';
import NovoEvento from './components/NovoEvento';
import { EventoMusicoCreate } from '@/shared/interfaces/EventoMusico';
import { EventoMusico } from '@/shared/services/api/EventoMusicoService';
import { MusicoInstrumentoCompleto, MusicoInstrumentoCreate } from '@/shared/interfaces/MusicoInstrumentoInterface';
import { MusicoInstrumento } from '@/shared/services/api/MusicoInstrumento';

const CalenarioPrincipal: React.FC<CustomCalendarProps> = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetalhe | null>(null);
  const [activities, setActivities] = useState<EventDetalhe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const userRole = JSON.parse(localStorage.getItem('APP_ACCESS_USER_TYPE') || '""');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const consultarEventos = async () => {
    setIsLoading(true);
    try {
      const eventos = await EventoService.findListEvento();
      if (eventos instanceof Error) {
        setActivities([]);
      } else {
        const musicoId = localStorage.getItem('APP_ACCESS_USER_ID');        
        if (userRole != 'admin') {
          const eventosFiltrados = await Promise.all(
            eventos.map(async (evento) => {
              try {
                const buscarIConjunto = await EventoMusico.findEventoById(evento.id);
  
                if (buscarIConjunto && Array.isArray(buscarIConjunto)) {
                  const extraEventoDataPromises = buscarIConjunto.map(async (eventoMusico: any) => {
                    const conjuntoId = eventoMusico.conjunto?.id;
                    if (conjuntoId) {
                      const data = await consultarDadosExtras(conjuntoId);
                      return data;
                    } else {
                      return null;
                    }
                  });
    
                  const extraEventosData = await Promise.all(extraEventoDataPromises);
                  const dadosValidos = extraEventosData.filter(
                    (data) => data && !(data instanceof Error)
                  ) as MusicoInstrumentoCompleto[];
    
                  const musicoEncontrado = dadosValidos.some(
                    (dados) => dados && String(dados.musico?.id) === musicoId
                  );
                  return musicoEncontrado ? evento : null;
                }
    
                return null;
              } catch (error) {
                console.error(`Erro ao buscar dados para o evento ${evento.id}:`, error);
                return null;
              }
            })
          );
          setActivities(eventosFiltrados.filter((evento) => evento !== null));
        } else {
          setActivities(eventos);
        }
      }
    } catch (error) {
      console.error('Erro ao consultar eventos:', error);
      setActivities([]);
    }
    setIsLoading(false);
  };
  
  const createEventoMusico = async (dados: EventoMusicoCreate) => {
    const resultEventoMusico = await EventoMusico.create(dados)

    if (resultEventoMusico instanceof Error) {
      return resultEventoMusico.message;
    } else {
      return resultEventoMusico
    }
  };

  const handleSubmit = async (formData: EventCreate) => {
    const result = await EventoService.create(formData);
    if (result instanceof Error) {
      console.log(result.message);
    } else {
      alert('Evento criado com sucesso!');
      if (formData.musicos && formData.musicos.length > 0) {
        const idEvento = result.id;
        for (const musico of formData.musicos) {

          const EventoMusico: EventoMusicoCreate = {
            conjuntoid: musico.instrumento,
            eventoId: idEvento
          };
          const eventoMusicoResult = await createEventoMusico(EventoMusico);
          if (eventoMusicoResult instanceof Error) {
            console.log("Erro ao criar EventoMusico:", eventoMusicoResult.message);
          }
        }
        consultarEventos();
        handleClose();
      }
    }
  };

  const eventsCalendario = activities.map(activity => {
    const isMultiDay = new Date(activity.data_de) < new Date(activity.data_ate);
  
    return {
      id: String(activity.id),
      title: activity.descricao,
      start: `${activity.data_de}T${activity.hora_de}`,
      end: `${activity.data_ate}T${activity.hora_ate}`,
      status: activity.status,
      backgroundColor: isMultiDay ? "#489af1" : "#4caf50",
    };
  });
  

  const events = activities.map(activity => ({
    id: activity.id,
    descricao: activity.descricao,
    data_de: `${activity.data_de}T${activity.hora_de}`,
    data_ate: `${activity.data_ate}T${activity.hora_ate}`,
    hora_de: activity.hora_de,
    hora_ate: activity.hora_ate,
    status: activity.status,
    valor_total: activity.valor_total,
    musicos: activity.musicos,
  }));

  const handleEventClick = async (info: any) => {
    const clickedEvent = activities.find(event => String(event.id) === String(info.event.id));
  
    if (clickedEvent) {
      const musicos = clickedEvent.musicos || [];
      const musicoID = clickedEvent.id;
      try {
        const buscarIConjunto = await EventoMusico.findEventoById(musicoID);
  
        if (buscarIConjunto && Array.isArray(buscarIConjunto)) {
          const extraEventoDataPromises = buscarIConjunto.map(async (eventoMusico: any) => {
            const conjuntoId = eventoMusico.conjunto?.id;
            if (conjuntoId) {
              const data = await consultarDadosExtras(conjuntoId);
              return data;
            } else {
              return null;
            }
          });
  
          const extraEventosData = await Promise.all(extraEventoDataPromises);
          const dadosValidos = extraEventosData.filter(data => !(data instanceof Error));
  
          if (dadosValidos.length > 0) {
            const novosMusicos = dadosValidos.map((dados: any) => ({
              id: dados.id,
              musico: {
                id: dados.musico.id,
                fullName: dados.musico.fullName,
                email: dados.musico.email,
                valorEvento: dados.musico.valorEvento
              },
              instrumento: {
                id: dados.instrumento.id,
                name: dados.instrumento.name
              }
            }));
  
            setSelectedEvent({
              ...clickedEvent,
              musicos: [
                ...musicos,
                ...novosMusicos
              ]
            });
          } else {
            setSelectedEvent({
              ...clickedEvent,
              musicos: musicos
            });
          }
  
        } else {
          console.log('buscarIConjunto está vazio ou não é um array');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do evento:', error);
        setSelectedEvent({
          ...clickedEvent,
          musicos: musicos
        });
      }
    } else {
      console.log('Evento não encontrado');
    }
  };
  
  const consultarDadosExtras = async (idConjunto: number): Promise<MusicoInstrumentoCompleto | Error> => {
    setIsLoading(true);
    try {
      const consulta = await MusicoInstrumento.findInstrumentosById(idConjunto);
      setIsLoading(false);  
      if (consulta instanceof Error) {
        console.log("Erro ao obter dados extras:", consulta.message);
        return consulta;
      } else {
        // setDadosExtras(consulta)
        return consulta
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao consultar dados extras:", error);
      return new Error("Erro ao consultar dados extras");
    }
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
    consultarEventos()
  };

  useEffect(() => {
    consultarEventos();
  }, []);

  return (
    <Box>
      <BarraInicialHome />
      <Box sx={{ display: 'flex', backgroundColor: "#efefef" }}>
        <Box sx={{ width: '60%', marginLeft: '5%', marginTop: '2%' }}>
          <Typography variant="h6" sx={{ color: 'black' }} gutterBottom>
            Calendário para sua Banda
          </Typography>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventsCalendario}
            eventColor="#489af1"
            eventClick={handleEventClick}
            height="550px"
            eventContent={(eventInfo) => (
              <Typography sx={{ color: 'black' }}>
                {eventInfo.event.title}
              </Typography>
            )}
          />
          <ViewEvento activity={selectedEvent}  onClose={handleCloseModal} />
        </Box>

        <Box sx={{ width: '30%', marginLeft: '2%', marginTop: '2%', display: 'flex', flexDirection: 'column' }}>
        {userRole === 'admin' && (
            <Button
              variant="outlined"
              sx={{ marginBottom: '1rem', border: 1, color: '#489af1' }}
              onClick={handleOpen}
            >
              Criar Novo Evento
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }}>
            <NextEvento events={events} />
          </Box>
        </Box>
      </Box>
      <NovoEvento open={open} onClose={handleClose} title="Novo Evento" onSubmit={handleSubmit} />

    </Box>
  );
};

export default CalenarioPrincipal;
