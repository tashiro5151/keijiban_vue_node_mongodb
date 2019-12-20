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
import { get_request } from "src/util/do_request";
import { constant } from "src/constant";

export default {
  components: { SimpleSiderbar },
  data: function() {
    return {
      display: false,
      base_url: `/search/${this.$route.params.str}`,
      breadcrumb_itmes: ["検索"],
      current_page: Number(this.$route.params.num),
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
      if (from.params.str !== to.params.str) {
        this.base_url = `/search/${to.params.str}`;
        this.current_page = 1;
      } else {
        this.current_page = Number(this.$route.params.num);
      }

      // apiたたく
      this.data = await get_request({
        url: `/search/${this.$route.params.str}/${Number(
          this.$route.params.num
        ) - 1}`
      });
      this.display = true;
    }
  },

  /**
   * ページがマウントされた時
   */
  async mounted() {
    // apiたたく
    this.data = await get_request({
      url: `/search/${this.$route.params.str}/${Number(this.$route.params.num) -
        1}`
    });
    this.display = true;
  }
};
</script>

<style></style>
