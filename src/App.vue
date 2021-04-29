<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input
          type="text"
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
        ></validate-input>
      </div>
      <div class="mb-3">
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
import { defineComponent, reactive, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
import ValidateForm from "./components/ValidateForm.vue";
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test1的专栏，非常有意思，可以看一下",
  },
  {
    id: 2,
    title: "test2的专栏",
    // avatar:
    //   "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test2的专栏，非常有意思，可以看一下",
  },
  {
    id: 3,
    title: "test3的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test3的专栏，非常有意思，可以看一下",
  },
  {
    id: 4,
    title: "test4的专栏",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150",
    description: "这是test4的专栏，非常有意思，可以看一下",
  },
];
const currentUser: UserProps = {
  isLogin: true,
  name: "liuyunhe",
};
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailVal = ref("");
    const passwordVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    passwordVal.value = "123"
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }


    return {
      list: ref(testData),
      user: ref(currentUser),
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
