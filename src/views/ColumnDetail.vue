<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
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
    <div class="row">
      <button
        class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
        @click="loadMorePage"
        v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
import { ColumnProps, GlobalDataProps } from "../store";
import { generateFitUrl } from "@/helper";
import useLoadMore from "@/hooks/useLoadMore";

export default defineComponent({
  name: "ColumnDetail",
  components: { PostList },
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();

    const currentId = route.params.id as string;
    const total = computed(() =>
      store.state.posts.loadedColumns[currentId]
        ? (store.state.posts.loadedColumns[currentId].total as number)
        : 0
    );
    const currentPage = computed(() =>
      store.state.posts.loadedColumns[currentId]
        ? store.state.posts.loadedColumns[currentId].currentPage
        : 0
    );

    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", { cid: currentId, pageSize: 5 });
    });

    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(
        currentId
      ) as ColumnProps;
      if (selectColumn) {
        generateFitUrl(selectColumn, 100, 100);
      }
      return selectColumn;
    });
    const list = computed(() => store.getters.getPostById(currentId));

    const { loadMorePage, isLastPage } = useLoadMore("fetchPosts", total, {
      pageSize: 5,
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      cid: currentId,
    });
    return {
      column,
      list,
      loadMorePage,
      isLastPage,
    };
  },
});
</script>

<style scoped>
</style>