const rest = require("@/api/rest");

/**
 * 部署テーブルから一覧を取得
 * @param {String} uri
 * @returns {JSON} 部署List
 */
export async function getDivList() {
    const uri = "cmn/div/list"
    var data = [];
    await rest.get(uri).then(res => {
        data = res.data;
    });
    return data;
}
