<template>
  <div id="app">
    <!-- 추가된 헤더 컴포넌트 사용 -->
    <Header />
    <router-view />
    <component :is="layout" ref="layout">
        <transition name="fade" mode="out-in">
            <router-view v-on:show-modal="showModal" v-on:hide-modal="hideModal" v-on:move-leftbar="moveLeftbar" v-on:sidebar-refresh="sidebarRefresh"></router-view>
        </transition>
    </component>
    <!-- 추가된 풋터 컴포넌트 사용 -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/common/Header.vue'; //import 헤더 추가
import Footer from './components/common/Footer.vue'; //import 풋터 추가

export default {
  name: 'App',
  components: {
    Header          //헤더 컴포넌트 추가
    ,Footer         //풋터 컴포넌트 추가
    
  },
  methods:{
    showModal(modalRefId){
            this.$refs.layout.showModal(modalRefId);
        },
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