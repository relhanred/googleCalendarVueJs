<template>
  <div id="page">
    <!-- <calendar></calendar> -->
    <FullCalendar 
      :locales="locales" 
      :plugins="calendarPlugins" 
      :buttonText="buttonText" 
      :header="header" 
      :events="events"
    >
    <div id="result">
      <div v-if="logedin" >
          <table>
            <tr v-for="item in calendarInfo" :key="item.index">
              <td>{{item.calendarId}}</td>
              <td>{{item.calendarName}}</td>
              <td><input type="checkbox" :id="item.calendarId" @click="listUpcomingEvents" v-model="item.calendarIs"></td>                                                            
            </tr>
          </table>
          <button type="button" id="btn" class="btn btn-primary auth-btn" @click="getUsers">Obtenir</button> 
          <button type="button" id="btn" class="btn btn-primary auth-btn" @click="addUsers">Ajouter</button> 
      </div>
      <div v-else>
        <button type="button" id="btn" class="btn btn-primary auth-btn" @click="handleAuthClick">Synchroniser Google calendar</button>
      </div>
    </div>
    <div v-for="e in events" :key="e.id">
       {{e}} 
    </div>
  </div>
</template>   

<script>
  //var CLIENT_ID = YOUR CLIENT ID
  //var API_KEY = YOUR API KEY
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import frLocale from '@fullcalendar/core/locales/fr';

  const axios = require('axios').default;

  export default {
    name : 'oauth',
    data() {
      return {
        SCOPES :  'https://www.googleapis.com/auth/calendar.readonly',
        DISCOVERY_DOCS : ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        logedin: false,
        gapi: null,
        GoogleAuth: null,
        events: [],
        data:[],
        newUser:"redha",
        idChosen : "",
        calendarInfo: [],
        calendarPlugins: [dayGridPlugin, timeGridPlugin],
        locales: [frLocale],
        buttonText: {
          today: 'Aujourd\'hui',
          month: 'Mois',
          week: 'Semaine'
        },
        header: {
          left: 'prev,next, today',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek'
        }
      }
    },
    components: {
      FullCalendar
    },
    created() {
      var self = this;
      import('google-client-api').then((googleApi)=>{
        return googleApi.default();
      }).then((googleApi)=>{
         self.gapi = googleApi;
         self.gapi.load('client:auth2', this.initClient);
      });
    },      
    methods: {
      handleAuthClick: function() {
        this.GoogleAuth.signIn();
      },
      initClient: function() {
        var self = this;
        self.gapi.client.init({
          apiKey:  API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: self.DISCOVERY_DOCS,
          scope: self.SCOPES
        }).then(function () {
          self.GoogleAuth = self.gapi.auth2.getAuthInstance();
          self.GoogleAuth.isSignedIn.listen(self.updateSigninStatus);
          self.updateSigninStatus(self.GoogleAuth.isSignedIn.get());
        });
      },
      updateSigninStatus: function(isSignedIn) {
        if (isSignedIn) {
          var user = this.GoogleAuth.currentUser.get();
          var isAuthorized = user.hasGrantedScopes(this.SCOPES);
          if (isAuthorized) {
            this.logedin = true;
            this.getCalendarList();
          }
        }
      },
      getCalendarList: function() {
        var self = this;
        var request = self.gapi.client.calendar.calendarList.list();
        request.execute(function(resp){
          var calendars = resp.items;
          for (let i = 0; i < calendars.length; i++) {
            let newCalendar = {
              calendarId: calendars[i].id,
              calendarName: calendars[i].summary,
              calendarIs: false
            }
            self.calendarInfo.push(newCalendar);
          }
        });
      },
      listUpcomingEvents: function(e) {
        var self = this;
        var target = e.target;
        var start;
        var end;
        self.onlyOneCheckbox(target.id);
        self.events.splice(0,self.events.length);
        if(!e.target.checked) {
          return;
        }
        self.gapi.client.calendar.events.list({
          'calendarId': target.id,
        }).then(function(response) {
          var events = response.result.items;
          if(events.length > 0) {
            for(let i = 0; i < events.length; i++) {
              if (events[i].hasOwnProperty('start')) {
                if(events[i].start.hasOwnProperty('date')){
                  start = events[i].start.date;
                }else if (events[i].start.hasOwnProperty('dateTime')) {
                  start = events[i].start.dateTime;
                }else {
                  start = events[i].start;
               }
              }  
              if (events[i].hasOwnProperty('end')) {
                if(events[i].end.hasOwnProperty('date')){
                  end = events[i].end.date;
                }else if (events[i].end.hasOwnProperty('dateTime')) {
                  end = events[i].end.dateTime;
                }else {
                  end = events[i].end;
               }
              }              
              let newEvent = {
                id: events[i].id,
                start: start,
                end: end,
                title: events[i].summary,
                // updated: events[i].updated
              };
              self.events.push(newEvent);
            }
          }
        });
      },
      onlyOneCheckbox : function(id) {
        for(let i = 0; i < this.calendarInfo.length; i++ ) {
            if (id != this.calendarInfo[i].calendarId) {
              this.calendarInfo[i].calendarIs = false;
            }
        }
      },
      getUsers: function() {
        var self = this;
        self.data = [];
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then( function (response) {
          console.log(response)
        });
      },
      addUsers: function() {
        var self = this;
        axios.post('https://jsonplaceholder.typicode.com/users', {
          name: self.newUser
        })
        .then( function (response) {
          console.log(response);
        });
      },
    }
  }
</script>

<style type="text/css">
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  #result {
      text-align:center;
  }
</style>