<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :posts="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { ColumnProps, testData, testPosts } from "../testData";
import PostList from "@/components/PostList.vue";

export default defineComponent({
  name: "ColumnDetail",
  components: { PostList },
  setup() {
    const route = useRoute();
    const currentId = +route.params.id;
    const column = testData.find(
      (item) => item.id === currentId
    ) as ColumnProps;
    const list = testPosts.filter((post) => post.columnId === currentId);
    return {
      column,
      list,
    };
  },
});
</script>

<style scoped>
</style>