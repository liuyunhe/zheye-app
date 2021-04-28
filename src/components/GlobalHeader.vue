<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
     <a class="navbar-brand" href="#">者也专栏</a>
     <ul class="list-inline mb-0" v-if="!user.isLogin">
       <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登录</a></li>
       <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
     </ul>
     <ul class="list-inline mb-0" v-else>
       <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">你好，{{ user.name }}</a></li>
     </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
}

export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>