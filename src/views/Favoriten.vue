<template>
  <v-container class="black">
    <v-row dense>
      <v-col v-for="(item, i) in countries" :key="i" cols="12">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="text-h5"
                v-text="item.countryName"
              ></v-card-title>
              <!-- <v-card-subtitle v-text="item.artist"></v-card-subtitle> -->
              <v-card-actions>
                <v-row>
                  <v-col>
                    <v-btn
                      class="ml-2"
                      fab
                      icon
                      right
                      @click="
                        passData(item.countryName);
                        dialog = true;
                      "
                    >
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="ml-2 d-block text-center"
                      fab
                      icon
                      right
                      color="red darken-4"
                      @click="removeCountry(item.countryName)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
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
              @keyup.enter="
                dialog = true;
                passData(country);
              "
              required
            ></v-text-field>
            <v-btn
              class="ml-2"
              fab
              icon
              height="40px"
              right
              width="40px"
              :disabled="country.length == 0"
              @click="
                passData(country);
                dialog = true;
              "
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-card-actions> </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-if="!offline"
    >
      <Search
        :country="country"
        :indexCountries="countries"
        @closeDialog="dialog = false"
        @addFavorite="addFavorite"
      />
    </v-dialog>
    <!-- <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <Search :country="country" @closeDialog="dialog = false" />
    </v-dialog> -->
  </v-container>
</template>

<script>
import { bus } from '../main';
import Search from '@/components/Search.vue';
import { openDB } from 'idb';
export default {
  methods: {
    passData(country) {
      this.country = country;
      bus.$emit('changeIt', country);
    },
    async removeCountry(country) {
      await this.db.delete('countries', country);
      this.getCountries();
    },
    async addFavorite(json) {
      await this.db.put('countries', json);
      this.getCountries();
      navigator.vibrate(400);
    },
    async getCountries() {
      this.countries = await this.db.getAll('countries');
    },
  },
  async created() {
    this.db = await openDB('favoriteCountriesDB');
    await this.getCountries();
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
    Search,
  },
  props: {
    json: {
      type: Object,
    },
    getTime: {
      type: Function,
    },
    offline: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped></style>
