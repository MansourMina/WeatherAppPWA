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

    <v-main :class="$route.name == 'Favoriten' ? 'black' : 'none'">
      <router-view
        :json="newJson"
        :getTime="getTime"
        @refreshTime="timeofCity = getTime(zoneName)"
        @refreshWeather="apiCall"
      />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  // mounted: function () {
  //   this.$nextTick(function () {
  //     window.setInterval(async () => {
  //       await this.getWeather();
  //       console.log('Minute vergangen');
  //     }, 1000 * 60);
  //     window.setInterval(async () => {
  //       this.timeofCity = this.getTime(this.zoneName);
  //     }, 1000);
  //   });
  // },
  data: () => ({
    drawer: false,
    background: '',
    zoneName: '',
    imageWeather: null,
    currentWeather: '',
    countryName: 'Vienna',
    timeofCity: '',
    description: '',
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
    newJson: {},
  }),
  created() {
    // if (this.searchCountry != null) {
    //   const api = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCountry}&appid=${this.openweatherKey}`;

    //   const response = await fetch(api);

    //   if (!response.ok) {
    //     // this.clickMethod = false;
    //     this.message = 'Can not read Position';
    //   } else {
    //     const json = await response.json();
    //     await this.getWeather(json);
    //     // this.waiting = false;
    //   }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;

        await this.apiCall();
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
    changeBackground() {
      let splitDateTime = this.timeofCity.split(',');
      let timeofSplit = splitDateTime[1];
      let splitHourMinute = timeofSplit.split(':')[0];
      if (splitHourMinute <= 6 || splitHourMinute >= 20) {
        this.background = 'rgb(4, 12, 54)';
        // this.$emit('changeBackground', this.background);
      } else {
        this.background = 'rgb(78, 99, 206)';
        // this.$emit('changeBackground', this.background);
      }
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
      this.currentWeather = Math.ceil(json.main.temp - 273.15) + '°';
      this.countryName = json.name;
      console.log(json);
      this.description = json.weather[0].main;
      let weatherIcon = json.weather[0].icon;
      this.imageWeather = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      this.feelsLike = Math.ceil(json.main.feels_like - 273.15) + '°';
      this.tmax = Math.ceil(json.main.temp_max - 273.15) + '°';
      this.tmin = Math.ceil(json.main.temp_min - 273.15) + '°';
      this.timeofCity = this.getTime(await this.getTimeZone());
      this.changeBackground();

      this.newJson = {
        currentWeather: this.currentWeather,
        countryName: this.countryName,
        description: this.description,
        imageWeather: this.imageWeather,
        feelsLike: this.feelsLike,
        tmax: this.tmax,
        tmin: this.tmin,
        timeofCity: this.timeofCity,
        background: this.background,
      };

      // this.sunrise = sunriseSunset.format(new Date(json.sys.sunrise * 1000));
      // this.sunset = sunriseSunset.format(new Date(json.sys.sunset * 1000));
      this.humidity = json.main.humidity + '%';
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
