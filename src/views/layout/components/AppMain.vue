<template>
  <section class="app-main">
        <router-view :key="key"/>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*padding: 1.25rem;*/
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f9f9fa;
}
</style>

