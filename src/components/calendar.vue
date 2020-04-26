<template>
  <div class="">
    <div id="calendar"></div>
  </div>
</template>

<script>
  import { Calendar } from '@fullcalendar/core';
  import googleCalendarPlugin from '@fullcalendar/google-calendar';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import '@fullcalendar/core/main.css';
  import '@fullcalendar/daygrid/main.css';
  import '@fullcalendar/timegrid/main.css';
  import '@fullcalendar/list/main.css';

  // document.addEventListener('DOMContentLoaded', function() {
  //   var calendarEl = document.getElementById('calendar');

  //   var calendar = new Calendar(calendarEl, {
  //     plugins: [timeGridPlugin, dayGridPlugin, googleCalendarPlugin],
  //     googleCalendarApiKey: 'AIzaSyAZIUrOj-ZmP9SiIw3ylXDUOeQ0m6A1ark',
  //     events: {
  //       googleCalendarId: 'relhanti@gmail.com',
  //     },
  //     locale: 'fr',
  //     firstDay: 1,
  //     header: {
  //       left: 'prev,next, today',
  //       center: 'title',
  //       right: 'dayGridMonth, timeGridWeek'
  //     },
  //     buttonText: {
  //       today: 'Aujourd\'hui',
  //       month: 'Mois',
  //       week: 'Semaine'
  //     }
  //   });

  //   calendar.render();
  // });
  export default {
    name : 'calendar',
    data() {
      return {
      }
    }
  }

</script>

<style type="text/css">
#calendar {
   width: 50%;
   margin:auto;
}
</style>