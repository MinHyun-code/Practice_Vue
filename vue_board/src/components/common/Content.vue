<template>
  <div class="content" ref="refContent">
    <header class="modal_header" @dblclick="HeaderClick()">
      <span class="modal_title">{{ this.$store.state.modal_title }}</span>
      <div class="close_btn" id="close_btn" @click="modalFalse()">x</div>
    </header>

    <!-- 게시판 상세 모달 -->
    <div v-if="this.$store.state.modalBoardDetail_tf" class="titleContent">
      <div>
        <br/>
        <span style="font-size: 25px; font-weight: bold; margin: 2%;">{{ this.$store.state.boardTitle}}</span>
        <hr style="border: dot 1px #0000002e; margin-left: 2%; margin-right: 2%;">
        <Markdown
          :source="boardContent"
          style="width: 96%; float: right; overflow: auto; height: 50vh; margin: 2%;"
        />
      </div>
    </div>

    <!-- 게시판 등록 모달 -->
    <div v-if="this.$store.state.modalBoardInsert_tf">
      <div style="width: 98%; margin: 2%">
      <input type="text" :value="boardTitle" @input="titleChange($event)" style="width: 47%; height: 45px; font-size: 20px"/>

        <Hashtags style="margin-bottom;: 2%"/>
        
        <textarea
          :value="boardContent"
          @input="textChange($event)"
          style="width: 47%; display: flex; min-height: 50vh; float: left"
        ></textarea>
        <Markdown
          :source="boardContent"
          style="width: 47%; float: right; overflow: auto; height: 50vh; margin: 2%;"
        />
      </div>
      <a
      class="btn btn-sm btn-outline-secondary"
      type="submit"
      v-on:click="boardInsert()"
      style="margin: 20px;"
      >등록</a
    >
    </div>

    <!-- 일정 상세 모달 -->
    <div v-if="this.$store.state.modalCalendarDetail_tf">
      <div style="width: 98%; margin: 2%; color:black;">
        <div>
          <p style="font-size: 25px; font-weight: bold; margin: 2%;">{{this.$store.state.plan_title}}</p>
          <div style="margin: 2%;">
            <span>시작일 : {{this.$store.state.start}}</span>
            <br/>
            <span>종료일 : {{this.$store.state.end}}</span>
            <br/>
            <span>사유 : {{this.$store.state.plan_content}}</span>
          </div>
        </div>
      </div>
      <a
      class="btn btn-sm btn-outline-secondary"
      type="submit"
      v-on:click="boardInsert()"
      style="margin: 20px;"
      >수정</a
    >
    <a
      class="btn btn-sm btn-outline-secondary"
      type="submit"
      v-on:click="planDelete()"
      style="margin: 20px;"
      >삭제</a
    >
    </div>

    <!-- 일정 등록 모달 -->
    <div v-if="this.$store.state.modalCalendarInsert_tf">
      <div style="width: 98%; margin: 2%; color:black;">
        <div>
          <p style="font-size: 25px; font-weight: bold; margin: 2%;">{{this.$store.state.plan_title}}</p>
          <div style="margin: 2%;">
            <table class="plan_tb">
              <tr>
                <th>분류 : </th>
                <td>
                  <select v-model="planType">
                    <option value="" selected>선택</option>
                    <option value="1">휴가</option>
                    <option value="2">외근</option>
                    <option value="3">기타</option>
                  </select>
                </td>
                <td rowspan="5"><img src="../../assets/images/vacation.png"/></td>
              </tr>
              <tr>
                <th>제목 : </th>
                <td><input type="text" v-model="planTitle"/></td>
              </tr>
              <tr>
                <th>시작일 : </th>
                <td><datepicker format="yyyy-MM-dd HH:mm:ss" v-model="planStart"></datepicker></td>
              </tr>
              <tr>
                <th>종료일 : </th>
                <td><datepicker format="yyyy-MM-dd HH:mm:ss" v-model="planEnd"></datepicker></td>
              </tr>
              <tr>
                <th>사유 : </th>
                <td><input type="text" v-model="planContent"/></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <a
      class="btn btn-sm btn-outline-secondary"
      type="submit"
      v-on:click="planInsert()"
      style="margin: 20px;"
      >등록</a
    >
    </div>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
import Hashtags from "@/components/hashtags/Hashtags";
import MarkdownItStrikethroughAlt from "markdown-it-strikethrough-alt";

export default {
  name: "Content",
  components: {
    Markdown,
    Hashtags
  },
  computed: {
    storeBoardContent: function() {
      return this.$store.state.boardContent;
    },
  },
  data() {
    return {
      boardTitle: "",
      boardContent: "",
      planStart: "",
      planEnd: "",
      planTitle:"",
      planContent:"",
      planType: "",
      plugins: [
        {
          plugin: MarkdownItStrikethroughAlt,
        },
      ],
    };
  },
  methods: {
    titleChange(event) {
      this.boardTitle = event.target.value;
    },
    
    textChange(event) {
      this.boardContent = event.target.value;
    },

    // 모달창 닫기
    modalFalse() {
      this.$store.commit('modalBoardDetail_TF', false); 
      this.$store.commit('modalBoardInsert_TF', false); 
      this.$store.commit('modalCalendarDetail_TF', false); 
      this.$store.commit('modalCalendarInsert_TF', false); 
      this.$store.commit('setBoardData', '');
      this.$store.commit('setCalendarData', '');
    },

    // 게시글 저장
    boardInsert() {
      const form = new FormData();
      form.append("board_title", this.boardTitle);
      form.append("board_content", this.boardContent);
      form.append("reg_id", this.$store.state.user_id);
      this.$axios.post("/api/board/insert", form).then(() => {
        this.$store.commit("modalBoardDetail_TF", false);
        this.$store.commit("modalBoardInsert_TF", false);
        this.$store.commit('setBoardListCall', "Y");
      });
    },

    // 헤더 더블 클릭
    HeaderClick() {
        this.boardContent = this.$store.state.boardContent;
        this.$store.commit("modalFull");
    },

    // 일정 삭제
    planDelete() {
      const form = new FormData();
      form.append("seq", this.$store.state.seq);
      this.$axios.post("api/plan/delete", form).then(() => {
        this.modalFalse();
        this.$store.commit('setPlanListCall', "Y");
      })
    },
    // 일정 등록
    planInsert() {
      const form = new FormData();
      form.append("planTitle", this.planTitle);
      form.append("planContent", this.planContent);
      form.append("planType", this.planType);
      form.append("planStart", this.dateFormat(this.planStart));
      form.append("planEnd",  this.dateFormat(this.planEnd));
      form.append("regUserId", this.$store.state.user_id);
      this.$axios.post("api/plan/insert", form).then(() => {
        this.modalFalse();
        this.$store.commit('setPlanListCall', "Y");
      })
    },

    // 날짜 FORMAT 변경
    dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
  },
  mounted(){
        this.boardContent = this.$store.state.boardContent;
  },
  watch: {    
    storeBoardContent(){
      this.boardContent = this.$store.state.boardContent;
    }
  }
};
</script>

<style scoped>

.titleContent {
  color: black;
}
.modal_header {
  padding: 20px;
  line-height: 27px;
  display: flex;
  justify-content: space-between;
  background-color: #5e658d;
  color: white;
}

.modal_title {
  font-size: 15px;
}

.close_btn {
  font-size: 20px;
  color: white;
  font-weight: 900;
  cursor: pointer;
}

.plan_tb {
  margin-top: 65px;
  height: 50vh;
}

.plan_tb th {
  width: 80px;
}

input {
  width: 380px;
  line-height: 30px;
}

select {
  width: 380px;
  height: 35px;
}

</style>
