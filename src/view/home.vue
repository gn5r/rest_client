<template>
  <v-container fluid class="pa-0 ma-0" style="min-height:100%">
    <v-header></v-header>

    <v-layout justify-center align-content-center align-baseline row wrap>
      <v-spacer/>
      <v-flex text-xs-right>
        <v-btn icon @click.stop="openEditDialog('add')">
          <v-icon color="success">fas fa-user-plus</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card>
      <v-card-text>
        <v-layout justify-center column wrap>
          <v-flex class="my-2">
            <v-data-table
              :headers="headers"
              :items="details"
              :pagination.sync="pagination"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.username }}</td>
                <td class="text-xs-center">{{ props.item.modified | moment }}</td>
                <td class="text-xs-center">{{ props.item.divCD }}</td>
                <td class="text-xs-center">
                  <v-btn icon dark @click.stop="openEditDialog('edit')">
                    <v-icon color="primary">fas fa-edit</v-icon>
                  </v-btn>
                  <v-btn icon dark @click="deleteAccount(props.item.id)">
                    <v-icon color="error">fas fa-trash-alt</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
          <account-edit-dialog
            :dialog="this.editDialog"
            :editType="this.editType"
            @close="closeEditDialog"
          />
        </v-layout>
      </v-card-text>
    </v-card>
    <v2-footer class="v2-footer"/>
  </v-container>
</template>

<script>
const rest = require("@/api/rest");
const cmnMst = require("@/api/CmnMstRest");
import moment from "moment";
import VHeader from "@/components/VHeader";
import V2Footer from "@/components/V2Footer";
import AccountEditDialog from "@/dialog/AccountEditDialog";

export default {
  data: () => ({
    editDialog: false,
    editType: null,
    //ページング
    pagination: {},
    //APIからアカウント情報を格納
    details: [],
    //部署情報を格納
    divList: [],

    headers: [
      { text: "アカウントID", align: "center", value: "id" },
      {
        text: "アカウント名",
        align: "center",
        value: "name",
        sortable: false
      },
      {
        text: "更新日",
        align: "center",
        value: "modified",
        sortable: false
      },
      {
        text: "部署CD",
        align: "center",
        value: "divID",
        sortable: false
      },
      {
        text: "操作",
        align: "center",
        value: "edit",
        sortable: false
      }
    ]
  }),

  methods: {
    /** アカウント情報テーブルから全件を取得する */
    async getDetails() {
      const uri = "account/list";
      await rest.get(uri).then(res => {
        this.details = res.data;
      });
    },

    /** 部署テーブルから一覧を取得 */
    async getDivList() {
      this.divList = await cmnMst.getDivList();
    },

    /** 部署リストボックス選択時 */
    getSelectedDivListItem(id) {
      alert(id);
    },

    /** ダイアログを開く */
    openEditDialog(type) {
      this.editDialog = !this.editDialog;
      this.editType = type;
    },

    /** ダイアログが閉じたとき */
    async closeEditDialog() {
      this.editDialog = !this.editDialog;
      await this.getDetails();
    },

    /** 削除アイコンを押したとき */
    async deleteAccount(id) {
      if (!confirm("削除しますか？")) {
        return;
      }
      const uri = `account/delete/${id}`;
      await rest.del(uri);

      await this.getDetails();
    }
  },
  filters: {
    /**
     * 日付を yyyy/mm/dd HH:mm:ss 形式に変換する
     */
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
    }
  },
  components: {
    VHeader,
    V2Footer,
    AccountEditDialog
  },

  created() {
    this.getDivList();
    this.getDetails();
  },

  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>

<style scoped>
</style>