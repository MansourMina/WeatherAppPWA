<template >
  <v-container fluid :style="`background-color: ${json.background}`"> 
    <!-- <div class="ma-3" id="addfavorite">
      <v-dialog v-model="dialog" max-width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black darken-4 "
            fab
            large
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <AddFavorite :city="countryName" @closeDialog="dialog = false" />
      </v-dialog>
    </div> -->
    <v-card justify-content-center color="transparent" elevation="0">
      <v-container>
        <v-row
          ><v-col cols="12" md="7" lg="7">
            <v-img
              class="mt-5 mx-auto"
              :src="json.imageWeather"
              width="100px"
            />
            <v-row class="d-flex flex-column px-3 my-13">
              <h1 class="display-4 white--text">
                {{ json.currentWeather }}
              </h1>
              <h1 class="mt-5 mb-0 white--text">{{ json.countryName }}</h1>
              <h4 class="white--text font-weight-light">
                {{ json.timeofCity }}
              </h4>
              <h3 class="mt-4"></h3>
            </v-row>
            <div class="text-center">
              <p class="display-2 white--text font-weight-light">
                {{ json.description }}
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
                      <p class="ml-10 white--text">{{ json.feelsLike }}</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Humidity</p>
                      <p class="ml-10 white--text">{{ json.humidity }}</p>
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
                      <p class="ml-10 white--text">{{ json.tmax }}</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Temperature min</p>
                      <p class="ml-10 white--text">{{ json.tmin }}</p>
                    </div>
                  </v-container>
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
// import AddFavorite from '@/components/AddFavorite.vue';
export default {
  components: {
    // AddFavorite,
  },
  name: 'Home',
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(async () => {
        this.$emit('refreshWeather');
        console.log('Minute vergangen');
      }, 1000 * 60);
      window.setInterval(async () => {
        this.$emit('refreshTime');
        this.json.timeofCity = this.getTime(this.json.zoneName);
      }, 1000);
    });
  },
  props: {
    json: {
      type: Object,
    },
    getTime:{
      type: Function
    }
  },
};
</script>
