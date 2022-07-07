<template>
  <header>
    <div class="w header_main">
      <div class="logo">
        <img :src="require('@/assets/423.gif')" alt="RainStorm" />
        <i class="red">R</i><i class="yellow">a</i><i class="green">i</i
        ><i class="blue">n</i><i class="snow">S</i><i class="violet">t</i
        ><i class="aquamarine">o</i><i class="gold">r</i
        ><i class="lavender">m</i>
      </div>
      <div class="header_search">
        <n-input round placeholder="请输入搜索内容" v-model:value='frzzy'>
        </n-input>
        <n-icon @click="handleSearch" style="cursor:pointer;margin-left:5px" size='26' color='red'>
              <Search />
        </n-icon>
      </div>
      <div class="header_right">
        <div class="header_button">
          <n-button text style="font-size: 24px;" @click="goHome">
            <n-icon><Home color='#fff'/></n-icon>
          </n-button>
          <n-button text style="font-size: 24px;">
              <n-icon><Chatbubble color='#fff'/></n-icon>
          </n-button>
        </div>
        <div class="header_person" v-show="isLogin">
          <n-dropdown :options="options">
            <n-button style="color:#fff"><span class="header_img">
              <img :src="userInfo.userImg" alt="">
              </span>{{userInfo.userName}}</n-button>
          </n-dropdown>
        </div>
        <div v-show="!isLogin">
          <n-button type="primary" style="margin-right:5px" @click="loginIn">登录</n-button>
          <n-button type="info" @click="registerIn">注册</n-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, defineComponent, h,ref } from "vue";
import { NIcon } from "naive-ui";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {removeStore} from '@/utils/storage.js'
import {
  Search,
  Home,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  Chatbubble
} from "@vicons/ionicons5";
export default defineComponent({
  components: {
    Search,
    Home,
    Chatbubble
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const userInfo = computed(()=>store.state.userInfo)
    const isLogin = computed(()=>store.state.login)
    const frzzy = ref('')
    const renderIcon = (icon) => {
      return () => {
        return h(NIcon, null, {
          default: () => h(icon),
        });
      };
    };
    const options = [
      {
        label: "用户资料",
        key: "person",
        icon: renderIcon(UserIcon),
        props: {
          onClick: () => {
            router.push('/personarea/')
          },
        },
      },
      {
        label: "退出登录",
        key: "logout",
        icon: renderIcon(LogoutIcon),
        props:{
          onClick:()=>{
            removeStore('userInfo')
            window.location.href = '/'
          }
        }
      },
    ];
    const handleSearch = ()=>{
      store.commit('CHANGEFRZZY',frzzy.value)
    }
    const goHome=()=>{
        router.push('/')
    }
    const loginIn=()=>{
      router.push('/login')
    }
    const registerIn = ()=>{
      router.push('/register')
    }
    return {
      options,
      goHome,
      userInfo,
      isLogin,
      loginIn,
      registerIn,
      handleSearch,
      frzzy
    };
  },
});
</script>
<style lang='less' scoped>
header {
  // background: #2C3E50;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #4CA1AF, #2C3E50);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #4CA1AF, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: #000428;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #000428, #2C3E50);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #000428, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 50px;
  .header_main {
    display: flex;
    justify-content: space-between;
    .logo {
      min-width: 220px;
      flex-basis: 200px;
      cursor: default;
      height: 50px;
      // text-align: center;
      font-size: 20px;
      line-height: 50px;
      letter-spacing: 5px;
      img {
        height: 50px;
        vertical-align: bottom;
      }
      .red {
        color: red;
      }
      .yellow {
        color: yellow;
      }
      .green {
        color: green;
      }
      .blue {
        color: blue;
      }
      .snow {
        color: snow;
      }
      .violet {
        color: violet;
      }
      .aquamarine {
        color: aquamarine;
      }
      .gold {
        color: gold;
      }
      .lavender {
        color: lavender;
      }
    }
    .header_search {
      margin-left: 20px;
      line-height: 50px;
      min-width: 180px;
      flex-basis: 180px;
      flex-grow: 3;
      display: flex;
      align-items: center;
    }
    .header_right {
      display: flex;
      flex-basis: 200px;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      line-height: 50px;
      .header_button {
          margin-right: 20px;
          margin-left: 10px;
          padding-top: 6px;
      }
      .header_person{
        margin-top: 7px;
          .header_img{
              height: 30px;
              width: 30px;
              border-radius: 50%;
              margin-right: 5px;
              img{
                height: 30px;
                width: 30px;
                border-radius: 50%;
              }
          }
      }
    }
  }
}
</style>