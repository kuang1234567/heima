<template>
  <div>
    <div class="channel-container">
      <h3>我的频道</h3>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        @click="inCloseShow = !inCloseShow"
        >{{ inCloseShow ? "完成" : "编辑" }}</van-button
      >
    </div>
    <van-row>
      <van-col
        span="6"
        class="inner"
        v-for="(item, index) in mychnnels"
        :key="index"
        :class="{ active: active === index }"
        @click="changeactive(index)"
        >{{ item.name
        }}<van-icon name="close" v-if="index !== 0" v-show="inCloseShow"
      /></van-col>
    </van-row>
    <div class="channel-container">
      <h3>频道推荐</h3>
    </div>
    <van-row>
      <van-col
        span="6"
        class="inner"
        v-for="(item, index) in recommendChnnels"
        :key="index"
        @click="add(item.id)"
        >+{{ item.name }}</van-col
      >
    </van-row>
  </div>
</template>

<script>
import { getAllChnnels, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'channelpanel',
  async created () {
    try {
      const res = await getAllChnnels()
      this.recommendChnnels = res.data.data.channels.filter(item => {
        return !this.mychnnels.find(channel => {
          return item.id === channel.id
        })
      })
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChnnels: [],
      inCloseShow: false
    }
  },
  props: {
    mychnnels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChnnels.findIndex(item => item.id === id)
      this.mychnnels.push(this.recommendChnnels[index])
      this.recommendChnnels.splice(index, 1)
    },
    changeactive (index) {
      if (!this.inCloseShow) {
        this.$emit('change-active', index)
      } else {
        // 删除
        if (index === 0) return
        const obj = this.mychnnels[index]
        this.mychnnels.splice(index, 1)
        this.recommendChnnels.push(obj)
        if (index < this.active) {
          this.$emit('del-active', this.active - 1)
        }
      }
    }
  },
  computed: {},
  watch: {
    mychnnels: {
      deep: true,
      async handler (newval) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newval.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newval)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px 24px;
  h3 {
    font-size: 32px;
    font-weight: normal;
    color: #333;
  }
  .van-button {
    width: 104px;
    height: 42px;
    border-radius: 20px;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: normal;
  color: #222222;
  text-align: center;
  line-height: 86px;
  margin-left: 22px;
  margin-bottom: 16px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 15px;
}
.active {
  color: red;
}
</style>
