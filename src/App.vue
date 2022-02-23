<template>
  <v-app>
    
    <v-footer app height="80" id="footer">
      <v-btn
        plain
        active-class="blue--text transparent"
        to="/"
        height="50"
        exact
      >
        <v-col cols="12" class="align-center">
          <v-row class="mb-2 justify-center">
            <v-icon medium> mdi-thermometer </v-icon>
          </v-row>
          <v-row> Wetter </v-row>
        </v-col>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        plain
        active-class="blue--text transparent"
        to="/favorite"
        height="50"
        exact
      >
        <v-col cols="12">
          <v-row class="mb-2 justify-center">
            <v-icon medium> mdi-star </v-icon>
          </v-row>
          <v-row> Favoriten </v-row>
        </v-col>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        plain
        active-class="blue--text transparent"
        to="/about"
        height="50"
        exact
      >
        <v-col cols="12">
          <v-row class="mb-2 justify-center">
            <v-icon medium> mdi-information </v-icon>
          </v-row>
          <v-row> About </v-row>
        </v-col>
      </v-btn>
    </v-footer>

    <v-main class="light-blue darken-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),
};
</script>

<style>

</style>
