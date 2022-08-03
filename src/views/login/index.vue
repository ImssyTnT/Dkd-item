<template>
  <div class="login-container">
    <div class="login">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <!-- 帝可得logo 图片 -->
        <div class="title-container">
          <img src="~@/assets/login_images/logo.png" alt="" class="logo" />
        </div>
        <!-- 用户名 -->
        <el-form-item prop="loginName">
          <span class="svg-container">
            <i class="el-icon-mobile-phone" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.loginName"
            placeholder="请输入账号"
            name="username"
            type="text"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
          />
          <span class="show-pwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="authcode">
          <span class="svg-container">
            <i class="el-icon-mobile-phone" />
          </span>
          <el-input
            ref="authcode"
            v-model="loginForm.code"
            placeholder="请输入验证码"
            name="authcode"
            type="text"
          />
          <div class="authimg" @click="imgChange">
            <img :src="ruleImg" alt="" />
          </div>
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="userLogin"
          :loading="loading"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapLoginActions, mapState: mapLoginState } =
  createNamespacedHelpers('user')
export default {
  name: 'Login',
  data() {
    return {
      // 表单双向绑定数据
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0,
      },
      // 表单校验规则
      loginRules: {
        loginName: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            trigger: 'blur',
            message:
              '用户名格式不正确,用户名包含数字、字母、特殊字符并且不少于4位不超过16位',
          },
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        code: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
          {
            pattern: /^[a-zA-Z0-9]{4}$/,
            trigger: 'blur',
            message: '验证码格式不正确',
          },
        ],
      },
      ruleImg: '',
      loading: false,
      passwordType: 'password',
    }
  },
  created() {
    this.getImg()
  },
  watch: {
    // 监听图片变化就更换
    img() {
      this.ruleImg = this.img
    },
    // 监听获取图片请求的随机数
    imgCode() {
      this.loginForm.clientToken = this.imgCode
    },
  },
  methods: {
    ...mapLoginActions(['getImg', 'login']),
    // 点击验证码更换验证码图片
    imgChange() {
      this.getImg()
    },
    // 用户登录功能
    async userLogin() {
      try {
        // 点击登录后校验表单
        await this.$refs.loginForm.validate()
        // 点击后进入加载状态
        this.loading = true
        // 发起登录请求
        await this.login(this.loginForm)
        // 提示信息
        this.$message.success('登录成功')
        // 提示信息展示后退出加载状态
        this.loading = false
        if (this.token) {
          this.$router.push('/')
        }
      } catch (error) {}
    },
  },
  computed: {
    ...mapLoginState(['img', 'imgCode', 'token']),
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url('~@/assets/login_images/background.png') no-repeat 0 0 / cover;

  .el-form-item__content {
    display: flex;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #999;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login {
    position: relative;
    padding: 76px 35px 0;
    width: 518px;
    height: 388px;
    background-color: #fff;
    border-radius: 10px;
  }

  .authcode {
    .authimg {
      height: 52px;
      img {
        height: 100%;
      }
    }
  }

  .el-button {
    width: 448px;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
  }

  .login-form {
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }

  .title-container {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 96px;
    height: 96px;
    .logo {
      width: 100%;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
