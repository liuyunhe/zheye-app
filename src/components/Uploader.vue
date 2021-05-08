<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary" disabled>上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { ImageProps } from "@/store";
import axios from "axios";
import { defineComponent, PropType, ref, watch } from "vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
    uploaded: {
      type: Object,
    },
  },
  inheritAttrs: false,
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    console.log(props.uploaded);
    const fileInput = ref<HTMLInputElement | null>(null);
    const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready");
    const uploadedData = ref<ImageProps | null>(props.uploaded ? props.uploaded : null);

    watch(
      () => props.uploaded,
      (newValue) => {
        if (newValue) {
          fileStatus.value = 'success'
          uploadedData.value = newValue
        }
      }
    );

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
            return;
          }
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.action, formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            fileStatus.value = "success";
            uploadedData.value = res.data.data;
            context.emit("file-uploaded", res.data);
          })
          .catch((error) => {
            fileStatus.value = "error";
            context.emit("file-uploaded-error", { error });
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };

    return {
      fileStatus,
      fileInput,
      triggerUpload,
      handleFileChange,
      uploadedData,
    };
  },
});
</script>

<style scoped>
</style>