<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">dwdwqdw</h3>
          <div>
            <i>type: asdadda</i>
          </div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">作者</v-btn>
        <v-btn flat color="orange" :to="'/todo/'  " router>查看备忘录</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [ele]
};
</script>

<style>
</style>
