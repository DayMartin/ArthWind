import React, { useState } from 'react';
import { Box, Typography, List, ListItemText } from '@mui/material';
import { ViewEvento } from '@/shared/components/view_detalhe_evento/view_evento';
import { Activity, Event, NextEventsProps} from '@/shared/interfaces/EventoInterface';

export const NextEvento: React.FC<NextEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);

  const nextEvents = events.slice(0, 2);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ width: '100%', marginRight: '5%', marginTop: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" color="primary" gutterBottom>
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
              '&:hover': {
                backgroundColor: 'grey.300',
              },
              color: 'black',
              backgroundColor: 'white',
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <Box sx={{ display: 'flex', marginRight: 2 }}>
              <img
                src="https://i.ibb.co/0fcwMMM/pessoa1.jpg"
                alt="Músico 1"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%', 
                  objectFit: 'cover',  
                  marginRight: 5, 
                }}
              />
              <img
                src="https://i.ibb.co/MN1qC3g/pessoa2.jpg"
                alt="Músico 2"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',  
                  marginRight: 5,
                }}
              />
              <img
                src="https://i.ibb.co/PzjRs20/pessoa3.webp"
                alt="Músico 3"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  marginRight: 5,
                }}
              />
            </Box>
            <ListItemText primary={event.title} secondary={event.date} />
          </Box>
        ))}
      </List>
      <ViewEvento activity={selectedEvent} onClose={handleCloseModal} /> 
    </Box>
  );
};
