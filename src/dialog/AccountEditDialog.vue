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
                  :value="accountDetail.username"
                  @input="inputAccountName"
                  ref="user"
                  label="アカウント名を入力"
                  solo
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-baseline text-xs-center row wrap>
              <v-flex xs3>
                <span>アカウントID</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="accountID"
                  :value="accountDetail.id"
                  label="アカウントIDを入力"
                  solo
                  @input="inputAccountID"
                  :rules="requiredRule"
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
                  :value="accountDetail.divCD"
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
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    editDialog: false,
    accountDetail: { id: "", username: "", divCD: "" },
    divList: [],
    //必須入力ルール
    requiredRule: [v => !!v || `アカウントIDは必須です`]
  }),
  methods: {
    /** 送信ボタン押下時 */
    async submit() {
      if (this.$refs.form.validate()) {
        const result = await this.postDetail();
        if (result) {
          this.$emit("close");
        }
      } else {
        this.$nextTick(() => this.$refs.accountID.focus());
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
      this.divList = await rest.get(uri);
    },
    /** 部署リスト選択 */
    getDivListItem(id) {
      this.accountDetail.divCD = id;
    },

    /** アカウント情報を取得 */
    async getDetailById() {
      try {
        const uri = `account/details/${this.id}`;
        this.accountDetail = await rest.get(uri);
      } catch (err) {
        alert("アカウント情報を取得できませんでした" + err);
      }
    },

    /** データの送信 */
    async postDetail() {
      try {
        const uri = "account/create";
        const result = await rest.post(uri, this.accountDetail);
        if (result != null) return true;
        else return false;
      } catch (error) {
        alert("新規登録ができませんでした" + error);
        return false;
      }
    }
  },
  watch: {
    dialog(val) {
      this.accountDetail = {};
      this.editDialog = !this.editDialog;
      this.$nextTick(() => this.$refs.user.focus());
      if (val) {
        this.getDivList();
        if (this.editType == "edit") {
          this.getDetailById().then(() => {
            console.log(this.accountDetail);
          });
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>