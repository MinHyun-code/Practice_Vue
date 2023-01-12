<template>
  <div class="modal fade show d-block" style="margin-top: 6%">
    <div class="modal-lg">
      <div class="overlay" @click="this.$store.commit('modalBoardDetail_TF', false); this.$store.commit('modalBoardInsert_TF', false)"></div>
      <div class="modal-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data: () => ({
  }),
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
.modal-card {
  position: relative;
  max-width: 60%;
  margin: auto;
  background-color: white;
  min-height: 700px;
  z-index: 10;
  opacity: 1;
  animation: fadeInLeft 0.8s;
}
</style>