<template>
  <div class="content" ref="refContent">
    <header class="modal_header" @dblclick="HeaderClick()">
      <span class="modal_title">{{ this.$store.state.modal_title }}</span>
      <div class="close_btn" id="close_btn" @click="modalFalse()">x</div>
    </header>
    <div v-if="this.$store.state.modalBoardDetail_tf">
      <div>
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
    <Hashtags/>
      <div style="width: 98%; margin: 2%">
        <h2>
          <input type="text" :value="boardTitle" @input="titleChange($event)" />
        </h2>

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
        this.$store.commit("modalFull");
        console.log(this.boardContent);
    }
  },
  watch: {    
    storeBoardContent(){
      this.boardContent = this.$store.state.boardContent;
    }
  }
};
</script>

<style scoped>
.modal_header {
  height: 7vh;
  padding: 20px;
  line-height: 27px;
  display: flex;
  justify-content: space-between;
  background-color: #e7e5e5;
}

.modal_title {
  font-size: 15px;
}

.close_btn {
  font-size: 20px;
  color: rgb(139, 139, 139);
  font-weight: 900;
  cursor: pointer;
}
</style>
