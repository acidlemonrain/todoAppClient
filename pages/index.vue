<template>
  <div class="text-xs-center ma-2">
    <template>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">备忘录</h1>
          <h4 class="subheading">写下你的计划</h4>
        </v-layout>
      </v-parallax>
      <v-parallax height="400" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">记录生活点滴</h1>
          <h4 class="subheading">开心就好？</h4>
        </v-layout>
      </v-parallax>
      <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">努力工作</h1>
          <h4 class="subheading">吃饱去睡觉</h4>
        </v-layout>
      </v-parallax>
    </template>
  </div>
</template>
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
