<template>
  <v-layout justify-content-center>
    <v-flex 10>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0">{{todo.name}}</h3>
            <div>{{ todo.des }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [todo]
};
</script>

<style>
</style>
