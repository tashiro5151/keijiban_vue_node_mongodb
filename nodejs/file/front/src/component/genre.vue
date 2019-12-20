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
      base_url: `/rooms/${this.$route.params.id}`,
      breadcrumb_itmes: ["ジャンル", constant.GENRE[this.$route.params.id]],
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
      if (from.params.id !== to.params.id) {
        this.base_url = `/rooms/${to.params.id}`;
        this.current_page = 1;
        this.breadcrumb_itmes[1] = constant.GENRE[to.params.id];
      } else {
        this.current_page = Number(this.$route.params.num);
      }

      // apiたたく
      this.data = await get_request({
        url: `/rooms/${this.$route.params.id}/${Number(this.$route.params.num) -
          1}`
      });
      this.display = true;
    }
  },
  async mounted() {
    // apiたたく
    this.data = await get_request({
      url: `/rooms/${this.$route.params.id}/${Number(this.$route.params.num) -
        1}`
    });
    this.display = true;
  }
};
</script>

<style></style>
