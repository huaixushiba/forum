<template>
  <div id="singleContent">
    <div class="title">
      <h2>{{ content.title }}</h2>
    </div>
    <div class="mianContent">
      <div class="left">
        <span class="headImg"> <img :src="content.img" alt=""> </span>
        <p>发表人：{{ content.addUser }}</p>
        <p>发表时间：{{ moment(content.addTime).format("YYYY-MM-DD HH:mm:ss") }} </p>
      </div>
      <div class="right">
        <div v-html="content.data" style="max-width:680px;word-wrap:break-word;word-break:break-all">
        </div>
      </div>
    </div>
    <div class="commentShow" v-for="(comment, i) in comments" :key="i">
      <div class="left">
        <ul>
          <p>评论人：{{ comment.addUser }}</p>
          <p>评论时间：{{ moment(comment.addTime).format("YYYY-MM-DD HH:mm:ss") }}</p>
        </ul>
      </div>
      <div class="right" v-html="comment.data" >
      </div>
    </div>
    <div class="comment">
        <contentEditor :handleClick='addComment' buttonType='评论' />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {useStore} from 'vuex'
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import contentEditor from "@/components/contentEditor.vue";
import {useMessage} from 'naive-ui'
export default defineComponent({
  components:{
    contentEditor
  },
  setup() {
    const content = ref({});
    const comments = ref([]);
    const route = useRoute();
    const textarea=ref('')
    const store = useStore()
    const message = useMessage()
    /**
     * 获取单个评论内容
     */
    const getSingleContent = async () => {
      const id = route.params.id;
      const res = await axios.get(`/signleContent?contentId=${id}`);
      content.value = res.data[0];
      comments.value = res.data[0].comments;
      getImg()
    };
    /**
     * 添加评论
     * @newContent 新增的评论内容
     * @addDisabled 禁用按钮
     */
    const addComment=async (newContent,addDisabled,editor)=> {
        if (
          newContent.data.trim() == "" ||
          newContent.data.trim() ==
            '<div class="w-e-content-container"><p><br/></p></div>'
        ) {
          message.warning("请输入评论内容");
        } else {
          addDisabled.value=true
          newContent.addTime = Date.now();
          newContent.addUser = store.state.userInfo.userName;
          newContent.addId = route.params.id
          axios.post("/addComments", newContent).then((res) => {
            if (res.data === "success") {
              message.success("评论成功");
              newContent.title = "";
              newContent.data = "";
              newContent.addUser = "";
              newContent.addTime = "";
              newContent.contentType = null;
              editor.clear()
              getSingleContent()
            }else{
              message.error('评论失败，请重新评论')
            }
          });
        }
    }
    /**
     * 获取图片
     */
    const getImg = async ()=>{
      let userInfo={}
      userInfo.userName = content.value.addUser
      axios.post('/getPerImg',userInfo)
      .then(res=>{
        content.value.img = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    }
    /**
     * 初始化数据
     */
    onBeforeMount(async ()=>{
        await getSingleContent()
    })
    return {
        content,
        comments,
        textarea,
        addComment,
        moment
    };
  },
});
</script>
<style lang='less' scoped>
#singleContent {
  max-width: 1200px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  .title {
    text-align: center;
  }
  .mianContent,
  .commentShow {
    display: flex;
    margin-bottom: 20px;
    .left {
      flex: 4;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      p {
        font-size: 18px;
        margin-bottom: 5px;
      }
      .headImg {
        margin-top: 5px;
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        background-color: greenyellow;
      }
    }
    .right {
      border: 1px solid #ccc;
      border-left: none;
      padding-left: 20px;
      padding-top: 10px;
      max-width: 600px;
      flex: 6;
      word-wrap:break-word;
      word-break:normal; 
    }
  }
  .comment {
    text-align: center;
    .addComment {
      margin-top: 20px;
    }
  }
}
</style>