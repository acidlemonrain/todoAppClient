 <template>
  <v-layout justify-space-between wrap>
    <v-container>
      <v-layout>
        <div>
          <h1 class="headline">所有人的备忘录</h1>
        </div>
      </v-layout>
    </v-container>
    <v-flex lg10 v-for="ele in todols" v-bind:key="ele.id">
      <v-card class="mb-2">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ele.name}}</h3>
            <div>
              <i>
                <span class="grey--text">type:</span>
                <span class="yellow--text">{{ele.type}}</span>
              </i>
            </div>
            <div>
              <i>
                <span class="grey--text">author:</span>
                <span class="green--text">{{ele.username}}</span>
              </i>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="orange" :to="'/showtodo/'+ele.id" router>查看备忘录</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
 
 <script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000";
export default {
  data: () => {
    return {
      todols: []
    };
  },
  created() {
    axios
      .get("/todolist")
      .then(x => (this.todols = x.data))
      .catch(() => {
        this.$toast.error("服务器异常");
      });
  }
};
</script>
 
 <style>
</style>
 