<template>
  <v-dialog v-model="editDialog" max-width="600px" heigth="500px">
    <v-card>
      <v-card-title class="pa-0 ma-0">
        <v-toolbar card dark color="primary">
          <v-toolbar-title>設定ダイアログ</v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pa-0 ma-0">
        <v-container fluid>
          <v-form ref="form" lazy-validation>
            <v-layout align-baseline text-xs-center row wrap>
              <v-flex xs3>
                <span>アカウント名</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="user"
                  :input-value="accountDetail.username"
                  label="アカウント名を入力"
                  solo
                  @input="inputAccountName"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-baseline text-xs-center row wrap>
              <v-flex xs3>
                <span>アカウントID</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  :input-value="accountDetail.id"
                  label="アカウントIDを入力"
                  solo
                  @input="inputAccountID"
                  required
                />
              </v-flex>
              <v-flex xs3 class="ml-4">
                <v-select
                  :items="divList"
                  item-text="value"
                  item-value="id"
                  label="部署CD"
                  solo
                  :input-value="accountDetail.divCD"
                  @change="getDivListItem"
                />
              </v-flex>
            </v-layout>
            <v-layout align-baseline text-xs-right>
              <v-spacer />
              <v-btn icon @click="submit">
                <v-icon color="success">fas fa-user-plus</v-icon>
              </v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const rest = require("@/api/rest");

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    editType: {
      type: String,
      default: null
    }
  },
  data: () => ({
    editDialog: false,
    accountDetail: { id: "", username: "", divCD: "" },
    divList: []
  }),
  methods: {
    /** 送信ボタン押下時 */
    async submit() {
      if (this.$refs.form.validate()) {
        const result = await this.postDetail();
        if (result) {
          this.$emit("close");
        }
      }
    },

    /** xボタン押下時 */
    close() {
      this.$emit("close");
    },
    /** アカウント名の入力 */
    inputAccountName(value) {
      this.accountDetail.username = value;
    },
    /** アカウントIDの入力 */
    inputAccountID(value) {
      this.accountDetail.id = value;
    },
    /** 部署テーブルからリストを取得 */
    async getDivList() {
      const uri = "cmn/div/list";
      await rest.get(uri).then(res => {
        this.divList = res.data;
      });
    },
    /** 部署リスト選択 */
    getDivListItem(id) {
      this.accountDetail.divCD = id;
    },

    /** データの送信 */
    async postDetail() {
      try {
        const uri = "account/create";
        await rest.post(uri, this.accountDetail);
        return true;
      } catch (error) {
        alert("新規登録ができませんでした" + error);
        return false;
      }
    },
    openEditDialog() {}
  },
  watch: {
    dialog(val) {
      this.editDialog = !this.editDialog;
      this.accountDetail = {};
      if (val) {
        this.getDivList();
        this.$nextTick(() => this.$refs.user.focus());
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>