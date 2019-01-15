<template>
  <Markdown :is-edit='false'></Markdown>
</template>

<script>
import Markdown from './components/Markdown'

export default {
  name: 'createForm',
  components: { Markdown }
}
</script>

<style>
  .editor-toolbar{
    opacity:0.9;
    border: 0 !important;
    width: 800px;
    margin: auto;
  }

</style>