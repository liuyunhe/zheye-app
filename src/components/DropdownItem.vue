<template>
  <li
    class="dropdown-option"
    :class="{ 'is-disabled': disabled }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { emitter } from "./Dropdown.vue";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const handleClick = () => {
      if (!props.disabled) {
        emitter.emit("close-dropdown");
      }
    };
    return {
      handleClick,
    };
  },
});
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>