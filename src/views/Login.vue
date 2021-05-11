<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-1">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input
          type="text"
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
        ></validate-input>
      </div>
      <div class="mb-1">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input
          type="password"
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">提交</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import { GlobalDataProps } from "@/store";
import createMessage from "@/components/createMessage";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();

    const emailVal = ref("");
    const passwordVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空!" },
      { type: "email", message: "请输入正确的电子邮箱格式!" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    const onFormSubmit = (result: boolean) => {
      console.log("result", result);
      if (result) {
        const payLoad = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        store
          .dispatch("loginAndFetch", payLoad)
          .then(() => {
            createMessage("登录成功!2秒后跳转首页", "success");
            setTimeout(() => {
              router.push(`/`);
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style scoped>
</style>