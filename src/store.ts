import { arrToObj, objToArr } from './helper';
import { Commit, createStore } from "vuex";
import axios, { AxiosRequestConfig } from 'axios'

interface ListProps<P> {
  [id: string]: P
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;         //  文章识别标识
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | Userprops;
  isHTML?: boolean;
}
export interface PostProps1 {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  column: string;
  author?: string;
  isHTML?: boolean;
}
export interface Userprops {
  isLogin: boolean;
  nickName?: string;
  _id?: string;        //  用户识别标识
  column?: string;     //  所著文章标识
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface ResponseType<T> {
  code: number;
  msg: string;
  data: T
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: { data: ListProps<ColumnProps>, isLoaded: boolean, total: number };
  posts: { data: ListProps<PostProps>, loadedColumns: string[] };
  user: Userprops;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
// eslint-disable-next-line
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payLoad: any) => {
  const { data } = await axios.post(url, payLoad)
  commit(mutationName, data)
  return data
}
// eslint-disable-next-line
const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'GET' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }

  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, isLoaded: false, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: {
      isLogin: false,
    }
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostById: (state) => (columnId: string) => {
      return objToArr(state.posts.data).filter((post) => post.column === columnId)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  },
  mutations: {
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser(state, rawData) {
      state.user = { ...rawData.data, isLogin: true }
    },
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost
      state.posts.loadedColumns.push()
    },
    fetchColumns(state, rawData) {
      const { data } = state.columns
      const { list, count } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        isLoaded: true
      }
    },
    fetchColumn(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost(state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data
      console.log(state.posts)
    },
    deletePost(state, { data }) {
      delete state.posts.data[data._id]
    },
    updatePost(state, { data }) {
      state.posts.data[data._id] = data
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
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchColumns({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      // if (!state.columns.isLoaded) {
      //   return getAndCommit('/columns', 'fetchColumns', commit)
      // }
      return getAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'GET' }, cid)
      }
    },
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    updatePost({ commit }, { id, payLoad }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, { method: 'PATCH', data: payLoad })
    },
    createPost({ commit }, payLoad) {
      return postAndCommit(`/posts`, 'createPost', commit, payLoad)
    },
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'DELETE' })
    },

  }
})

export default store