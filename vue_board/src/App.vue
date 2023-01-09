<template>
  <div id="app">
    <router-view/>
    <component :is="layout" ref="layout">
        <transition name="fade" mode="out-in">
            <router-view v-on:show-modal="showModal" v-on:hide-modal="hideModal" v-on:move-leftbar="moveLeftbar" v-on:sidebar-refresh="sidebarRefresh"></router-view>
        </transition>
    </component>
  </div>
</template>

<script>

const default_layout = "default";

export default {
  name: 'app',
  components: {
  },    
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  },
  methods: {
        showModal(modalRefId){
            this.$refs.layout.showModal(modalRefId);
        },
        hideModal(modalRefId){
            this.$refs.layout.hideModal(modalRefId);
        },
        moveLeftbar(menuIdPath){
            this.$refs.layout.moveLeftbar(menuIdPath);
        },
        sidebarRefresh(variant){
            this.$refs.layout.sidebarRefresh(variant);
        }
    }
}
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .table {
    font-size: 12px;
  }
  

</style>