<template>
  <div>
    <v-tabs v-model="activeTab">
      <v-tab>タブ1</v-tab>
      <v-tab>タブ2</v-tab>
      <v-tab>タブ3</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <h1>内容1</h1>
      </v-tab-item>
      <v-tab-item>
        <h1>内容2</h1>
      </v-tab-item>
      <v-tab-item>
        <h1>内容3</h1>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
</style>