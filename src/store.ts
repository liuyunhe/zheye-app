import { Commit, createStore } from "vuex";
import axios from 'axios'

interface ImageProps {
  _id?: string;
  url?: string;
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
  nickName?: string;
  _id?: string;
  column?: string;   //  文章标识
  email?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: Userprops;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// eslint-disable-next-line
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payLoad: any) => {
  const { data } = await axios.post(url, payLoad)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false,
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
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    fetchCurrentUser(state, rawData) {
      state.user = { ...rawData.data, isLogin: true }
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
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    login({ commit }, payLoad) {
      return postAndCommit('/user/login', 'login', commit, payLoad)
    },
    fetchCurrentUser({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },

  }
})

export default store