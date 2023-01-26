<template>
    <!-- <router-view/> -->
    <component :is="layout" ref="layout"/>
    <Modal v-if="this.$store.state.modal_tf">
      <Content/>
    </Modal>
</template>

<script>

const default_layout = "default";
import Content from "@/components/common/Content.vue";
import Modal from '@/components/common/Modal.vue'; //import Modal 추가

export default {
  name: 'app',
  components: {
    Content,
    Modal
  },    
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
  },
  methods: {
    }
}
</script>

<style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    }

  @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translate3d(-5%, 0, 0);
        }
        to {
            opacity: 1;
            transform: translateZ(0);
        }
  }

  @keyframes fadeOutLeft {
          0% {
            opacity: 1;
            transform: translateZ(0);
          }
          to {
            opacity: 0;
            transform: translate3d(-5%, 0, 0);
          }
  }
</style>