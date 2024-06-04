<script lang="ts">
  import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
  import interactionPlugin from '@fullcalendar/interaction'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import { holidays } from '../../stores/holidays'
  import { tasks } from '../../stores/tasks'
  import type { Holiday, Task } from '../../ts/interfaces';
  

  const currentHolidays = $holidays.map((holiday: Holiday) => ({
      title: holiday.name,
      start: holiday.date,
      allDay: true,
      color: 'red'
    }));


  let currentTasks = $tasks.map((task: Task) => ({
    title: task.name,
    start: task.startDate + 'T' + task.startTime,
    end: task.endDate + 'T' + task.endTime,
    color: 'blue'
  }));

  let options: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      ...currentHolidays,
      ...currentTasks
      
    ],

    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'lowercase'
    },
  };

</script>

<main class="p-8 bg-gray-100 min-h-screen">
  <FullCalendar {options} />
</main>
