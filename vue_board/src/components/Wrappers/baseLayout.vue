<template>
      <div v-if="this.$store.state.login_tf == false">
        <div style="height: 100vh;">
          <router-view/>
        </div>
      </div>
      <div v-if="this.$store.state.login_tf == true">
        <div id="wrapper">
          <Sidebar/>
          <div id="content-wrapper" class="d-flex flex-column">
            <Header/>
            <router-view/>
            <Footer/>
          </div>
        </div>
      </div>
</template>

<script>
  import Header from '@/components/common/Header.vue'; //import Header 추가
  import Sidebar from '@/components/common/Sidebar.vue'; //import Footer 추가
  import Footer from '@/components/common/Footer.vue'; //import Footer 추가

  export default {
    components: {
      Header,
      Sidebar,
      Footer
    },
    data() {
      return {};        
    },
    computed: {
  
    },   
    methods: {

    },
   }
</script>


