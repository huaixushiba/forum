<template>
  <div class="w" id="singlePerson">
    <div class="up">
      <span class="userImg">
        <img :src="userData.userImg" alt="" />
      </span>
      <n-button color="#8a2be2" class="followBtn" @click="handleFollow" :disabled='flag'>关注</n-button>
      <div class="line"></div>
      <p>{{ userData.userName }}</p>
      <p>{{ userData.briefing }}</p>
    </div>
    <div class="middle">
      <div>关注量：{{ userData.beFollows?.length }}</div>
      <div>点赞量：{{likesNumber}}</div>
      <div>创作量：{{allContentLength}}</div>
    </div>
    <div class="down">
      <n-list>
        <n-list-item
          v-for="content in contentData"
          :key="content.title"
          class="list_item"
        >
          <n-thing @click="turnContent(content.contentId)">
            <template #header
              ><span style="font-weight: 900">{{
                content.title
              }}</span></template
            >
            <template #header-extra
              ><span style="color: #6950a1">{{
                content.addUser
              }}</span></template
            >
            <template #description
              ><span style="font-weight: 600; color: #2a5caa">{{
                contentType[content.contentType]
              }}</span></template
            >
            <div
              v-html="content.data"
              style="overflow: hidden; max-width: 840px"
            ></div>
            <span style="color: #ccc"
              >{{ moment(content.addTime).format("YYYY-MM-DD HH:mm:ss") }}
              <span style="color: red; margin-left: 30px"
                ><HeartOutline style="height: 20px; vertical-align: middle" />
                {{ content.likes }}</span
              >
              <span style="margin-left: 20px; color: green">
                <Trash style="height: 20px; vertical-align: middle" />
                {{ content.collectionUsers.length }}
              </span>
            </span>
          </n-thing>
        </n-list-item>
        <template #footer>
          <n-pagination
            v-model:page="page"
            v-model:page-size="pageSize"
            :on-update:page="changePage"
            :on-update:page-size="changePageSize"
            :page-count="pageCount"
            show-size-picker
            :page-sizes="[
              { label: '10条/页', value: 10 },
              { label: '20条/页', value: 20 },
              { label: '30条/页', value: 30 },
              { label: '40条/页', value: 40 },
            ]"
          />
        </template>
      </n-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";
import axios from "axios";
import moment from "moment";
import { useRoute,useRouter } from "vue-router";
import { HeartOutline,Trash } from "@vicons/ionicons5";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
export default defineComponent({
  components:{
    HeartOutline,Trash
  },
  setup() {
    const route = useRoute();
    const userData = ref({});
    const page = ref(1); //当前页数
    const pageCount = ref(0); //总页数
    const pageSize = ref(10); //每页文章数量
    const allContentLength = ref(0); //总文章数量
    const store = useStore()
    const message = useMessage()
    const likesNumber = ref(0) //总点赞量
    const router = useRouter()
    const flag = ref(false)
    const contentData = ref([]);
    const contentType = ref({
      1: "技术交流",
      2: "八卦趣事",
      3: "重要信息",
      4: "日常聊天",
    }); //文章类型
    /**
     * 获取个人数据
     */
    const getSinglePer = () => {
      axios
        .get(`/getOtherPer?userName=${route.params.username}`)
        .then((res) => {
          userData.value = res.data;
          res.data.beFollows.map(item=>{
            if(item.account == store.state.userInfo.account){
              flag.value=true
            }
          })
        });
    };
    /**
     *获取个人文章
     */
    const getPerContent = () => {
      axios
        .post(`/getPerContents?page=${page.value}&size=${pageSize.value}`, {
          userName: route.params.username,
        })
        .then((res) => {
          contentData.value = res.data[0];
          contentData.value.map(item=>{
            likesNumber.value += item.likes
          })
          allContentLength.value = res.data[1];
          pageCount.value =
            Math.ceil(allContentLength.value / pageSize.value) === 0
              ? 1
              : Math.ceil(allContentLength.value / pageSize.value);
        });
    };
    /**
      关注
     */
    const handleFollow = ()=>{
      if(store.state.userInfo.account){
        let body = {
          myAccount : store.state.userInfo.account,
          addAccount : userData.value.account
        }
        axios.post('/addFollows',body)
        .then(res=>{
          if(res.data=='success'){
            message.success('关注成功')
            getSinglePer();
          }else{
            message.error('关注失败')
          }
        })
      }else{
        message.error('请登录后再关注')
        router.push('/login')
      }
    }
    /**
     * 切换页面
     * @pageNumber 点击的页数
     */
    const changePage = (pageNumber) => {
      page.value = pageNumber;
      getPerContent();
    };
    /**
     * 切换每页条数
     * @pageSizeNumber 每页文章数
     */
    const changePageSize = (pageSizeNumber) => {
      pageSize.value = pageSizeNumber;
      pageCount.value =
        Math.ceil(allContentLength.value / pageSize.value) === 0
          ? 1
          : Math.ceil(allContentLength.value / pageSize.value);
      getPerContent();
    };
    const turnContent=(contentId)=>{
      router.push({
         path: `/singlecontent/${contentId}`
      })
    }
    /**
     * 初始化数据
     */
    onBeforeMount(async () => {
      await getSinglePer();
      await getPerContent();
    });
    return {
      userData,
      changePage,
      changePageSize,
      page,
      pageCount,
      pageSize,
      contentData,
      contentType,
      moment,
      turnContent,
      allContentLength,
      likesNumber,
      handleFollow,
      flag
    };
  },
});
</script>
<style lang='less' scoped>
#singlePerson {
  margin-top: 20px;
  .up {
    text-align: center;
    position: relative;
    .line {
      width: 100%;
      height: 5px;
      background-image: linear-gradient(160deg, #00ffd5 20%, #008cff 80%);
      position: absolute;
      top: 60px;
      z-index: 1;
    }
    .followBtn{
      position: absolute;
      top: 10px;
      right: 40px;
    }
    .userImg {
      display: inline-block;
      z-index: 1000;
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: greenyellow;
      overflow: hidden;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-around;
  }
  .down{
    padding: 20px;
  }
}
</style>