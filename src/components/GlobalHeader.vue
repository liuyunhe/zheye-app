<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul class="list-inline mb-0" v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link to="/signup" class="btn btn-outline-light my-2"
            >注册</router-link
          >
        </li>
      </ul>
      <ul class="list-inline mb-0" v-else>
        <li class="list-inline-item">
          <dropdown :title="`你好，${user.nickName}`">
            <dropdown-item
              ><router-link class="dropdown-item" to="/create"
                >新建文章</router-link
              ></dropdown-item
            >
            <dropdown-item
              ><router-link class="dropdown-item" :to="`/column/${columnId}`"
                >我的专栏</router-link
              ></dropdown-item
            >
            <dropdown-item disabled
              ><a class="dropdown-item" href="#">编辑资料</a></dropdown-item
            >
            <dropdown-item
              ><a class="dropdown-item" href="#">退出登录</a></dropdown-item
            >
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Userprops } from "@/store";
import { computed, defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";

export default defineComponent({
  name: "GlobalHeader",
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<Userprops>,
      required: true,
    },
  },
  setup(props) {
    const columnId = computed(() => props.user.column);
    return {
      columnId
    };
  },
});
</script>

<style scoped>
</style>