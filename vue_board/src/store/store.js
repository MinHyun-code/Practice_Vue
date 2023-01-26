import { createStore } from "vuex";

const store = createStore({
  state: {
    boardData: "",
    boardContent: "",
    boardDate: "",
    boardNum: 0,
    boardReadCnt: 0,
    boardTitle: "",
    regId: "",
    modal_tf: false,
    modalBoardDetail_tf: false,
    modalBoardInsert_tf: false,
  },
  computed: {},
  mutations: {
    // 게시판 데이터 저장
    setBoardData: function (state, data) {
      if (data != undefined) {
        state.boardData = data;
        state.boardDate = data.board_date;
        state.boardNum = data.board_num;
        state.boardReadCnt = data.board_read_cnt;
        state.boardTitle = data.board_title;
        state.boardContent = data.board_content;
        state.regId = data.reg_id;
      }
    },
    // 게시판 상세 팝업 여부
    modalBoardDetail_TF: function (state, data) {
      state.modal_title = "게시판 상세보기";
      state.modal_tf = data;
      state.modalBoardDetail_tf = data;
    },
    // 게시판 등록 팝업 여부
    modalBoardInsert_TF: function (state, data) {
      state.modal_title = "게시판 등록";
      state.modal_tf = data;
      state.modalBoardInsert_tf = data;
    },
    // 모달 화면 크기
    modalFull: function (state) {
      if (state.modalFull == false) {
        state.modalFull = true;
      } else {
        state.modalFull = false;
      }
    },
    setBoardListCall: function (state, data) {
      state.setBoardListCall = data;
    },

    
  },
});

export default store;
