<template>
  <div id="page">
    <FullCalendar
      id="calendar"
      :selectable="true"
      :locales="locales"
      :plugins="calendarPlugins"
      :buttonText="buttonText"
      :header="header"
      :events="events"
      :height="height"
      @eventClick="eventClick"
      @dateClick="handleSelect"
    />
    <modals-container />
    <div id="result">
      <div v-if="logedin">
        <table>
          <tr v-for="item in calendarInfo" :key="item.calendarId">
            <td>{{ item.calendarId }}</td>
            <td>{{ item.calendarName }}</td>
            <td>
              <input type="checkbox" @click="calendarSelector(item.calendarId)" :checked="item.calendarIs" />
            </td>
          </tr>
        </table>
        <div v-if="isCheckedCalendar">
          <button type="button" class="btn btn-primary auth-btn" @click="getEventCalendar">Obtenir</button>
        </div>
      </div>
      <div v-else>
        <button type="button" id="btn" class="btn btn-primary auth-btn" @click="handleAuthClick">
          Synchroniser Google calendar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import axios from "axios";
import EventDetails from './EventDetails'
import DateDetails from './DateDetails'

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const scope = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  name: "oauth",
  data() {
    return {
      logedin: false,
      gapi: null,
      GoogleAuth: null,
      selectedCalendar: null,
      events: [],
      data: [],
      height: 650,
      calendarInfo: [],
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locales: [frLocale],
      buttonText: {
        today: "Aujourd'hui",
        month: "Mois",
        week: "Semaine",
      },
      header: {
        left: "prev,next, today",
        center: "title",
        right: "dayGridMonth, timeGridWeek",
      },
    };
  },
  components: {
    FullCalendar,
  },
  computed: {
    isCheckedCalendar() {
      return this.selectedCalendar !== null;
    },
  },
  created() {
    import("google-client-api")
      .then((googleApi) => googleApi.default())
      .then((googleApi) => {
        this.gapi = googleApi;
        this.gapi.load("client:auth2", this.initClient);
      });
  },
  methods: {
    eventClick(info){
      this.$modal.show(EventDetails, {
        event: info.event
      })
    },
    handleSelect(info) {
        this.$modal.show(DateDetails, {
        event: info
      })
    },
    handleAuthClick() {
      this.GoogleAuth.signIn();
    },
    initClient() {
      this.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope,
        })
        .then(() => {
          this.GoogleAuth = this.gapi.auth2.getAuthInstance();
          this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(this.GoogleAuth.isSignedIn.get());
        });
    },
    calendarSelector(calendarId) {
      this.selectedCalendar = null;
      this.calendarInfo.map((cal) => (cal.calendarIs = false));

      const calendarFound = this.calendarInfo.find((cal) => cal.calendarId === calendarId);
      if (typeof calendarFound !== "undefined") {
        calendarFound.calendarIs = true;
        this.selectedCalendar = calendarFound;
      }
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        const isAuthorized = this.GoogleAuth.currentUser.get().hasGrantedScopes(scope);

        this.logedin = isAuthorized;
        if (isAuthorized) {
          this.getCalendarList();
        }
      }
    },
    getCalendarList() {
      const request = this.gapi.client.calendar.calendarList.list();
      request.execute((resp) => {
        resp.items.map((item) => {
          this.calendarInfo.push({
            calendarId: item.id,
            calendarName: item.summary,
            calendarIs: false,
          });
        });
      });
    },
    async getEventCalendar() {
      this.events = [];
      const response = await this.gapi.client.calendar.events.list({
        calendarId: this.selectedCalendar.calendarId,
      });
      response.result.items.map((event) => {
        this.events.push({
          id: event.id,
          start: this.getEventDate(event, "start"),
          end: this.getEventDate(event, "end"),
          title: event.summary,
          updated: event.updated,
          status: 0,
          calendarId: event.updated,
        });
      });
     // this.saveCalendarId(this.selectedCalendar.calendarId).then(() => this.addEventApi(this.events));
    },
    getEventDate(event, name) {
      if (event.hasOwnProperty(name)) {
        if (event[name].hasOwnProperty("date")) {
          return event[name].date;
        }

        if (event[name].hasOwnProperty("dateTime")) {
          return event[name].dateTime;
        }
      }
    },
    // addEventApi(events) {
    //   axios.put("http://127.0.0.1:7000/bookings/calendar", events).then((response) => {
    //     console.log(response, events);
    //   });
    // },
    // async saveCalendarId(calendarId) {
    //   return await axios.put("http://127.0.0.1:7000/studios/98d14153-843f-4f0e-8a93-4f2ea921f5d8", {
    //     name: calendarId,
    //   });
    // },
  },
};
</script>

<style type="text/css">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
#result {
  text-align: center;
}
#calendar {
  text-align: center;
  width: 70%;
  height: 5%;
  margin-left: auto;
  margin-right: auto;
}
</style>
