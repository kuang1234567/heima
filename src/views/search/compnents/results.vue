<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getResultList } from '@/api/search'
export default {
  created () {
    this.getResult()
  },
  data () {
    return {
      page: 1,
      loading: false,
      list: [],
      finished: false,
      refreshing: false
    }
  },
  props: {
    searchtext: {
      type: String,
      required: true
    }
  },
  methods: {
    async getResult () {
      try {
        const res = await getResultList({ page: this.page, per_page: 20, q: this.searchtext })
        if (res.data.data.results.length === 0) {
          this.finished = true
        } else {
          this.list.push(...res.data.data.results)
        }
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getResult()
      this.loading = false
      this.refreshing = false
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.list = []
      this.onLoad()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 104px);
}
</style>
