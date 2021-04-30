<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";


const currentUser: UserProps = {
  isLogin: false,
  name: "liuyunhe",
};
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
  },
  setup() {
    return {
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
  color: #2c3e50;
}
</style>
