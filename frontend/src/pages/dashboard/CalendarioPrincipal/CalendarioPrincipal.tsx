import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Button, Typography } from '@mui/material';
import { ViewEvento } from '@/shared/components/view_detalhe_evento/view_evento';
import { NextEvento } from './components/NextEvento/NextEvento';
import './CustomCalendar.module.css';
import { Activity, CustomCalendarProps } from '@/shared/interfaces/EventoInterface';


const CalenarioPrincipal: React.FC<CustomCalendarProps> = ({ activities }) => {
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);

  const events = activities.map(activity => ({
    id: activity.id.toString(),
    title: activity.title,
    date: activity.date,
  }));

  const handleEventClick = (info: any) => {
    const clickedEvent = events.find(event => event.id === info.event.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleAddNewEvent = () => {
    console.log("Adicionar novo evento");
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#efefef" }}>
      <Box sx={{ width: '60%', marginLeft: '5%', marginTop: '2%' }}>
        <Typography variant="h6" sx={{ color: 'black' }} gutterBottom>
          Calendário Personalizado
        </Typography>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventColor="#489af1" 
          eventClick={handleEventClick}
          height="550px"
          eventContent={(eventInfo) => (
            <Typography sx={{ color: 'white' }}>
              {eventInfo.event.title}
            </Typography>
          )}
        />
        <ViewEvento activity={selectedEvent} onClose={handleCloseModal} />
      </Box>
      
      <Box sx={{ width: '30%', marginLeft: '2%', marginTop: '2%', display: 'flex', flexDirection: 'column' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddNewEvent}
          sx={{ alignSelf: 'center', marginBottom: '1rem' }}
        >
          Adicionar Novo Evento
        </Button>

        <Box sx={{ flexGrow: 1 }}>
          <NextEvento events={events} />
        </Box>
      </Box>
    </Box>
  );
};

export default CalenarioPrincipal;
