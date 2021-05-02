import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testData";

interface Userprops {
  isLogin: boolean;
  name?: string;
  id?: number,
  columnId?: number   //  文章标识
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: Userprops,
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: 'liuyunhe',
      columnId: 1
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter((c) => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find((clumn) => clumn.id === id)
    },
    getPostById: (state) => (columnId: number) => {
      return state.posts.filter((post) => post.columnId === columnId)
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'liuyunhe' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  }
})

export default store