<template>
  <div class="main">
    <van-nav-bar fixed>
      <template #title>
        <van-button type="default" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="chnnel.name" v-for="chnnel in mychnnels" :key="chnnel.id"
        ><ArticleList :id="chnnel.id"></ArticleList
      ></van-tab>
      <template #nav-right>
        <div class="hanburger-btn" @click="show = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="hanburger-btn1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
    >
      <ChannelPanel
        :mychnnels="mychnnels"
        :active="active"
        @change-active="changeactive"
        @del-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChnnels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  async created () {
    const channel = getItem(CHANNELS)
    if (!(this.$store.state.user && this.$store.state.user.token) && channel) {
      this.mychnnels = channel
    } else {
      try {
        const { data } = await getMyChnnels()
        this.mychnnels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return {
      active: 0,
      mychnnels: [],
      show: false
    }
  },
  methods: {
    changeactive (index) {
      this.active = index
      this.show = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__title {
  max-width: unset;
  .search-btn {
    border: 0;
    width: 555px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 32px;
    color: #fff;
  }
}
/deep/ .van-tab {
  width: 190px;
  height: 80px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  bottom: 34px;
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
/deep/ .van-tabs--line .van-tabs__wrap {
  height: 80px;
}
.hanburger-btn {
  position: fixed;
  right: 0;
  width: 66px;
  height: 82px;
  background-color: #ffffff;
  opacity: 0.8;
  text-align: center;
  .toutiao-gengduo {
    font-size: 33px;
    color: #333333;
  }
}
.hanburger-btn1 {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
/deep/.van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
}
/deep/.van-list {
  margin-top: 174px;
}
</style>
