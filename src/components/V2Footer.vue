<template>
  <v-footer height="auto" :fixed="fixed">
    <v-toolbar color="primary" dark>
      <v-spacer />
      <v-toolbar-title>
        <v-spacer />&copy; shangyuan.tuolang
      </v-toolbar-title>
    </v-toolbar>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped>
.v-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>

