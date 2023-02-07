<template>
	<div class="container-fluid">

		<h1 class="h3 mb-2 text-gray-800">캘린더</h1>
		<p class="mb-4">일정 > 캘린더</p>

		<div class="card shadow mb-4" style="padding: 50px;">
            <FullCalendar :options='calendarOptions' ref="fullCalendar" class="FullCalendar"/>
		</div>
	</div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
        planList: [],
        calendarOptions: {
            plugins: [
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin, // needed for dateClick
            ],
            events: [],
            headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            initialView: "dayGridMonth",            
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            slotMinTime: '08:00', // Day 캘린더에서 시작 시간
            slotMaxTime: '20:00', // Day 캘린더에서 종료 시간
            nowIndicator: true, // 현재 시간 마크
            navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
            expandRows: true, // 화면에 맞게 높이 재설정
            locale: 'ko', // 한국어 설정
            eventClick: this.handleEventClick,
            dateClick: this.handleDateClick,
            eventChange: this.planUpdate,
            customButtons: {
                      prev:  {click: this.handleEventPrev},
                      next:  {click: this.handleEventNext},
                      today: {text: 'Today', click: this.handleEventToday}
            },
        },
    };
  },
  methods: {
    getPlanList() {
      const form = new FormData();
      let calendarApi = this.$refs.fullCalendar.getApi();
      let year = calendarApi.getDate().getFullYear();
      let month = ""+(calendarApi.getDate().getMonth()+1);
      month = "00".substring(0, 2 - month.length) + month;
      form.append("year", year);
      form.append("month", month);
      form.append("regUserId", this.$store.state.user_id);
      this.$axios.post("/api/plan", form)
      .then((res)=>{
          this.calendarOptions.events = res.data;
      })
    },
    planUpdate:function(){

    },
    handleEventClick:function(obj){
      const form = new FormData();
      form.append("seq", obj.event._def.extendedProps.seq);
      this.$axios.post("/api/plan/detail", form)
      .then((res)=>{
        this.$store.commit('setCalendarData', res.data);
        this.$store.commit('modalCalendarDetail_TF', true);
      })
    },

    handleDateClick:function(){
      this.$store.commit('modalCalendarInsert_TF', true);
    },
    
    handleEventPrev: function(){
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.prev();
        this.getPlanList();
    },
    handleEventNext: function(){
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.next();
        this.getPlanList();
    },
    handleEventToday: function(){
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.today();
        this.getPlanList();
    },
  },
  mounted() {   
    this.getPlanList();
  },
  watch: {
			"$store.state.setPlanListCall": function() {
				if(this.$store.state.setPlanListCall == "Y"){
						this.getPlanList();
						this.$store.commit('setPlanListCall', "N");
				}
			}
		}
}
</script>

<style scoped>

  .FullCalendar {
    height: 100vh;
  }

</style>