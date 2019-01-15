<template>
  <article-detail :is-edit='true'></article-detail>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'editForm',
  components: { ArticleDetail }
}
</script>

<style scoped>
  .editor-toolbar{
    opacity:0.9;
    border: 0 !important;
    width: 800px;
    margin: auto;
  }
</style>