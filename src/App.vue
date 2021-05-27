<template>
  <global-header :user="user" @reload="reload"></global-header>
  <loader
    v-if="isLoading"
    text="拼命加载中..."
    background="rgba(255,255,255,0.8)"
  ></loader>
  <!-- <message
    :type="'error'"
    :message="error.message"
    v-if="error.status"
  ></message> -->
  <div class="container">
    <router-view v-if="isRouterActive"></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6 mt-auto">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">
          © 者也专栏
        </li>
        <li class="list-inline-item">
          <a href="http://docs.vikingship.xyz/" target="_blank">文档</a>
        </li>
        <li class="list-inline-item">
          <a href="http://api.vikingship.xyz/" target="_blank">API 在线调试</a>
        </li>
        <li class="list-inline-item">
          <a href="http://showcase.vikingship.xyz/" target="_blank"
            >组件库演示</a
          >
        </li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalDataProps } from "./store";
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import createMessage from "./components/createMessage";
// import Message from "./components/Message.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
    // Message,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    const isRouterActive = ref(true)
    const reload = () => {
      isRouterActive.value = false
      nextTick(()=>{
        isRouterActive.value = true
      })
    }

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    return {
      user: currentUser,
      isLoading,
      error,
      reload,
      isRouterActive
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
