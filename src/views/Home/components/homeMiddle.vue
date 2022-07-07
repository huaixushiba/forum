<template>
  <n-list>
    <n-list-item class="list_item"
    style="padding-top:20px"
      ><contentEditor
        :handleClick="addNewContent"
        buttonType="发表"
        :width="600"
    /></n-list-item>
    <n-list-item
      v-for="content in contentData"
      :key="content.title"
      class="list_item"
    >
      <template #prefix>
        <n-button @click="addLikes(content.contentId)" type="primary" v-show="!content.isLike"
          >点赞</n-button
        >
        <n-button
          @click="addLikes(content.contentId)"
          :disabled="content.isLike"
          color="#ff69b4"
          v-show="content.isLike"
          >点赞</n-button
        >
      </template>
      <n-thing @click="turnContent(content.contentId, router)">
        <template #header
          ><span style="font-weight: 900">{{ content.title }}</span></template
        >
        <template #header-extra
          ><span
            style="color: #6950a1"
            @click.stop="turnUser(content.addUser, router, store)"
            >{{ content.addUser }}</span
          ></template
        >
        <template #description
          ><span style="font-weight: 600; color: #2a5caa">{{
            contentType[content.contentType]
          }}</span></template
        >
        <div
          v-html="content.data"
          style="
            overflow: hidden;
            max-width: 500px;
            word-wrap: break-word;
            word-break: normal;
          "
        ></div>
        <span style="color: #ccc"
          >{{ moment(content.addTime).format("YYYY-MM-DD HH:mm:ss") }}
          <span style="color: red; margin-left: 30px"
            ><HeartOutline style="height: 20px; vertical-align: middle" />
            {{ content.likes }}</span
          >
          <span style="margin-left: 20px; color: green">
            <StarOutline style="height: 20px; vertical-align: middle" />
            {{ content.collectionUsers.length }}
          </span>
        </span>
      </n-thing>
      <template #suffix>
        <n-button
          @click="addCollection(content.contentId)"
          :disabled="content.isCollection|| content.addUser==store.state.userInfo.userName"
          type="info"
          >收藏</n-button
        >
      </template>
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
        style="background-color:#fff"
        :page-sizes="[
          { label: '10条/页', value: 10 },
          { label: '20条/页', value: 20 },
          { label: '30条/页', value: 30 },
          { label: '40条/页', value: 40 },
        ]"
      />
      <div v-show="!contentData.length">内容为空</div>
    </template>
  </n-list>
</template>

<script >
import moment from "moment";
import { turnContent, turnUser } from "@/utils/common";
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import contentEditor from "@/components/contentEditor.vue";
import { useMessage } from "naive-ui";
import { HeartOutline,StarOutline } from "@vicons/ionicons5";
import axios from "axios";
export default defineComponent({
  components: {
    contentEditor,
    HeartOutline,
    StarOutline
  },
  props: ["contentKey"],
  setup(props) {
    const page = ref(1); //当前页数
    const pageCount = ref(0); //总页数
    const pageSize = ref(10); //每页文章数量
    const allContentLength = ref(0); //总文章数量
    const contentData = ref([]); //文章数据
    const router = useRouter();
    const store = useStore();
    const message = useMessage();
    const contentType = computed(() => store.state.typeList); //文章类型
    const serchParams = ref({ contentType: "全部文章", frzzy: "" });
    /**
     * 获取文章数据
     * 获取当前文章数据，需要页数和每页文章数
     */
    const getData = () => {
      axios
        .post(
          `/allContents?page=${page.value}&size=${pageSize.value}`,
          serchParams.value
        )
        .then(async (res) => {
          if (res.data !== "error") {
            allContentLength.value = res.data[0].length;
            pageCount.value =
              Math.ceil(allContentLength.value / pageSize.value) === 0
                ? 1
                : Math.ceil(allContentLength.value / pageSize.value);
            contentData.value = res.data.slice(1);
            contentData.value = contentData.value.map(item=>{
              let flag = item.collectionUsers.filter(data=>{
                return data.account === store.state.userInfo.account
              })
              if(flag.length){
                return {...item,isCollection: true}
              }else{
                return item
              }
            })
            store.commit('CHANGECONTENTLENGTH',contentData.value.length)
          }else{
            message.error('error')
          }
        });
    };
    /**
     * 获取显示的文章数据
     * @param key 文章类型，初始化时为全部文章
     */
    const getShowContent = (key) => {
      serchParams.value.contentType = key
      getData()
    };
    const addNewContent = (newContent, addDisabled, editor, selectValue) => {
      if (!store.state.userInfo.userName) {
        message.error("账号未登录,请登录账号");
        router.push("/login");
      } else {
        newContent.contentType = selectValue.value;
        if (newContent.title.trim() == "") {
          message.warning("请输入文章标题");
        } else if (
          newContent.data.trim() == "" ||
          newContent.data.trim() ==
            '<div class="w-e-content-container"><p><br/></p></div>'
        ) {
          message.warning("请输入文章内容");
        } else if (newContent.contentType == null) {
          message.warning("请选择文章类型");
        } else {
          addDisabled.value = true;
          newContent.addTime = Date.now();
          newContent.addUser = store.state.userInfo.userName;
          axios.post("/addContent", newContent).then((res) => {
            if (res.data === "success") {
              message.success("成功发表");
              newContent.title = "";
              newContent.data = "";
              newContent.addUser = "";
              newContent.addTime = "";
              newContent.contentType = null;
              editor.clear();
              getData();
            }
          });
        }
      }
    };
    /**
     * 点赞
     * @param id 传入点赞文章id
     */
    const addLikes = (id) => {
      let newContent = contentData.value.filter(
        (item) => item.contentId === id
      );
      contentData.value = contentData.value.filter((item) => {
        if (item.contentId === id) {
          item.likes++;
          item.isLike = true;
          return item;
        } else {
          return item;
        }
      });
      axios.post("/addLikes", newContent[0]).then((res) => {
      });
    };
    /**
     * 收藏
     * @param id 传入收藏文章id
     */
    const addCollection = (id) => {
      if (store.state.userInfo.account) {
        let newContent = contentData.value.filter(
          (item) => item.contentId === id
        );
        newContent[0].collectionUsers.unshift({
          account: store.state.userInfo.account,
        });
        axios
          .post("/addCollection", newContent[0])
          .then((res) => {
            if (res.data == "success") {
              message.success("已收藏当前文章");
              contentData.value = contentData.value.map((item) => {
                if (item.contentId === id) {
                  return { ...item, isCollection: true };
                } else {
                  return item;
                }
              });
            } else {
              message.error("收藏失败");
            }
          })
          .catch((err) => {
            message.error(err);
          });
      } else {
        message.error("请登录账号后收藏");
      }
    };
    /**
     * 获取文章类型列表
     */
    const getTypeList = () => {
      axios.get("/back/typeList").then((res) => {
        if (res.data !== "error") {
          store.commit("CHANGETYPELIST", res.data);
        }
      });
    };
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
    /**
     * 点击左侧栏接收文章类型，监听文章类型改变显示单一文章
     */
    watch(
      () => props.contentKey,
      (key, prevKey) => {
        getShowContent(key);
      }
    );
    watch(()=>store.state.frzzy,(newValue,oldValue)=>{
      serchParams.value={...serchParams.value,frzzy:newValue}
      getData()
    })
    onBeforeMount(() => {
      getData();
      getTypeList();
    });
    return {
      page,
      pageSize,
      moment,
      contentType,
      changePage,
      changePageSize,
      pageCount,
      contentData,
      addLikes,
      addCollection,
      router,
      addNewContent,
      turnUser,
      turnContent,
      store,
    };
  },
});
</script>
<style scoped>
.list_item {
  padding: 5px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  /* width: 100%; */
}
</style>