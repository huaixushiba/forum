import { createStore } from 'vuex'

export default createStore({
  state: {
    login:false,
    userInfo:{
      userName:'',
      userImg:'',
      account:''
    },
    typeList:{},
    contentLength:0,
    frzzy:'',
  },
  mutations: {
    ISLOGIN(state,data){
      state.userInfo=data
      state.login=true
    },
    CHANGEINFO(state,data){
      state.userInfo.userName=data.userName
      state.userInfo.userImg=data.userImg
    },
    CHANGETYPELIST(state,data){
      state.typeList = data
    },
    CHANGECONTENTLENGTH(state,data){
      state.contentLength = data
    },
    CHANGEFRZZY(state,data){
      state.frzzy = data
    }
  },
  actions: {
  },
  modules: {
  }
})
