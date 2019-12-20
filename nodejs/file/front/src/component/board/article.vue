<template>
  <div>
    <template v-for="(row, index) in article_data">
      <div v-bind:key="index">
        <div>
          <div class="card">
            <div class="card-header text-center" id="board_card_header">
              {{ row.name }}
              <br />
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              {{ row.created_at }}
            </div>
            <div class="card-body">
              <p class="card-text">
                <span v-for="(message, index2) in row.messages" v-bind:key="index2">
                  <template v-for="(k_message, index3) in message">
                    <!-- リンクを作成 -->
                    <span v-bind:key="index3" v-if="Object.keys(k_message).indexOf('match') !== -1">
                      <a
                        :href="`${k_message.match}`"
                        target="_blank"
                        rel="noopener noreferrer"
                      >{{ k_message.match }}</a>
                    </span>

                    <!-- 文字列を表示 -->
                    <span v-bind:key="index3" v-else>{{ k_message }}</span>
                  </template>
                  <br />
                </span>
              </p>
            </div>
          </div>
        </div>
        <br />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * 定数
 */
import { constant } from "src/constant";

/**
 * 時間を操るライブラリ
 */
import moment from "moment";

/**
 * 正規表現ライブラリ
 */
import reactStringReplace from "react-string-replace";

export default {
  props: ["data"],

  /**
   * インスタンスがマウントされる前に呼ばれる
   */
  beforeMount() {
    this.article_data = this.$props.data.list.map(m => {
      return {
        name: m.name,
        created_at: moment(m.created_at).format("YYYY-MM-DD HH:mm:ss"),
        messages: m.message.split("\n").map(row => {
          return reactStringReplace(row, /(https?:\/\/\S+)/g, (match, j) => {
            return { match: match };
          });
        })
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
