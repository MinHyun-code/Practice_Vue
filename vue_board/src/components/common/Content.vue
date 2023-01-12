<template>
  <div class="content">
    <header class="modal_header">
      <span class="modal_title">{{ this.$store.state.modal_title }}</span>
      <div class="close_btn" id="close_btn">x</div>
    </header>
    <div v-if="this.$store.state.modalBoardDetail_tf">
      <h2>상세보기</h2>
      <h2>{{ this.$store.state.boardData.board_title }}</h2>
      <div>
        {{ this.$store.state.boardData }}
      </div>
    </div>

    <div v-if="this.$store.state.modalBoardInsert_tf">
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
          style="
            width: 47%;
            float: right;
            overflow: auto;
            height: 50vh;
            margin: 2%;
          "
        />
      </div>
    </div>
    <a
      class="btn btn-sm btn-outline-secondary"
      type="submit"
      v-on:click="boardInsert()"
      >등록</a
    >
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
import MarkdownItStrikethroughAlt from "markdown-it-strikethrough-alt";
import toastr from "vue-toastr";

export default {
  name: "Content",
  components: {
    Markdown,
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

    boardInsert() {
      const form = new FormData();
      form.append("board_title", this.boardTitle);
      form.append("board_content", this.boardContent);
      form.append("reg_id", "a");
      this.$axios.post("/api/board/insert", form).then((res) => {
        toastr.success(res);
        this.$store.commit("modalBoardDetail_TF", false);
        this.$store.commit("modalBoardInsert_TF", false);
      });
    },
  },
};
</script>

<style scoped>
.modal_header {
  height: 10%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #e7e5e5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
