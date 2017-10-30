<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body{
    margin:0;
    padding: 0;
  }

  .el-pagination__editor{
    width: 50px!important;
  }
 /* .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }*/
</style>
