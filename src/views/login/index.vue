<template>
  <div>
    <van-nav-bar title="登录" @click-left='$router.back()'>
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确内容' },
        ]"
      >
      <MyIcon name='shouji' slot="left-icon"></MyIcon>
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="验证码"
        maxlength="6"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确内容' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            size="small"
            class="btn"
            native-type="button"
            v-else
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
import MyIcon from '@/components/MyIcon.vue'
export default {
  created () { },
  data () {
    return {
      mobile: '15170945455',
      code: '246810',
      time: 1000 * 5,
      isCountDown: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
      }
    },
    async sendSms () {
      try {
        await this.$refs.form.validate('mobile')
        console.log('校验通过')
        this.isCountDown = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机号不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    MyIcon
  }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.btn {
  position: fixed;
  right: 16px;
  width: 152px;
  height: 46px;
  line-height: 70px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  border: unset;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
