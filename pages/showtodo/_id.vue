<template>
  <v-timeline>
    <div v-for="(item, index) in todos" v-bind:key="item.id">
      <v-timeline-item v-if="index%2==0" color="purple lighten-2" fill-dot right>
        <v-card>
          <v-card-title class="purple lighten-1">
            <h2 class="white--text">{{item.name}}</h2>
          </v-card-title>
          <v-container>
            <v-layout>
              <v-flex>
                <div>{{item.des}}</div>
                <div>
                  <i class="red--text">{{item.deadline|local}}</i>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="index%2!=0" color="amber lighten-1" fill-dot left>
        <v-card>
          <v-card-title class="orange lighten-1">
            <h2 class="white--text">{{item.name}}</h2>
          </v-card-title>
          <v-container>
            <v-flex>
              <div>{{item.des}}</div>
              <div>
                <i class="red--text">{{item.deadline|local}}</i>
              </div>
            </v-flex>
          </v-container>
        </v-card>
      </v-timeline-item>
    </div>
  </v-timeline>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000";
export default {
  data: () => {
    return {
      name: "",
      des: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      form: false,
      id: " ",
      todos: []
    };
  },
  filters: {
    local: function(value) {
      return new Date(value).toLocaleString();
    }
  },

  created() {
    this.id = this.$route.params.id;
    axios.get("/todo/" + this.id).then(res => {
      this.todos = res.data.sort((a, b) => {
        var dateA = new Date(a.deadline);
        var dateB = new Date(b.deadline);
        return dateA > dateB;
      });
      console.log(res.data);
    });
  }
};
</script>

<style>
</style>
