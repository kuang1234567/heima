<template>
  <div class="container">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-duration="1000"
      success-text="刷新成功"
      animation-duration="500"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in ArticleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem v-for="(item, index) in ArticleList"
          :key="index" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let scrolltop = 0
export default {
  name: 'ArticleList',
  created () {
    this.getArticleList()
  },
  mounted () {
    // $el获取组件渲染根元素
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrolltop = this.scrollTop
    })
  },
  activated () {
    this.$refs.pullrefresh.$el.scrollTop = scrolltop
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      ArticleList: [],
      isLoading: false
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      this.finished = false
      this.ArticleList = []
      this.timestamp = Date.now()
      this.getArticleList()
      this.isLoading = false
    },
    async getArticleList () {
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.ArticleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
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
/deep/.van-pull-refresh {
  overflow: auto;
  height: 100vh;
}
// .container {
//   overflow: auto;
//   height: calc (100vh - 27px);
// }
</style>
