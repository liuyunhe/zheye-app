<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
        v-if="currentImageUrl"
      />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <!-- <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ name: 'create', query: { id: currentPost._id } }"
        >
          编辑
        </router-link>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div> -->
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import MarkdownIt from "markdown-it";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  GlobalDataProps,
  PostProps,
  ImageProps,
} from "../store";
import UserProfile from "../components/UserProfile.vue";

export default defineComponent({
  name: "post-detail",
  components: {
    UserProfile,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();
    const route = useRoute();

    const currentId = route.params.id;
    const md = new MarkdownIt();

    onMounted(() => {
      console.log(store.state.posts)
      store.dispatch("fetchPost", currentId);
    });

    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(currentId)
    );

    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && content) {
        return isHTML ? content : md.render(content)
      }else{
        return null
      }
    });
    
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (
          (image as ImageProps).url + "?x-oss-process=image/resize,w_850"
        );
      } else {
        return null;
      }
    });

    return {
      currentPost,
      currentImageUrl,
      currentHTML,
    };
  },
});
</script>

<style scoped>
</style>