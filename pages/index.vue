<template>
  <div class="text-xs-center ma-2">
    <v-btn dark @click="open">Open Snackbar{{snackbar }}</v-btn>
    <v-snackbar v-model="snackbar" timeout="500">
      {{ text }}
      <v-btn color="pink" text>Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  data: () => ({
    text: "Hello, I'm a snackbar"
  }),
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    open() {
      this.$toast("Custom options");
    }
  },
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>
