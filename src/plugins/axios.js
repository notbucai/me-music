import axios from 'axios';
import Vue from 'vue';


const ROOT = "http://api.ncgame.cc/music/";

var HTTP = axios.create({
  timeout: 1000,
  responseType: 'json',
  baseURL: ROOT
});

HTTP.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  console.log("拦截")
  console.log(config)  //单次请求的配置信息对象
  return config;  //只有return config后，才能成功发送请求
}, function (error) {
  //请求错误时做些事
  return Promise.reject(error);
});

HTTP.interceptors.response.use(function (data) {
  console.log("response")
  console.log(data)  //响应数据
  return data;   //只有return data后才能完成响应
});

const $get = async function (url) {
  const res = [];
  try {
    res[0] = await HTTP.get(url);
  } catch (error) {
    res[1] = error;
  }
  return res;
};

const $post = async function (url, data) {
  const res = [];
  try {
    res[0] = await HTTP.post(url, data);
  } catch (error) {
    res[1] = error;
  }
  return res;
};

Vue.prototype.$get = $get;
Vue.prototype.$post = $post;