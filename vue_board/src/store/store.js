import { createStore } from "vuex";

const store = createStore({
  state: {
    boardData: [],
    boardDate: "",
    boardNum: 0,
    boardReadCnt: 0,
    boardTitle: "",
    regId: "",
    modalBoard_tf: false,
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
        state.regId = data.reg_id;
      }
    },
    // 게시판 팝업 여부
    modalBoard_TF: function (state, data) {
      state.modalBoard_tf = data;
    },
  },
});

export default store;
