<template>
  <v-container fluid>
    <div class="ma-3" id="addfavorite">
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
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <AddFavorite :city="countryName" @closeDialog="dialog = false" />
      </v-dialog>
    </div>
    <v-card justify-content-center color="transparent" elevation="0">
      <v-container>
        <v-row
          ><v-col cols="12" md="7" lg="7">
            <v-img class="mt-5 mx-auto" :src="imageWeather" width="100px" />
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
                      <p class="ml-10 white--text">{{ feelsLike }}</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Humidity</p>
                      <p class="ml-10 white--text">{{ humidity }}</p>
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
                      <p class="ml-10 white--text">{{ tmax }}</p>
                    </div>
                    <div class="d-flex">
                      <p class="details">Temperature min</p>
                      <p class="ml-10 white--text">{{ tmin }}</p>
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
import AddFavorite from '@/components/AddFavorite.vue';
export default {
  components: {
    AddFavorite,
  },
  name: 'Home',
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(async () => {
        await this.getWeather();
        console.log('Minute vergangen');
      }, 1000 * 60);
      window.setInterval(async () => {
        this.timeofCity = this.getTime(this.zoneName);
      }, 1000);
    });
  },
  data() {
    return {
      zoneName: '',
      imageWeather: null,
      currentWeather: '',
      countryName: 'Vienna',
      timeofCity: '23.02.2022, 13:14',
      description: 'Clouds',
      search: '',
      long: '',
      lat: '',
      openweatherKey: '52293b43835f810dfe6fc255311d9794',
      feelsLike: '',
      tmin: '',
      tmax: '',
      humidity: '',
      dialog: false,
      timeZoneKey: '1OPC3LTOMNKY',
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;

        this.apiCall();
      });
    }
  },
  methods: {
    async apiCall() {
      //  if (status == 'current') {
      // this.waiting = true;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.openweatherKey}`;

      const response = await fetch(api);

      if (!response.ok) {
        // this.clickMethod = false;
        this.message = 'Can not read Position';
      } else {
        const json = await response.json();
        await this.getWeather(json);
        // this.waiting = false;
      }
    },
    getTime(timeZone) {
      let options = {
        timeZone: timeZone,
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Intl.DateTimeFormat([], options).format(new Date());
    },
    async getTimeZone() {
      const api = `https://api.timezonedb.com/v2.1/get-time-zone?key=${this.timeZoneKey}&format=json&by=position&lat=${this.lat}&lng=${this.long}`;

      const response = await fetch(api);
      if (!response.ok) {
        console.log('etwas schiefgelaufen');
      }
      const json = await response.json();
      this.zoneName = json.zoneName;
      return json.zoneName;
    },
    async getWeather(json) {
      console.log(json)
      this.currentWeather = Math.ceil(json.main.temp - 273.15) + '°';
      this.countryName = json.name;
      this.description = json.weather[0].main;
      let weatherIcon = json.weather[0].icon;
      this.imageWeather = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      this.feelsLike = Math.ceil(json.main.feels_like - 273.15) + '°';
      this.tmax = Math.ceil(json.main.temp_max - 273.15) + '°';
      this.tmin = Math.ceil(json.main.temp_min - 273.15) + '°';
      this.timeofCity = this.getTime(await this.getTimeZone());

      // this.sunrise = sunriseSunset.format(new Date(json.sys.sunrise * 1000));
      // this.sunset = sunriseSunset.format(new Date(json.sys.sunset * 1000));
      this.humidity = json.main.humidity + '%';
      console.log(json);
    },
  },
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
#addfavorite {
  position: fixed;
  bottom: 20;
  right: 0;
  z-index: 2;
}
</style>
