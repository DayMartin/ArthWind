export interface Event {
    id: string;
    title: string;
    date: string;
  }
  
export interface NextEventsProps {
    events: Event[];
  }
  
export interface Activity {
    id: string;
    title: string;
    date: string;
  }

export interface CustomCalendarProps {
    activities: Activity[];
  }