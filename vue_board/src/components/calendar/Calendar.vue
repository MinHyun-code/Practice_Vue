<template>
	<div class="container-fluid">

		<h1 class="h3 mb-2 text-gray-800">캘린더</h1>
		<p class="mb-4">일정 > 캘린더</p>

		<div class="card shadow mb-4" style="padding: 50px;">
            <FullCalendar :options='calendarOptions' />
		</div>

        <button @click="getPlanList()"> 123 </button>
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
            initialEvents: this.planList,
            // initialEvents: [  {
            //                         title: 'All-day event',
            //                         start: '2023-02-01',
            //                         end: '2023-02-05'
            //                     }], 
            headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            initialView: "dayGridMonth",
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            /* you can update a remote database when these fire:
            eventAdd:
            eventChange:
            eventRemove:
            */
        },
    };
  },
  methods: {
    getPlanList() {
        const form = new FormData();
        this.$axios.post("/api/plan", form)
        .then((res)=>{
            this.planList = res.data;
            console.log(this.planList );
        })
	},
  },
  mounted() {
    this.getPlanList();
  }
}
</script>

<style scoped>
    table th {
        width: 150px;
    }
    
</style>