<template>
  <!-- 전체화면 -->
  <div class="modal fade show d-block" v-if="this.$store.state.modalFull" style="margin-top: 6%" >
    <div class="modal-lg">
      <div class="overlay" @click="modalFalse()"></div>
      <div class="modal-card1">
        <slot />
      </div>
    </div>
  </div>
  <!-- 팝업화면 -->
  <div class="modal fade show d-block" v-if="!this.$store.state.modalFull" >
    <div class="modal-lg">
      <div class="modal-card2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data: () => ({
  }),

  methods: {
    // 모달 외부 클릭 시 모달 닫기
    modalFalse() {
      this.$store.commit('modalBoardDetail_TF', false); 
      this.$store.commit('modalBoardInsert_TF', false); 
      this.$store.commit('setBoardData', '');
    }
  }
}
</script>

<style scoped>
/* Modal */

.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card1 {
  position: relative;
  max-width: 60%;
  margin: auto;
  background-color: white;
  min-height: 70vh;
  z-index: 10;
  opacity: 1;
  animation: fadeInLeft 0.8s;
}

.modal-card2 {
  position: relative;
  max-width: 100%;
  margin: auto;
  background-color: white;
  min-height: 100vh;
  z-index: 10;
  opacity: 1;
  animation: fadeInLeft 0.8s;
}
</style>