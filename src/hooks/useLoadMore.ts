import { ComputedRef, ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

interface LoadParams {
  currentPage: number
  pageSize: number
  cid?: string
}

// eslint-disable-next-line
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize,
    cid: params.cid
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
