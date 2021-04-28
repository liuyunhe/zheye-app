<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside";
export default defineComponent({
  name: "dropdown",
  props: {
    title: {
      type: String,
      requried: true,
    },
  },
  setup() {
    const dropdownRef = ref<HTMLElement | null>(null);

    const data = reactive({
      isOpen: false,
      toggleOpen: () => {
        data.isOpen = !data.isOpen;
      },
    });

    const isClickOutside = useClickOutside(dropdownRef);
    watch(isClickOutside, () => {
      if (data.isOpen && isClickOutside.value) data.isOpen = false;
    });

    return {
      dropdownRef,
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
</style>