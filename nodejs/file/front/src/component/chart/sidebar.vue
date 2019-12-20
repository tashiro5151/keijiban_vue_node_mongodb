<template>
  <div>
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading"></div>
      <div class="list-group list-group-flush">
        <template v-for="(value, index) in genre">
          <router-link
            :to="`/rooms/${index}/1`"
            class="list-group-item list-group-item-action bg-light"
            v-bind:key="index"
          >{{value}}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 定数
 */
import { constant } from "src/constant";

export default {
  data() {
    return {
      genre: constant.GENRE
    };
  }
};
</script>

<style></style>