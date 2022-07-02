<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchtext"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3195fc"
        @focus="isresultshow = false"
      />
      <History v-if="searchtext === ''" @search="onSearch"></History>
      <template v-else>
        <Results v-if="isresultshow" :searchtext="searchtext"></Results>
        <Suggestions
          v-else
          :searchtext="searchtext"
          @search="onSearch"
        ></Suggestions>
      </template>
    </form>
  </div>
</template>

<script>
import History from './compnents/History.vue'
import Suggestions from './compnents/suggestions.vue'
import Results from './compnents/results.vue'
export default {
  created () { },
  data () {
    return {
      searchtext: '',
      isresultshow: false
    }
  },
  methods: {
    onSearch (val) {
      this.searchtext = val
      this.isresultshow = true
      this.$store.commit('sethistorylist', val)
    },
    onCancel () {
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    History,
    Suggestions,
    Results

  }
}
</script>

<style scoped lang='less'>
/deep/.van-search__action {
  color: #fff;
}
</style>
