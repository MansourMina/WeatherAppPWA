<template>
  <v-container class="mt-10 px-16" fluid>
    <v-toolbar dense absolute class="mt-10" width="500">
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        v-model="search"
      ></v-text-field>
      <v-btn
        icon
        target="_blank"
        :href="`https://www.google.com/maps/place/${search}`"
        :disabled="search.length == 0"
      >
        <v-icon>mdi-map-marker-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card justify-content-center color="transparent" elevation="0">
      <v-container fluid class="px-16">
        <v-row
          ><v-col cols="12" md="7" lg="7">
            <v-img class="mt-5 mx-auto" src="test.png" width="100px" />
            <v-row class="d-flex flex-column px-3 my-13">
              <h1 class="display-4 white--text">
                {{ currentWeather }}
              </h1>
              <h1 class="mt-5 mb-0 white--text">{{ countryName }}</h1>
              <h4 class="white--text font-weight-light">{{ timeofCity }}</h4>
              <h3 class="mt-4"></h3>
            </v-row>
            <div class="text-center">
              <p class="display-2 white--text font-weight-light">
                {{ description }}
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <v-card
              height="500px"
              style="
                background-color: #607d8b;
                align-items: center;
                display: flex;
              "
            >
              <v-row>
                <v-container class="px-10">
                  <p class="white--text">Weather Details</p>
                  <v-container>
                    <div class="d-flex">
                      <p class="details mr-2">Feels Like</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Humidity</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Sunrise</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Sunset</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Temperature max</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Temperature min</p>
                      <p class="ml-10 white--text">20°</p>
                    </div>
                  </v-container>
                  <v-btn text class="mt-4 white--text">
                    &rarr; My Position
                  </v-btn>
                </v-container>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imageWeather: null,
      currentWeather: '6°',
      countryName: 'Vienna',
      timeofCity: '04.02.2022, 12:36',
      description: 'Clouds',
      search: '',
    };
  },
  components: {},
};
</script>

<style>
body {
  color: #fff;
  overflow-x: hidden;
  height: 100%;
  background-repeat: no-repeat;
}
.details {
  color: #b0bec5;
}
</style>
