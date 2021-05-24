<template>
  <div class="update-profile-page w-690">
    <ul class="nav nav-tabs my-4">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ active: nav === 1 }"
          @click="nav = 1"
        >
          更新个人资料
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link"
          :class="{ active: nav === 2 }"
          @click="nav = 2"
        >
          更新专栏信息
        </a>
      </li>
    </ul>

    <template v-if="nav == 1">
      <h4>编辑个人资料</h4>
      <uploader
        action="/upload"
        class="d-flex align-items-center justify-content-center text-secondary w-100 my-4"
        :beforeUpload="uploadCheck"
        :uploaded="uploadedData1"
        @file-uploaded="
          (rawData) => {
            handleFileUploaded(rawData, 'img1Id');
          }
        "
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
            <img class="circle" :src="dataProps.uploadedData.url" />
            <h3>点击重新上传</h3>
          </div>
        </template>
      </uploader>
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <validate-input
            type="text"
            :rules="nickNameRules"
            v-model="nickName"
            placeholder="请输入文章标题"
          ></validate-input>
        </div>
        <div class="mb-3">
          <validate-input
            tag="textarea"
            rows="5"
            type="text"
            :rules="descriptionRules1"
            v-model="description1"
            placeholder="请输入文章标题"
          ></validate-input>
        </div>
        <template #submit>
          <button class="btn btn-primary btn-large">提交修改</button>
        </template>
      </validate-form>
    </template>

    <template v-if="nav == 2">
      <h4>编辑专栏信息</h4>
      <uploader
        action="/upload"
        class="d-flex align-items-center justify-content-center text-secondary w-100 my-4"
        :beforeUpload="uploadCheck"
        :uploaded="uploadedData2"
        @file-uploaded="
          (rawData) => {
            handleFileUploaded(rawData, 'img2Id');
          }
        "
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
            <img class="circle" :src="dataProps.uploadedData.url" />
            <h3>点击重新上传</h3>
          </div>
        </template>
      </uploader>
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <validate-input
            type="text"
            :rules="titleRules"
            v-model="title"
            placeholder="请输入标题"
          ></validate-input>
        </div>
        <div class="mb-3">
          <validate-input
            tag="textarea"
            rows="5"
            type="text"
            :rules="description2Rules"
            v-model="description2"
            placeholder="请输入文章标题"
          ></validate-input>
        </div>
        <template #submit>
          <button class="btn btn-primary btn-large">提交修改</button>
        </template>
      </validate-form>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ResponseType, ImageProps, GlobalDataProps } from "@/store";
import Uploader from "@/components/Uploader.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import { beforeUploadCheck } from "@/helper";
import createMessage from "@/components/createMessage";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Uploader,
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const nav = ref(1);

    const uploadedData1 = ref();
    let img1Id = store.state.user.avatar ? store.state.user.avatar._id : "";
    const nickName = ref(store.state.user.nickName);
    const nickNameRules: RulesProp = [
      { type: "required", message: "昵称不能为空!" },
    ];
    const description1 = ref(store.state.user.description);
    const descriptionRules1: RulesProp = [
      { type: "required", message: "个人详情不能为空!" },
    ];

    const uploadedData2 = ref();
    const title = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "昵称不能为空!" },
    ];
    const description2 = ref("");
    const description2Rules: RulesProp = [
      { type: "required", message: "详情不能为空!" },
    ];
    let img2Id = "";

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

    const handleFileUploaded = (
      rawData: ResponseType<ImageProps>,
      prop: string
    ) => {
      if (rawData.data._id) {
        if (prop === "img1Id") {
          img1Id = rawData.data._id;
          console.log(img1Id);
        } else {
          img2Id = rawData.data._id;
          console.log(img2Id);
        }
      }
    };
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { _id } = store.state.user;
        const actionName = nav.value == 1 ? "updateUser" : "updateColum";

        const params =
          nav.value == 1
            ? {
                id: _id,
                payLoad: {
                  description: description1.value,
                  nickName: nickName.value,
                  _id: img1Id,
                },
              }
            : {
                id: store.state.user.column,
                payLoad: {
                  description: description2.value,
                  title: title.value,
                  _id: store.state.user.column,
                  avatar: img2Id,
                },
              };

        store.dispatch(actionName, params).then(() => {
          createMessage("更新成功，2秒后跳转到首页", "success", 2000);
        });
      }
    };
    onMounted(() => {
      uploadedData1.value = store.state.user.avatar;
      const column = store.state.columns.data[store.state.user.column as string];
      if (column) {
        title.value = column.title;
        description2.value = column.description;
        uploadedData2.value = column.avatar;
        img2Id = column.avatar?._id as string;
      } else {
        store.dispatch("fetchColumn", store.state.user.column).then((res) => {
          title.value = res.data.title;
          description2.value = res.data.description;
          uploadedData2.value = res.data.avatar;
          img2Id = res.data.avatar._id;
        });
      }
    });

    return {
      nav,
      uploadCheck,
      handleFileUploaded,
      onFormSubmit,
      uploadedData1,
      nickName,
      nickNameRules,
      description1,
      descriptionRules1,
      uploadedData2,
      title,
      titleRules,
      description2,
      description2Rules,
    };
  },
});
</script>

<style>
.update-profile-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.update-profile-page .file-upload-container img {
  width: 200px;
  height: 200px;
  border-radius: 200px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #efefef;
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
.w-690 {
  width: 690px;
  margin: 0 auto;
}
</style>