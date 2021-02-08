<template>
  <div class="login-interface">
    <div class="logo-title"></div>
    <div class="login-panel">
      <div class="title">用户登录</div>
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item prop="username">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input v-model="form.password" placeholder="请输入密码" type="password" />
        </a-form-model-item>
        <!-- <a-form-model-item prop="captcha">
          <a-row>
            <a-col :span="8">
              <a-input v-model="form.captcha" placeholder="验证码"></a-input>
            </a-col>
            <a-col :span="8" class="captcha">
              <img :src="captchaImg" />
            </a-col>
            <a-col :span="8">
              <a-button type="link" @click="loadCaptcha">换一张</a-button>
            </a-col>
          </a-row>
        </a-form-model-item> -->
      </a-form-model>
      <a-button :loading="loading" size="large" type="primary" @click="login()">登录</a-button>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils/utils';
import md5 from 'md5';
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      captchaImg: '',
      loading: false,
      rules: {
        username: [{ required: true, message: '登录账号不允许为空!', trigger: 'change' }],
        password: [{ required: true, message: '密码不允许为空!', trigger: 'change' }]
      }
    };
  },
  methods: {
    login() {
      if (this.loading) return;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          document.cookie = '';
          this.loading = true;
          this.$api
            .login({
              username: this.form.username,
              password: md5(this.form.password)
            })
            .then(userInfo => {
              this.$store.commit('setUserInfo', {
                userInfo: userInfo.user
              });
              this.$router.push({ name: 'pointGoods' });
              this.loading = false;
            })
            .catch(e => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-interface {
  min-width: 1366px;
  .logo-title {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 88px;
    font-size: 38px;
    font-family: PingFangTC-Semibold, PingFangTC;
    font-weight: 600;
    color: #ffffff;
    line-height: 53px;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    p {
      height: 24px;
      font-size: 20px;
      font-family: SFUIText-Light, SFUIText;
      font-weight: 300;
      color: #ffffff;
      letter-spacing: 5px;
    }
  }
}

.login {
  &-interface {
    position: relative;
    width: 100%;
    height: 100%;
    /* background-color: #fff;
    background-image: url(../assets/login-illustration.png),
      url(../assets/login-bg.png);
    background-size: 46% auto, auto 100%;
    background-position: 10% 50%, top right; */
    background-color: #fff;
    background-image: url('../assets/mlf_login-illustration.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &-panel {
    position: absolute;
    top: 50%;
    right: 170px;
    transform: translateY(-50%);
    width: 400px;
    height: 400px;
    padding: 45px 60px 67px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(211, 225, 255, 0.66);
    border-radius: 4px;
    .title {
      font-size: 24px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 33px;
      margin-bottom: 34px;
    }
    .ant-input {
      height: 38px;
      margin-top: 0;
    }
    .ant-form-item {
      margin-bottom: 18px;
    }
    .ant-btn-primary {
      width: 100%;
      margin-top: 13px;
    }
    .captcha {
      text-align: center;
      img {
        display: inline-block;
        width: 64px;
        height: 38px;
      }
    }
  }
}
.copyright_info {
  text-align: center;
  position: fixed;
  bottom: 26px;
  width: 100%;
  color: #fff;
  p {
    margin: 0;
  }
  span {
    margin: 0 20px 0 0;
    a {
      color: #fff;
    }
  }
}
</style>
