<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in suggestlist"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="item ? highlight(item) : ''"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'suggest',
  created () { },
  data () {
    return {
      suggestlist: []
    }
  },
  props: {
    searchtext: {
      type: String,
      required: true
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchtext, 'gi')
      return str.replace(reg, `<span style="color:red"> ${this.searchtext} </span>`)
    }
  },
  computed: {},
  watch: {
    searchtext: {
      handler (newval) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newval)
            this.suggestlist = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 100)
      },
      immediate: true
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
