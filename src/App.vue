<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test1的专栏，非常有意思，可以看一下",
  },
  {
    id: 2,
    title: "test2的专栏",
    // avatar:
    //   "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test2的专栏，非常有意思，可以看一下",
  },
  {
    id: 3,
    title: "test3的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test3的专栏，非常有意思，可以看一下",
  },
  {
    id: 4,
    title: "test4的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test4的专栏，非常有意思，可以看一下",
  },
];
const currentUser: UserProps = {
  isLogin: true,
  name: 'liuyunhe'
}
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
  },
  setup() {
    return {
      list: ref(testData),
      user: ref(currentUser),
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
