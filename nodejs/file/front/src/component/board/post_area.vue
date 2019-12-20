<template>
  <div>
    <b-button type="button" variant="primary" v-b-modal.modal-1>投稿する</b-button>
    <b-modal id="modal-1" title="投稿する" ref="my-modal">
      <div class="form-group">
        <label for="FormControlSelect1">名前</label>
        <input class="form-control" placeholder="名前" maxlength="15" v-model="name" />
      </div>

      <div class="form-group">
        <label for="FormControlSelect1">投稿内容</label>
        <textarea
          class="form-control"
          rows="3"
          placeholder="150文字内"
          maxlength="150"
          v-model="message"
        ></textarea>
      </div>

      <template v-slot:modal-footer="{}">
        <b-button class="yes_button" variant="success" @click="modal_ok">
          <strong>投稿</strong>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { post_request } from "src/util/do_request";

export default {
  data() {
    return {
      name: "名無し",
      message: ""
    };
  },
  methods: {
    async modal_ok() {
      if (this.name.length === 0) {
        alert("名前を入力してください");
        return;
      }

      if (this.name.length > 15) {
        alert("名前は15文字以内です");
        return;
      }

      if (this.message.length === 0) {
        alert("メッセージを入力してください");
        return;
      }

      if (this.name.length > 150) {
        alert("メッセージは150文字以内です");
        return;
      }

      this.$refs["my-modal"].hide();

      // postリクエスト
      await post_request({
        url: "/talks",
        body: JSON.stringify({
          room_id: this.$route.params.id,
          name: this.name,
          message: this.message
        })
      });

      location.reload();
    }
  }
};
</script>

<style></style>
