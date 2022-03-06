<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Favorite</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-color-picker
          hide-canvas
          hide-inputs
          hide-sliders
          class="ma-2"
          :swatches="swatches"
          show-swatches
          v-model="color"
        ></v-color-picker>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="$emit('saveAndColor', color)">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    city: {
      type: String,
    },
  },
  data() {
    return {
      color: '',
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
      ],
    };
  },
  methods: {
    addFavorite() {},
  },
};
</script>

<style lang="scss" scoped></style>
