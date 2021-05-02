<template>
  <global-header :user="user"></global-header>
  <loader v-if="isLoading" text="拼命加载中..." background="rgba(0,0,0,0.8)"></loader>
  <div class="container">
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 者也专栏</li>
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
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalHeader from "./components/GlobalHeader.vue";

import { GlobalDataProps } from "./store";
import Loader from "./components/Loader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(()=>store.state.loading)
    return {
      user: currentUser,
      isLoading
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
