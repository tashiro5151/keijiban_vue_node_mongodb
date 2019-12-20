<template>
  <div>
    <b-navbar type="light">
      <b-navbar-toggle id="basic-navbar-nav" target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <b-button type="button" class="btn btn-success" v-b-modal.modal-1>板をつくる</b-button>

            <!-- モーダル -->
            <b-modal id="modal-1" title="板をつくる" ref="my-modal">
              <div class="form-group">
                <label for="FormControlSelect1">板名</label>
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="50文字内"
                  maxlength="50"
                  v-model="room_name"
                ></textarea>

                <div class="form-group">
                  <label for="FormControlSelect1">ジャンル</label>
                  <select class="form-control" id="FormControlSelect1" v-model="genre_id">
                    <template v-for="(value, index) in genre">
                      <option v-bind:key="index" :value="index">{{ value }}</option>
                    </template>
                  </select>
                </div>
              </div>

              <template v-slot:modal-footer="{}">
                <b-button class="yes_button" variant="success" @click="modal_ok">
                  <strong>作成</strong>
                </b-button>
              </template>
            </b-modal>
          </li>
        </ul>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
/**
 * component
 */
import { constant } from "src/constant";
import { post_request } from "src/util/do_request";

export default {
  data() {
    return {
      genre: constant.GENRE,
      room_name: "",
      genre_id: 0
    };
  },
  methods: {
    async modal_ok() {
      if (this.room_name.length === 0) {
        alert("板名を入力してください");
        return;
      }

      if (this.room_name.length > 50) {
        alert("板名は50文字までです");
        return;
      }

      // モーダルを隠す
      this.$refs["my-modal"].hide();

      const _name = this.room_name;
      this.room_name = "";

      const _ret = await post_request({
        url: "/rooms",
        body: JSON.stringify({
          name: _name,
          genreId: Number(this.genre_id)
        })
      });

      _ret !== undefined
        ? this.$router.push(`/talks/${_ret["id"]}/1`, () => {})
        : "";
    }
  }
};
</script>

<style></style>