<template>
  <v-app>
    <v-toolbar app>
      <api-key></api-key>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import apiKey from './modules/topbar/components/api-key/api-key.vue'

export default {
  name: 'FilestackUploader',
  components: {
    'api-key': apiKey
  }
}
</script>

<style lang="scss" src="./app.scss">

