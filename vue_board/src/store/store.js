import { createStore } from "vuex";

const store = createStore({
  state: {},
  mutations: {
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
  },
});

export default store;
