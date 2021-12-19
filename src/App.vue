<template>
  <div id="app">
    <v-app>
      <v-main class="view pb-0">
        <app-header
          class="pl-0 pr-0"
        ></app-header>
        <router-view />
        <v-footer app bottom>
          <v-row justify="center">
            <div class="pb-2 pt-2">
              V1.45 © 2021 Concentration Game.
            </div>
          </v-row>
        </v-footer>
      </v-main>
    </v-app>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import appHeader from './components/header/header.vue';
export default {
  name: 'App',
  components: { appHeader },

  data: () => ({
    //
  }),
  mounted() {
    this.$root.$confirm = this.$refs.confirmDialog.open;
  },
};
</script>

<style>
.view {
  background: linear-gradient(
160deg, #02ccba 0%, #aa7ecd 100%) !important;
}
p {
  color: white;
}
h1 {
  color: white;
}
h3 {
  color: white;
}
</style>
