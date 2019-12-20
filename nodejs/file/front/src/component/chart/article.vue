<template>
  <div>
    <template v-for="(row, index) in article_data">
      <div v-bind:key="index">
        <div>
          <div class="card">
            <div class="card-header text-center" id="index_card_header">
              <i class="fa fa-commenting" aria-hidden="true"></i>
              {{ row.count }}
              &nbsp; &nbsp;
              <i
                class="fa fa-file"
                aria-hidden="true"
              ></i>
              {{ row.genre }}
              <br />
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              {{ row.updated_at }}
              &nbsp;&nbsp;
            </div>
            <div class="card-body">
              <router-link :to="1 ? `/talks/${row.id}/1` : ''">
                {{
                row.name
                }}
              </router-link>
            </div>
          </div>
          <br />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * component
 */
import { constant } from "src/constant";
import moment from "moment";

export default {
  props: ["data"],

  /**
   * インスタンスがマウントされる前に呼ばれる
   */
  beforeMount() {
    this.article_data = this.$props.data.list.map(m => {
      return {
        count: m.count,
        genre: constant.GENRE[m.genreId],
        updated_at: moment(m.updated_at).format("YYYY-MM-DD HH:mm:ss"),
        name: m.name,
        id: m.id
      };
    });
  },
  data() {
    return {
      article_data: this.$props.data.list
    };
  }
};
</script>

<style></style>
