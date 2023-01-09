<template>
  <Header/>
  <Footer/>

  <b-modal id="updateBoard" ref="updateBoard">
    <p>11111111111111111111111</p>
  </b-modal>
</template>

<script>
  import Header from '@/components/common/Header.vue'; //import 헤더 추가
  import Footer from '@/components/common/Footer.vue'; //import 풋터 추가

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>
