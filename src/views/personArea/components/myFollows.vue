<template>
  <n-card title="我的关注" id="myspace" hoverable style="background-color: #F5F5F5;">
    <n-list>
      <n-list-item v-for="data in listData" :key='data.userName' v-show="listData.length">
        <template #suffix>
          <n-button @click="turnUser(data.userName,router,store)">查看</n-button>
        </template>
        <div>
          <ul>
            <li><p>{{data.userName}}</p></li>
            <li><img :src="data.userImg" alt="" class="userImg" /></li>
            <li>个人简介：{{data.briefing}}</li>
            <li>注册时间：{{ moment(data.createTime).format("YYYY-MM-DD HH:mm:ss") }}</li>
            <li>粉丝：{{data.beFollows.length}}</li>
          </ul>
        </div>
      </n-list-item>
      <div v-show="!listData.length">
        内容为空
      </div>
    </n-list>
  </n-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { defineComponent, onBeforeMount,ref } from "vue";
import { turnUser } from '@/utils/common'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore()
    const listData = ref([])
    const router = useRouter()
    const getFollowsData = ()=>{
      axios.post('/getFollows',{account:store.state.userInfo.account})
      .then(res=>{
        listData.value=res.data
        store.commit('CHANGECONTENTLENGTH',listData.value.length)
      })
    }
    onBeforeMount(()=>{
      getFollowsData()
    })
    return {
      listData,
      moment,
      turnUser,
      router,
      store
    };
  },
});
</script>
<style lang='less' scoped>
#myspace{
  .userImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>