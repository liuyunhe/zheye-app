import { Commit, createStore } from "vuex";
import axios from 'axios'

interface ImageProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}
export interface Userprops {
  isLogin: boolean;
  name?: string;
  id?: number,
  columnId?: number   //  文章标识
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: Userprops,
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: true,
      name: 'liuyunhe',
      columnId: 1
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((clumn) => clumn._id === id)
    },
    getPostById: (state) => (columnId: string) => {
      return state.posts.filter((post) => post.column === columnId)
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'liuyunhe' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/columns','fetchColumns',commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`,'fetchColumn',commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`,'fetchPosts',commit)
    }
  }
})

export default store