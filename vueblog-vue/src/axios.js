import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

/*
设置基础的url，统一的前缀，方便修改
 */
axios.defaults.baseURL="http://localhost:8089"

/*增加前置拦截
* 可以统一为所有需要权限的请求装配上header的token信息，
* 这样不需要在使用是再配置，
* 这个项目比较小，所以，还是免了吧~
* */
axios.interceptors.request.use(config=>{
    console.log("前置拦截")
    // 可以统一设置请求头
    return config
})

/*增加后置拦截*/
axios.interceptors.response.use(response=>{
    let res = response.data;
    console.log("后置拦截，处理返回值")
    console.log(res)
    // 1.请求成功返回内容，当结果的code是否为200的情况，直接返回结果
    if (res.code==200){
        return response
    }else{
        Element.Message.error("亲，密码输入错误",{duration:3*1000})
        // 直接拒绝往下面返回结果信息
        return Promise.reject(response.data.msg)
    }
},
    // 2.请求失败，比如直接抛出异常，这里是断言提示错误
    error => {
        console.log('err' + error)// for debug
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        // 根据请求状态觉得是否登录或者提示其他
        if (error.response.status === 401) {
            store.commit('REMOVE_INFO');
            router.push({
                path: '/login'
            });
            error.message = '请重新登录';
        }
        if (error.response.status === 403) {
            error.message = '权限不足，无法访问';
        }
        Element.Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
})