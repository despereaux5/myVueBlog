<template>
      <div>
        <el-container>
             <!--头部图片-->
          <el-header>
            <router-link to="/blogs">
            <img src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png"
                              style="height: 60%; margin-top: 10px;">
            </router-link>
          </el-header>
             <!--主体内容-->
          <el-main>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                                      class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            /*定义校验规则*/
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                /*需要的数据*/
                ruleForm: {
                    password: '111111',
                    username: 'markerhub'
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {

                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交逻辑
                        this.$axios.post('/login', this.ruleForm).then((res)=>{
                            /*获取请求成功得到的token*/
                            console.log("this的含义：")
                            console.log(this)
                            console.log("_this的含义：")
                            console.log(_this)
                            const token = res.headers['authorization']
                            /*把数据共享出去*/
                            _this.$store.commit('SET_TOKEN', token)
                            _this.$store.commit('SET_USERINFO', res.data.data)
                            _this.$router.push("/blogs") /*转到blogs页面*/
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        /*刷新时显示*/
        mounted() {
            this.$notify({
                title: '亲：',
                message: '茫茫人世间，好巧遇到你!',
                duration: 1500
            });
        }
    }
</script>
