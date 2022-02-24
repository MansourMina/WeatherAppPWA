<template>
  <v-card>
    <v-toolbar dark color="primary" class="fixed-bar">
      <v-btn icon dark @click="$emit('closeDialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="dialog = false"> Hinzufügen </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <Home
      :json="json"
      :getTime="getTime"
      @refreshTime="$emit('refreshTime')"
      @refreshWeather="$emit('refreshWeather')"
    />
  </v-card>
</template>

<script>
import Home from '@/views/Home.vue';
export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    Home,
  },
  props: {
    json: {
      type: Object,
    },
    getTime: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky;
  top: 0rem;
  z-index: 1;
}
</style>
