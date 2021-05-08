<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img
        :src="fitUrl"
        :alt="user.nickName"
        class="rounded-circle img-thumbnail"
      />
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="text-truncate text-muted d-block">{{
          user.description
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Userprops } from "@/store";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<Userprops>,
      required: true,
    },
  },
  setup(props) {
    const fitUrl = computed(() => {
      const { avatar } = props.user;
      return avatar
        ? avatar.url + "?x-oss-process=image/resize,m_pad,h_50,w_50"
        : require("../assets/avatar.jpg");
    });

    return {
      fitUrl,
    };
  },
});
</script>

<style>
.user-profile-component img {
  width: 50px;
  height: 50px;
  /* border: 1px solid #ccc;
  border-radius: 50px; */
}
</style>