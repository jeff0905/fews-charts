<template>
  <v-app id="inspire" class="login">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <img src="https://m.wolaidai.com/static/modules/app/images/v2/home/logo.png" style="
                position: absolute;
                top: 100px;
                left: 50px;
                z-index: 500;
            ">
            <div class="bg" id="bg"/>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary"  style="height:48px;">
                  <v-toolbar-title  style="height:48px;">全景监控</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="请输入用户名" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="请输入密码" id="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"
                    v-on:click="handleSubmit()"
                    :loading="loading"
                  >
                    登录
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>
<script>
import '@/$base/utils/partbg.js'
// import AccountService from '@/services/AccountService'
export default {
  name: 'login',
  data: () => ({
    username: '',
    password: '',
    loading: false
  }),
  mounted: function () {
    window.particleground(document.getElementById('bg'), {
      dotColor: '#5cbdaa',
      lineColor: '#5cbdaa'
    })
  },
  methods: {
    handleSubmit () {
      this.loading = true
      this.$router.push('/main/visual/smsPage3')
      // AccountService.login(this.username, this.password)
      //   .then(res => {
      //     this.$router.push('/main/indicator')
      //   })
    }
  }
}
</script>
<style lang="less">
@import './Login.less';
</style>
