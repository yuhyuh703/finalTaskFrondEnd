import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for interactivity
import { Training } from '../types'; // adjust path if needed
import dayjs from 'dayjs';

const CalendarPage = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

  // Transform trainings into calendar events
    const events = trainings.map(training => {
    const start = dayjs(training.date);
    const end = start.add(Number(training.duration), 'minute');

    return {
      title: `${training.activity} / ${training.customer.firstname}`,
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });

  return (
    <div style={{ padding: '20px' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        height="auto"
      />
    </div>
  );
};

export default CalendarPage;
