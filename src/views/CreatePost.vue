<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { GlobalDataProps } from "@/store";
import { PostProps } from "@/testData";
import router from "@/router";

export default defineComponent({
  components: { ValidateForm, ValidateInput },
  name: "CreatePost",
  setup() {
    const store = useStore<GlobalDataProps>();

    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空!" },
    ];
    const titleVal = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章详情不能为空!" },
    ];
    const contentVal = ref("");

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId: +column,
            createdAt: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({ name: "column", params: { id: column } });
        }
      }
    };

    return {
      onFormSubmit,
      titleRules,
      titleVal,
      contentRules,
      contentVal,
    };
  },
});
</script>

<style scoped>
</style>