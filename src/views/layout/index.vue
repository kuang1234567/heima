<template>
  <div>
    <keep-alive :included="['home']">
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"
        ><i slot="icon" class="toutiao toutiao-shouye"></i>首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="search"
        ><i slot="icon" class="toutiao toutiao-shipin"></i>视频</van-tabbar-item
      >
      <van-tabbar-item replace to="/question" icon="search"
        ><i slot="icon" class="toutiao toutiao-wenda"></i>问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="search"
        ><i slot="icon" class="toutiao toutiao-wode"></i>我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
