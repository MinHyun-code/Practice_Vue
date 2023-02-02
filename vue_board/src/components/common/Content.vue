<template>
  <div class="content" ref="refContent">
    <header class="modal_header" @dblclick="HeaderClick()">
      <span class="modal_title">{{ this.$store.state.modal_title }}</span>
      <div class="close_btn" id="close_btn" @click="modalFalse()">x</div>
    </header>
    <div v-if="this.$store.state.modalBoardDetail_tf" class="titleContent">
      <div>
        <br/>
        <span style="font-size: 25px; font-weight: bold; margin: 2%;">{{ this.$store.state.boardTitle}}</span>
        <hr style="border: dot 1px #0000002e; margin-left: 2%; margin-right: 2%;">
        <Markdown
          :source="boardContent"
          style="
            width: 96%;
            float: right;
            overflow: auto;
            height: 50vh;
            margin: 2%;
          "
        />
      </div>
    </div>

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
          style="width: 47%;
            float: right;
            overflow: auto;
            height: 50vh;
            margin: 2%;
          "
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
      this.$store.commit('setBoardData', '');
    },

    // 게시글 저장
    boardInsert() {
      const form = new FormData();
      form.append("board_title", this.boardTitle);
      form.append("board_content", this.boardContent);
      form.append("reg_id", "a");
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
</style>
