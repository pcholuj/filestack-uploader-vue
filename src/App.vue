<template>
  <v-app>
    <v-toolbar app></v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'FilestackUploader'
}
</script>

<style lang="scss" src="./app.scss">

