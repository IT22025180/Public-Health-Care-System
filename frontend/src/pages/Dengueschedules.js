import React from 'react'
import Layout from '../components/Layout'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


const Dengueschedules = () => {

  const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Dengue Prevention Program',
    start: new Date(2024, 5, 11, 10, 0),
    end: new Date(2024, 5, 11, 11, 0),
    allDay: false,
  },
  {
    title: 'Awareness Program',
    start: new Date(2024, 6, 11, 10, 0),
    end: new Date(2024, 6, 11, 11, 0),
    allDay: false,
  },
];

  return (
    <Layout>
      <div>Dengueschedules</div>
      <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ margin: '50px auto' }}
    />
  </div>
    </Layout>
  )
}

export default Dengueschedules