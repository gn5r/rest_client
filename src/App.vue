<template>
  <v-app id="app">
    <v-content>
      <home/>
    </v-content>
  </v-app>
</template>

<script>
import home from "./view/home";

export default {
  name: "App",
  components: {
    home
  },
  data: () => ({})
};
</script>
