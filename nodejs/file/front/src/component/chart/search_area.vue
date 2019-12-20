<template>
  <div class="mx-auto" style="max-width: 400px;">
    <div class="input-group">
      <!-- テキストフィールド -->
      <input
        type="text"
        v-model="search_word"
        class="form-control"
        placeholder="検索"
        aria-label
        aria-describedby="basic-addon1"
        maxlength="15"
        @keydown.enter="search_enter"
      />

      <!-- 検索ボタン -->
      <div class="input-group-append">
        <button class="btn btn-info" type="button" @click="search_click">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search_word: ""
    };
  },
  methods: {
    /**
     * テキストフィールドでEnterキーを押されたとき
     */
    search_enter() {
      this.search_click();
    },

    /**
     * 検索ボタンが押されたとき
     */
    search_click() {
      if (this.search_word.length === 0) {
        this.$router.push(`/`);
        return;
      }

      if (this.search_word.length > 15) {
        alert("検索文字は15文字以内です");
        return;
      }

      // 同じキーワードで検索された時
      if (this.$route.path === `/search/${this.search_word}/1`) {
        location.reload();
        return;
      }

      this.$router.push(`/search/${this.search_word}/1`);
    }
  }
};
</script>

<style></style>
