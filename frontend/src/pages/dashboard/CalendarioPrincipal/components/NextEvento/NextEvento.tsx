import React, { useState } from 'react';
import { Box, Typography, List, ListItemText } from '@mui/material';
import { ViewEvento } from '@/shared/components/view_detalhe_evento/view_evento';
import { EventDetalhe, NextEventsProps } from '@/shared/interfaces/EventoInterface';

export const NextEvento: React.FC<NextEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetalhe | null>(null);
  
  const sortedEvents = [...events].sort((a, b) => new Date(b.data_de).getTime() - new Date(a.data_de).getTime());
  
  const nextEvents = sortedEvents.slice(0, 6);

  const handleEventClick = (event: EventDetalhe) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('pt-BR');
  };

  return (
    <Box sx={{ width: '100%', marginRight: '5%', marginTop: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" color="#ff7f50" gutterBottom>
        Próximos Eventos
      </Typography>
      <List sx={{ width: '100%' }}>
        {nextEvents.map(event => (
          <Box 
            key={event.id} 
            onClick={() => handleEventClick(event)}
            sx={{
              cursor: 'pointer',
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #E0E0E0',
              marginTop: '2px',
              '&:hover': {
                backgroundColor: 'grey.300',
              },
              color: 'black',
              backgroundColor: 'white',
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <ListItemText 
              primary={event.descricao} 
              secondary={`${formatDate(event.data_de)} - ${formatDate(event.data_ate)}`} 
            />
          </Box>
        ))}
      </List>
      <ViewEvento activity={selectedEvent} onClose={handleCloseModal} extras={null} /> 
    </Box>
  );
};
