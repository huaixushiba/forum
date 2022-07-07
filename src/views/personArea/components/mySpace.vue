<template>
  <n-card
    title="个人信息"
    id="myspace"
    hoverable
    header-style="background-color: #ccc;height:100px"
  >
    <template #cover> </template>
    <n-list>
      <template #header>
        <span class="myspace_header">用户昵称:{{ userData.userName }}</span>
        <div>
          {{userData.briefing}}
        </div>
      </template>
      <n-list-item class="myspace_title">
        <template #suffix>
          <n-button @click="showModalFunc">编辑资料</n-button>
        </template>
        <div>
          <ul>
            <li>用户账号：{{ userData.account }}</li>
            <li>
              用户头像：
              <img :src="userData.userImg" alt="" class="user_img"/>
            </li>
            <li>注册时间：{{ moment(Number(userData.createTime)).format("YYYY-MM-DD HH:mm:ss") }}</li>
            <li>用户权限：{{permissions[userData.permissions]}}</li>
            <li><a href="#">关注:{{userData.beFollows?.length}}</a></li>
          </ul>
        </div>
        <n-modal
          v-model:show="showModal"
          preset="dialog"
          title="修改资料"
          positive-text="确认修改"
          negative-text="取消"
          @positive-click="onPositiveClick"
          @negative-click="onNegativeClick"
        >
          <n-form
            :model="updateForm"
            ref="formRef"
            label-placement="left"
            label-width="80"
            style="
               {
                maxwidth: '640px';
              }
            "
          >
            <n-form-item label="用户昵称" path="userName">
              <n-input v-model:value="updateForm.userName" />
              <div style="font-size:10px;margin-left:5px;color:#ccc"> <span style="color:red">*</span> 用户昵称30天只能修改一次</div>
            </n-form-item>
            <n-form-item label="用户账号" path="account">
              <n-input v-model:value="updateForm.account"  disabled/>
            </n-form-item>
            <n-form-item label="用户头像" path="userImg">
              <n-upload
                action="http://47.101.41.175:3000/photos/upload"
                name="image"
                :data="{ userName: userData.userName }"
                list-type="image-card"
                @preview="handlePreview"
                @before-upload="beforeUpload"
              />
            </n-form-item>
            <n-form-item label="注册时间" path="createTime">
              <n-input v-model:value="updateForm.createTime" disabled />
            </n-form-item>
            <n-form-item label="个人简介" path="briefing">
              <n-input v-model:value="updateForm.briefing" />
            </n-form-item>
          </n-form>
        </n-modal>
      </n-list-item>
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
import axios from "axios";
import moment from "moment";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { useMessage } from "naive-ui";
import { turnContent } from '@/utils/common'
import { defineComponent, reactive, ref, onBeforeMount, computed } from "vue";
import {getStore,removeStore,setStore} from '@/utils/storage.js'
import { HeartOutline,Trash } from "@vicons/ionicons5";
export default defineComponent({
  components:{
    HeartOutline,
    Trash
  },
  setup() {
    const showModal = ref(false);
    const store = useStore();
    const router = useRouter()
    const message = useMessage();
    const userInfo = computed(() => store.state.userInfo);
    const previewImageUrlRef = ref("");
    const userData = ref({});
    const contentType = computed(()=>store.state.typeList); //文章类型
    const permissions=ref({
      1:'管理员',
      2:'普通用户'
    })
    const formRef = ref(null);
    const updateForm = ref({
      userName:'',
      createTime:'',
      briefing:'',
      account:''
    });
    const contentData = ref([]);
    const page = ref(1); //当前页数
    const pageCount = ref(0); //总页数
    const pageSize = ref(10); //每页文章数量
    const allContentLength = ref(0); //总文章数量
    const getData=()=>{
      axios
        .post("/getData", { account: userInfo.value.account })
        .then(async res => {
          userData.value = await res.data;
          let token = JSON.parse(getStore('userInfo')).token
          removeStore('userInfo')
          let newUserInfo={
            token:token,
            userName:userData.value.userName,
            userImg:userData.value.userImg
          }
          setStore('userInfo',newUserInfo)
          store.commit('CHANGEINFO',newUserInfo)
          getContentData()
        });
    }
    /**
     * 获取文章内容
     */
    const getContentData = ()=>{
      axios.post(`/getPerContents?page=${page.value}&size=${pageSize.value}`,{userName:userInfo.value.userName})
      .then(res=>{
        contentData.value = res.data[0]
        allContentLength.value = res.data[1]
        pageCount.value =
          Math.ceil(allContentLength.value / pageSize.value) === 0
            ? 1
            : Math.ceil(allContentLength.value / pageSize.value);
        store.commit('CHANGECONTENTLENGTH',contentData.value.length)
      })
    }
    /**
     * 编辑弹窗
     */
    const showModalFunc = () => {
      showModal.value = true;
      updateForm.value.userName=userData.value.userName
      updateForm.value.createTime= moment(Number(userData.value.createTime)).format("YYYY-MM-DD HH:mm:ss")
      updateForm.value.briefing=userData.value.briefing
      updateForm.value.account = userData.value.account
    };
    const onNegativeClick = () => {
      message.success("Cancel");
      showModal.value = false;
    };
     /**
     * 切换页面
     * @pageNumber 点击的页数
     */
    const changePage = (pageNumber) => {
      page.value = pageNumber;
      getContentData();
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
      getContentData();
    };
    /**
     * 修改
     */
    const onPositiveClick = async () => {
      message.success("提交成功");
      showModal.value = false;
      updateForm.value.createTime = userData.value.createTime
      axios.post('/updatePerData',updateForm.value)
      .then(async res=>{
        if(res.data==='success'){
          getData()
        }else if(res.data='时间间隔不够'){
          message.destroyAll()
          message.warning('请间隔30天再修改昵称')
        }
      })
    };
    /**
     * 图片预览
     */
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
    }
    /**
     * 图片上传预验证
     */
    const beforeUpload = async ({ file, fileList }) => {
      if (
        (file.type == "image/png" ||
          file.type == "image/jpeg" ||
          file.type == "image/jpg") &&
        fileList.length < 1 &&
        file.file.size <= 200000
      ) {
        return true;
      } else {
        message.error(
          "只能上传一张jpg/jpeg/png文件，且文件小于200k，请重新上传"
        );
        return false;
      }
    };
    onBeforeMount(() => {
      getData()
    });
    return {
      contentData,
      page,
      pageSize,
      showModal,
      userData,
      onNegativeClick,
      onPositiveClick,
      formRef,
      updateForm,
      showModalFunc,
      beforeUpload,
      handlePreview,
      permissions,
      contentType,
      moment,
      pageCount,
      changePage,
      changePageSize,
      turnContent,
      router
    };
  },
});
</script>
<style lang='less' scoped>
#myspace {
  border-radius: 10px;
  background-color: #f5f5f5;
  .myspace_header {
    font-size: 24px;
  }
  .myspace_title {
    li {
      font-weight: 700;
    }
    .user_img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>