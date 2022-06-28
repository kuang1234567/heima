<template>
  <div>
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <button class="right">编辑资料</button>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="文字">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字"
        ><template #icon> <i class="toutiao toutiao-lishi"></i> </template
      ></van-grid-item>
    </van-grid>
    <van-grid class="grid">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-grid>
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgba(51, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
    }
    p {
      margin-top: 15px;
      font-size: 28px;
      color: #ffff;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 32px;
    padding-right: 33px;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .right {
      border: unset;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
      text-align: center;
      line-height: 33px;
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
    }
  }
  .list {
    display: flex;
    margin-top: 55px;
    li {
      flex: 1;
      text-align: center;
      p {
        &:nth-child(1) {
          font-size: 36px;
          color: #ffffff;
        }
        &:nth-child(2) {
          font-size: 23px;
          color: #ffffff;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.logout {
  color: #d86262;
}
.grid {
  margin: 9px 0;
}
</style>
