<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type validateFunc = () => boolean

export const emitter = mitt()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: (validateFunc | undefined)[] = []
    const submitForm = () => {
      const result = funcArr
        .map((func) => (func as validateFunc)())
        .every((result) => result)
      context.emit('form-submit', result)
    }
    const callback = (func: validateFunc | undefined) => {
      funcArr.push(func)
    }

    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style scoped></style>
