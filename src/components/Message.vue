<template>
  <teleport to="#message">
    <div
      class="alert alert-dismissible fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";

export type MessageType = "success" | "error" | "default";
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  setup(props, context) {
    const isVisible = ref(true);
    const hide = () => {
      isVisible.value = false;
      context.emit("close-message", true);
    };
    const classObject = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default",
    };

    useDOMCreate("message");
    return {
      hide,
      isVisible,
      classObject,
    };
  },
});
</script>

<style scoped>
</style>