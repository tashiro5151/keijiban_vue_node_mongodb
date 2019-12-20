<template>
  <div>
    <!-- ローディング画面 -->
    <Loading v-if="!display"></Loading>

    <div v-if="display">
      <!-- ヘッダー -->
      <header>
        <div class="d-flex justify-content-center">
          <a href="/">
            <img :src="img_path" class="img-fluid" alt="Responsive image" />
          </a>
        </div>
      </header>

      <nav aria-label="パンくずリスト">
        <ol class="breadcrumb mb-1">
          <li class="breadcrumb-item">
            <a href="/">ホーム</a>
          </li>
          <li class="breadcrumb-item">板</li>
          <li class="breadcrumb-item">{{ data.count }}件</li>
        </ol>
      </nav>

      <br />

      <div class="d-flex justify-content-center">
        <!-- 投稿するエリア -->
        <PostArea></PostArea>
      </div>

      <br />

      <section>
        <article class="mx-auto">
          <br />

          <!-- ページネーション -->
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="current_page"
              :total-rows="data.count"
              :per-page="perPage"
              @change="pagination_change"
            ></b-pagination>
          </div>

          <!-- 記事一覧 -->
          <ArticleArea :data="data"></ArticleArea>

          <!-- ページネーション -->
          <div
            v-if="data.count - ((current_page - 1) * perPage) > 30"
            class="d-flex justify-content-center"
          >
            <b-pagination
              v-model="current_page"
              :total-rows="data.count"
              :per-page="perPage"
              @change="pagination_change"
            ></b-pagination>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * component
 */
import PostArea from "src/component/board/post_area.vue";
import ArticleArea from "src/component/board/article.vue";
import Loading from "src/component/loading.vue";

/**
 * request
 */
import { get_request } from "src/util/do_request";

/**
 * 定数
 */
import { constant } from "src/constant";

export default {
  components: { Loading, PostArea, ArticleArea },
  data: function() {
    return {
      img_path: "/img/logo1.png",
      display: false,
      current_page: Number(this.$route.params.num),
      data: {
        list: [],
        count: 0
      },
      perPage: 100 // 1ページに100件表示
    };
  },

  /**
   * ページ遷移した時
   */
  watch: {
    async $route(to, from) {
      this.display = false;
      this.current_page = Number(this.$route.params.num);

      // apiたたく
      this.data = await get_request({
        url: `/talks/${this.$route.params.id}/${Number(this.$route.params.num) -
          1}`
      });
      this.display = true;
    }
  },
  async mounted() {
    // apiたたく
    this.data = await get_request({
      url: `/talks/${this.$route.params.id}/${Number(this.$route.params.num) -
        1}`
    });
    this.display = true;
  },
  methods: {
    /**
     * ページネーションが押された時
     */
    pagination_change(pageNum: string) {
      const _pageNum = Number(pageNum);
      if (_pageNum !== this.currentPage) {
        this.$router.push(
          `/talks/${this.$route.params.id}/${_pageNum}`,
          () => {}
        );
      }
    }
  }
};
</script>

<style></style>
