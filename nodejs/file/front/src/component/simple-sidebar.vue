<template>
  <div>
    <!-- ローディング画面 -->
    <Loading v-if="!display"></Loading>

    <div v-if="display" class="d-flex" :class="toggle ? 'toggled' : ''" id="wrapper">
      <!-- サイドバー -->
      <Sidebar></Sidebar>

      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <!-- ジャンルボタン -->
          <button class="btn btn-primary" id="menu-toggle" @click="setToggle">ジャンル</button>
          <!-- ナビバー -->
          <Navbar></Navbar>
        </nav>

        <div aria-label="パンくずリスト">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item">
              <a href="/">ホーム</a>
            </li>

            <!-- ページ情報 -->
            <li
              v-for="(item, index) in breadcrumb_itmes"
              :key="index"
              class="breadcrumb-item active"
              aria-current="page"
            >{{ item }}</li>

            <!-- 件数 -->
            <li class="breadcrumb-item active" aria-current="page">{{ data.count }}件</li>
          </ol>
        </div>

        <section>
          <article class="mx-auto">
            <!-- サーチエリア -->
            <SeachArea></SeachArea>

            <br />

            <!-- 記事一覧 -->
            <ArticleArea :data="data"></ArticleArea>
          </article>

          <!-- ページネーション -->
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="current_page"
              :total-rows="data.count"
              :per-page="perPage"
              @change="pagination_change"
            ></b-pagination>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * component
 */
import Loading from "src/component/loading.vue";
import Sidebar from "src/component/chart/sidebar.vue";
import Navbar from "src/component/chart/nav.vue";
import SeachArea from "src/component/chart/search_area.vue";
import ArticleArea from "src/component/chart/article.vue";

/**
 * request
 */
import { get_request } from "src/util/do_request";

/**
 * 定数
 */
import { constant } from "src/constant";

export default {
  components: { Loading, Sidebar, Navbar, SeachArea, ArticleArea },
  props: ["display", "breadcrumb_itmes", "base_url", "current_page", "data"],
  data() {
    return {
      toggle: false,
      baseUrl: this.base_url,
      perPage: 10 // 1ページに10件表示
    };
  },
  methods: {
    /**
     * ジャンルボタンを押した時
     */
    setToggle() {
      this.toggle = !this.toggle;
    },

    /**
     * ページネーションを押した時
     */
    pagination_change(pageNum: string) {
      const _pageNum = Number(pageNum);
      if (_pageNum !== this.currentPage) {
        this.$router.push(`${this.$props.base_url}/${_pageNum}`, () => {});
      }
    }
  },

  /**
   * ページ遷移した時
   */
  watch: {
    async $route(to, from) {
      // スマホ用
      if (window.parent.screen.width < 500) {
        this.toggle = false;
      }
    }
  }
};
</script>

<style></style>
