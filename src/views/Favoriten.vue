<template>
  <v-container class="black">
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              <v-card-actions>
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2"
                      fab
                      icon
                      height="40px"
                      right
                      width="40px"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <ShowCountry
                    @closeDialog="dialog = false"
                    :json="json"
                    @refreshTime="$emit('refreshTime')"
                    @refreshWeather="$emit('refreshWeather')"
                    :getTime="getTime"
                  />
                </v-dialog>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="transparent" dark elevation="0">
          <div class="d-flex justify-space-between">
            <v-card-title class="text-h5">C°</v-card-title>

            <v-spacer></v-spacer>
            <v-text-field
              label="search"
              v-model="country"
              @keyup.enter="$emit('searchCountry', country), (dialog = true)"
              required
            ></v-text-field>

            <v-card-actions>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="ml-2"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                    v-bind="attrs"
                    v-on="on"
                    :disabled="country.length == 0"
                    @click="$emit('searchCountry', country)"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
                <ShowCountry
                  @closeDialog="dialog = false"
                  :json="json"
                  @refreshTime="$emit('refreshTime')"
                  @refreshWeather="$emit('refreshWeather')"
                  :getTime="getTime"
                  @addFavorite="addFavorite"
                />
              </v-dialog>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShowCountry from '@/components/ShowCountry.vue';
import { openDB } from 'idb';
export default {
  methods: {
    async addFavorite(json) {
      await this.db.put('countries', json);
    },
    async getCountries() {
      this.countries = await this.db.getAll('countries');
    },
  },
  async created() {
    this.db = await openDB('favoriteCountriesDB')
    this.getCountries();
  },
  data: () => ({
    showMessage: false,
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Paris',
        artist: '23.02.2022',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Vienna',
        artist: '23.02.2022',
      },
    ],
    dialog: false,
    country: '',
    countries: [],
    db: null,
  }),
  components: {
    ShowCountry,
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

<style lang="scss" scoped></style>
