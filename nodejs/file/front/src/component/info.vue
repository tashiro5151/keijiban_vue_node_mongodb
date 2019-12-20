<template>
  <SimpleSiderbar
    :display="display"
    :base_url="base_url"
    :breadcrumb_itmes="breadcrumb_itmes"
    :current_page="current_page"
    :data="data"
  ></SimpleSiderbar>
</template>

<script lang="ts">
/**
 * component
 */
import SimpleSiderbar from "src/component/simple-sidebar.vue";

/**
 * request
 */
import { get_request } from "src/util/do_request";

/**
 * 定数
 */
import { constant } from "src/constant";

export default {
  components: { SimpleSiderbar },
  data: function() {
    return {
      display: false,
      base_url: "/rooms",
      breadcrumb_itmes: ["一覧"],
      current_page:
        Number.isInteger(Number(this.$route.params.num)) &&
        this.$route.params.num !== undefined
          ? Number(this.$route.params.num)
          : 1,
      data: {
        list: [],
        count: 0
      }
    };
  },

  /**
   * ページ遷移した時
   */
  watch: {
    async $route(to, from) {
      this.display = false;
      this.current_page =
        Number.isInteger(Number(this.$route.params.num)) &&
        this.$route.params.num !== undefined
          ? Number(this.$route.params.num)
          : 1;

      // apiたたく
      this.data = await get_request({
        url: `/rooms/${Number(this.current_page) - 1}`
      });
      this.display = true;
    }
  },
  async mounted() {
    // apiたたく
    this.data = await get_request({
      url:
        this.$route.params.num === undefined
          ? "/rooms/0"
          : `/rooms/${Number(this.$route.params.num) - 1}`
    });
    this.display = true;
  }
};
</script>

<style></style>
