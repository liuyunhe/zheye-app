<template>
  <div class="validate-input-container pb-3">
    <!-- <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updatedValue"
      v-bind="$attrs"
    /> -->
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, computed } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  inheritAttrs: false, //  禁用属性继承
  setup(props, context) {
    const inputRef = reactive({
      //  直接赋值modelValue
      val: computed({
        get:()=>{
          return props.modelValue || ''
        },
        set:val=>{
          context.emit("update:modelValue", val);
        }
      }),
      error: false,
      message: "",
    });

    //  手动执行v-model
    // watch(()=>props.modelValue, (newValue)=>{
    //   console.log('watch triggered')
    //   inputRef.val = newValue || ''
    // })

    // const updatedValue = (e: KeyboardEvent) => {
    //   const targetValue = (e.target as HTMLInputElement).value;
    //   inputRef.val = targetValue;
    //   context.emit("update:modelValue", targetValue);
    // };

    const validateInput = () => {
      if (props.rules) {
        // 验证所有规则
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });

    return {
      inputRef,
      validateInput,
      // updatedValue,
    };
  },
});
</script>

<style scoped>
</style>