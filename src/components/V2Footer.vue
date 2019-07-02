<template>
  <v-footer height="auto" color="primary" :fixed="fixed">
    <v-layout justify-center row wrap>
      <v-flex>
        <div>&copy; shangyuan.tuolang</div>
      </v-flex>
    </v-layout>
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

