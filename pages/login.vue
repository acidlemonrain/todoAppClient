<template>
  <v-layout justify-content-center>
    <v-flex lg10 class v-if="loginmode" transition="slide-x-transition">
      <v-hover>
        <v-card
          class="pa-4 mx-auto"
          width="500"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <v-container>
            <v-layout>
              <div>
                <h1 class="headline">登录</h1>
              </div>
            </v-layout>
          </v-container>
          <v-form>
            <v-text-field v-model="name" label="name" required></v-text-field>

            <v-text-field v-model="password" label="password" required></v-text-field>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn @click="loginmode=!loginmode">注册</v-btn>
              <v-btn @click="login">登录</v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-hover>
    </v-flex>

    <v-flex lg10 class v-if="!loginmode">
      <v-hover>
        <v-card
          class="pa-4 mx-auto"
          width="500"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <v-container>
            <v-layout>
              <div>
                <h1 class="headline">注册</h1>
              </div>
            </v-layout>
          </v-container>
          <v-form>
            <v-text-field v-model="name" label="name" required></v-text-field>

            <v-text-field v-model="password" label="password" required></v-text-field>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn @click="loginmode=!loginmode">转到登录</v-btn>
              <v-btn @click="reg">注册</v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000";
export default {
  data: () => {
    return {
      show: true,
      loginmode: true,
      name: "",
      password: " "
    };
  },
  methods: {
    reg() {
      const info = {
        name: this.name,
        password: this.password
      };
      axios.post("/user/new", info).then(res => {
        if (res.data !== null && res.data !== false) {
          this.$store.commit("settoken", res.data);
          this.$router.push("user");
          this.$toast("注册成功，已转到用户主页");
        }
        if (res.data === false) {
          this.$toast.error("该用户名已经被注册");
        }
      });
    },
    login() {
      const info = {
        name: this.name,
        password: this.password
      };
      axios
        .post("/user", info)
        .then(res => {
          if (res.data !== null && res.data !== false) {
            this.$store.commit("settoken", res.data);
            this.$router.push("user");
            this.$toast("登录成功");
          }
          if (res.data === null) {
            this.$toast.error("用户不存在");
          }
          if (res.data === false) {
            this.$toast.error("用户名或密码不正确");
          }
        })
        .catch(() => {
          this.$toast.error("服务器异常");
        });
    }
  }
};
</script>

<style>
</style>
