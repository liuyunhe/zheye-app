<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? "编辑文章" : "新建文章" }}</h4>
    <uploader
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="handleFileUploaded"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.url" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          type="text"
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          tag="textarea"
          rows="10"
          type="text"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章标题"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEditMode ? "更新文章" : "发表文章" }}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import { useStore } from "vuex";
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalDataProps, ResponseType, ImageProps, PostProps } from "@/store";
import Uploader from "@/components/Uploader.vue";
import { beforeUploadCheck } from "@/helper";
import createMessage from "@/components/createMessage";

export default defineComponent({
  components: { ValidateForm, ValidateInput, Uploader },
  name: "CreatePost",
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const router = useRouter();
    const isEditMode = !!route.query.id; // 判断是否是编辑模式
    const uploadedData = ref();

    const titleVal = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空!" },
    ];

    const contentVal = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章详情不能为空!" },
    ];
    //  上传前校验图片
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("上传图片只能是 JPG/PNG 格式!", "error");
      }
      if (error === "size") {
        createMessage("上传图片大小不能超过 1Mb", "error");
      }
      return passed;
    };
    //  从上传图片返回的数据中拿到图片的id
    let imageId = "";
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id;
      }
    };
    onMounted(() => {
      if (isEditMode) {
        store
          .dispatch("fetchPost", route.query.id)
          .then((rawData: ResponseType<PostProps>) => {
            const currentPost = rawData.data;
            if (currentPost.image) {
              uploadedData.value = currentPost.image;
            }
            titleVal.value = currentPost.title;
            contentVal.value = currentPost.content || "";
          });
      }
    });
    //  提交文章
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
          };
          if (imageId) {
            newPost.image = imageId;
          }
          const actionName = isEditMode ? "updatePost" : "createPost";
          const sendData = isEditMode
            ? {
                id: route.query.id,
                payLoad: newPost,
              }
            : newPost;

          store.dispatch(actionName, sendData).then(() => {
            createMessage(`${isEditMode ? '更新' : '发表'}成功，2秒后跳转到文章`, "success", 2000);
          });
          setTimeout(() => {
            router.push({ name: "column", params: { id: column } });
          }, 2000);
        }
      }
    };

    return {
      onFormSubmit,
      titleRules,
      titleVal,
      contentRules,
      contentVal,
      uploadCheck,
      handleFileUploaded,
      uploadedData,
      isEditMode,
    };
  },
});
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  min-width: 200px;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>