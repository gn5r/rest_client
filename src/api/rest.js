const baseUrl = "http://127.0.0.1:8081/api";

//axiosをrequireしてインスタンスを生成
const axiosBase = require("axios");
const axios = axiosBase.create({
  baseURL: baseUrl, //バックエンドのURLを指定
  proxy: false,
  responseType: "json"
});

/**
 * getメソッド
 * @param {String} url
 */
export function get(url) {
  return new Promise(function (resolve, reject) {
    axios
      .get(url)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * postメソッド
 * @param {String} url
 * @param {json} data
 */
export function post(url, data) {
  return new Promise(function (resolve, reject) {
    axios
      .post(url, data)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * putメソッド
 * @param {String} url
 * @param {json} data
 */
export function put(url, data) {
  return new Promise(function (resolve, reject) {
    axios
      .put(url, data)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * deleteメソッド
 * @param {String} url
 */
export function del(url) {
  return new Promise(function (resolve, reject) {
    axios
      .delete(url)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
