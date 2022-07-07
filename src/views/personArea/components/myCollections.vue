<template>
<n-card title="个人信息" id='myspace' hoverable style="background-color: #F5F5F5;">
  <n-list>
      <n-list-item
      v-for="content in contentData"
      :key="content.title"
      class="list_item"
    >
      <n-thing
      @click="turnContent(content.contentId,router)"
      >
      <template #header><span style="font-weight:900">{{content.title}}</span></template>
      <template #header-extra><span style="color:#6950a1">{{content.addUser}}</span></template>
      <template #description><span style="font-weight:600;color:#2a5caa">{{contentType[content.contentType]}}</span></template>
        <div v-html="content.data" style="overflow:hidden;max-width:840px"></div>
        <span
          style="color:#ccc">{{ moment(content.addTime).format("YYYY-MM-DD HH:mm:ss") }} 
          <span style="color:red;margin-left:30px"><HeartOutline style="height:20px;vertical-align:middle"/> {{
            content.likes
          }}</span>
          <span style="margin-left:20px;color:green">
            <Trash style="height:20px;vertical-align:middle"/>  {{content.collectionUsers.length}}
          </span>
          </span
        >
      </n-thing>
    </n-list-item>
      <template #footer>
        <n-pagination
        v-show="contentData.length"
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
      <div v-show="!contentData.length">
        内容为空
      </div>
      </template>
    </n-list>
  </n-card>
</template>

<script>
import axios from 'axios';
import {defineComponent,ref, onBeforeMount,computed} from 'vue'
import { useStore } from 'vuex'
import { turnContent } from '@/utils/common'
import moment from "moment";
import { HeartOutline,Trash } from "@vicons/ionicons5";
import { useRouter } from 'vue-router';
export default defineComponent({
  components:{
    HeartOutline,
    Trash
  },
  setup() {
    const page = ref(1);
    const pageSize = ref(10);
    const router = useRouter()
    const store = useStore()
    const pageCount = ref(0); //总页数
    const contentData=ref([])
    const allContentLength = ref(0); //总文章数量
    const contentType = computed(()=>store.state.typeList); //文章类型
    const getData=()=>{
      let data = {
        account:store.state.userInfo.account
      }
      axios.post(`/getCollections?page=${page.value}&size=${pageSize.value}`,data)
      .then(res=>{
        contentData.value = res.data[0]
        allContentLength.value = res.data[1]
        pageCount.value =
          Math.ceil(allContentLength.value / pageSize.value) === 0
            ? 1
            : Math.ceil(allContentLength.value / pageSize.value);
        store.commit('CHANGECONTENTLENGTH',contentData.value.length==0?0:contentData.value.length-1)
      })
    }
    /**
     * 切换页面
     * @pageNumber 点击的页数
     */
    const changePage = (pageNumber) => {
      page.value = pageNumber;
      getData();
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
      getData();
    };
    onBeforeMount(()=>{
      getData()
    })
    return {
      contentData,
      page,
      pageSize,
      changePage,
      changePageSize,
      contentType,
      moment,
      pageCount,
      turnContent,
      router
    }
  },
})

</script>
<style scoped>
</style>