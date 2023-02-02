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
    user_id: "",
    login_tf: false,
    modalFull: false,
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
      state.modal_title = "게시글 상세보기";
      state.modal_tf = data;
      state.modalBoardDetail_tf = data;
    },
    // 게시판 등록 팝업 여부
    modalBoardInsert_TF: function (state, data) {
      state.modal_title = "게시글 등록";
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
    //===================================================== 로그인 / 로그아웃 =======================================================
    // 로그인
    setLoginProcess: function (state, data) {
      state.user_id = data.user_id;
      state.user_name = data.user_name;
      state.login_tf = data.login_tf;
    },

    // Storage에 state를 저장합니다.
    saveStateToStorage(state) {
      // localStorage.setItem("login.user_id", state.user_id);
      // localStorage.setItem("login.user_name", state.user_name);
      // localStorage.setItem("login.login_tf", state.login_tf);
      localStorage.setItem("vue.login", JSON.stringify(state));
    },

    // 로그아웃
    setLogoutProcess: function (state) {
      state.user_id = "";
      state.user_name = "";
      state.login_tf = false;
      // localStorage.removeItem("login.user_id");
      // localStorage.removeItem("login.user_name");
      // localStorage.removeItem("login.login_tf");
      localStorage.removeItem("vue.login");
    },

    // Storage에서 state를 읽어옵니다.
    readStateFromStorage(state) {
      if (localStorage.getItem("vue.login") != null) {
        let storage = JSON.parse(localStorage.getItem("vue.login"));
        if (storage.login_tf != false) {
          state.user_id = storage.user_id;
          state.user_name = storage.user_name;
          state.login_tf = storage.login_tf;
        }
      }
    },

    //===============================================================================================================================
  },
});

export default store;
