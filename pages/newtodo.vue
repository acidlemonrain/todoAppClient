<template>
  <v-container>
    <v-layout>
      <v-flex lg10>
        <v-form>
          <v-text-field v-model="name" label="name" required></v-text-field>
          <v-text-field v-model="type" label="type" required></v-text-field>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn @click="newtodo">创建</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:9999";
export default {
  data: () => {
    return {
      name: "",
      type: ""
    };
  },
  methods: {
    newtodo() {
      const info = {
        name: this.name,
        type: this.type,
        token: this.$store.state.token
      };
      axios.post("/todolist/new", info).then(res => {
        this.$toast("备忘录创建成功");
        this.$router.push("user");
      });
    }
  },
  created() {}
};
</script>

<style>
</style>
