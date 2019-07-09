<template>
  <v-container>
    <v-layout justify-content-center wrap>
      <v-flex lg10 class="mb-2">
        <v-card>
          <v-container>
            <v-layout>
              <v-flex>
                <div>
                  <h1 class="headline">基本信息：</h1>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-title>
            <div>
              <h3 class="headline">用户名：{{user.username}}</h3>
              <div>
                <h5>ID{{user.userid}}</h5>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-content-center wrap>
      <v-flex lg10>
        <v-expansion-panel>
          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-spacer></v-spacer>
              <div>
                我的备忘录
                <v-icon>event</v-icon>
              </div>
            </template>
            <v-layout justify-space-around class="grey darken-2" wrap>
              <v-flex lg12>
                <v-layout>
                  <v-spacer></v-spacer>
                  <v-btn :to="'/newtodo'">创建备忘录</v-btn>
                </v-layout>
              </v-flex>

              <v-flex lg5 v-for="ele in todolist" v-bind:key="ele.id">
                <v-card class="my-2">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ele.name}}</h3>
                      <div>
                        <i>author: {{ele.username}}</i>
                      </div>
                      <div>
                        <i>type: {{ele.type}}</i>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange" :to="'/showtodo/'+ele.id" router>查看备忘录</v-btn>
                    <v-btn flat color="orange" :to="'/todo/'+ele.id" router>修改</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000";
export default {
  data: () => {
    return {
      user: {},
      todolist: []
    };
  },
  created() {
    var i = axios
      .post("/user/info", { token: this.$store.state.token })
      .then(res => {
        const prom = new Promise((rs, rj) => {
          this.user = res.data;
          rs(this.user);
        });
        return prom;
      });
    i.then(x => {
      axios
        .post("/user/todolist", { token: this.$store.state.token })
        .then(res => {
          this.todolist = res.data;
          console.log(res.data);
        });
    });
  }
};
</script>

<style scoped>
</style>
