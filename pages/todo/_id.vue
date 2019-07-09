<template>
  <v-container>
    <div class="form" v-if="form">
      <v-form>
        <v-text-field v-model="name" label="name" required></v-text-field>

        <v-text-field v-model="des" label="des" required></v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn @click="form=!form">取消</v-btn>
          <v-btn @click="add">确定</v-btn>
        </v-layout>
      </v-form>
    </div>
    <v-layout justify-center>
      <v-container fluid>
        <v-btn :color="color" @click="privacy">对所有人可见</v-btn>
      </v-container>
      <v-spacer></v-spacer>
      <v-btn dark fab color="pink" @click="form=!form">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout justify-space-around wrap>
      <v-flex lg5 v-for="ele in todos" v-bind:key="ele.id">
        <v-card class="mb-3">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ele.name}}</h3>
              <div>
                <i>type: {{ele.des}}</i>
              </div>
              <div></div>
            </div>
          </v-card-title>

          <v-card-actions>
            <i>deadline: {{ele.deadline | local}}</i>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="rmtodo(ele.id)">删除</v-btn>
          </v-card-actions>
        </v-card>
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
      color: "green",
      switch1: false,
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

  methods: {
    rmtodo(x) {
      axios.get("/todo/rm/" + x).then(res => {
        if (res.data == true) {
          this.$toast("删除成功");
          this.init();
        }
      });
    },
    privacy() {
      const value = this.color == "green" ? false : true;
      const finalcolor = value == false ? "grey" : "green";
      axios
        .post("/todolist/privacy/" + this.$route.params.id, {
          token: this.$store.state.token,
          value: value
        })
        .then(res => {
          if (res.data == true) {
            this.$toast("修改成功");
            this.color = finalcolor;
          } else {
            this.$toast.error("服务器错误");
          }
        })
        .catch(() => {
          this.$toast.error("服务器错误");
        });
    }
  },
  init() {
    this.id = this.$route.params.id;
    axios.get("/todo/" + this.id).then(res => {
      this.todos = res.data;
    });
  },
  add() {
    const info = {
      listid: this.$route.params.id,
      name: this.name,
      des: this.des,
      token: this.$store.state.token,
      deadline: this.date
    };
    axios
      .post("/todo/new", info)
      .then(res => {
        this.form = false;
        return new Promise((rs, rj) => {
          rs(res.data);
        });
      })
      .then(() => {
        this.init();
        this.$toast("添加成功");
      });
  },
  created() {
    this.id = this.$route.params.id;
    axios.get("/todo/" + this.id).then(res => {
      this.todos = res.data;
    });
    axios.get("/todolist/" + this.id).then(res => {
      if (res.data == false) {
        this.color = "gray";
      }
      if (res.data == true) {
        this.color = "green";
      }
    });
  }
};
</script>

<style scoped>
.form {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: black;
  padding: 2rem;
}
</style>

