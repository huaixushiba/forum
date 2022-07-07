<template>
  <n-input
    maxlength="30"
    show-count
    v-show="props.buttonType==='发表'"
    clearable
    v-model:value="newContent.title"
    placeholder="请输入标题"
    style="margin-bottom:10px"
  />
  <!-- 工具栏 -->
  <Toolbar
    :editorId="editorId"
    :defaultConfig="toolbarConfig"
    :mode="mode"
    style="border-bottom: 1px solid #fff"
  />
  <!-- 编辑器 -->
  <Editor
    :editorId="editorId"
    :mode="mode"
    :defaultConfig="editorConfig"
    :defaultContent="getDefaultContent"
    @onCreated="handleCreated"
    @onChange="handleChange"
    @customAlert="customAlert"
    @customPaste="customPaste"
    :style="{height:100 + 'px', 'max-width' : props.width+'px','background-color':'#000'}"
  />
  <div style="text-align: right; padding-right: 30px">
    <span v-show="props.buttonType==='发表'">
      分类:<n-select
        v-model:value="selectValue"
        :options="options"
        style="
          width: 150px;
          display: inline-block;
          line-height: 35px;
          margin-right: 50px;
          text-align: center;
          background-color: #abd5e5;
        "
      />
    </span>
    <n-button type="success" ghost @click="handleClick" :disabled='addDisabled'>{{props.buttonType}}</n-button>
  </div>
</template>

<script>
import { defineComponent, computed, onUnmounted, reactive, ref, onBeforeMount } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { useMessage } from "naive-ui";
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor,
} from "@wangeditor/editor-for-vue";
import cloneDeep from "lodash.clonedeep";
import { useStore } from "vuex";
export default defineComponent({
  components: { Editor, Toolbar },
  props:{
    handleClick:Function,
    buttonType:String,
    width:Number
  },
  setup(props) {
    const message = useMessage();
    const editorId = "wangeEditor-1";
    const addDisabled=ref(false)
    const store = useStore()
    const newContent = reactive({
      data: "",
      title: "",
      addTime: "",
      addUser: "",
      contentType: null,
    });
    const selectValue = ref(null);
    // 默认内容
    const defaultContent = [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];

    // 注意，深度拷贝 content ，否则会报错
    const getDefaultContent = computed(() => cloneDeep(defaultContent));
    const options = computed(()=>{
      let arr = []
      for(let i  in store.state.typeList){
        arr.push({label:store.state.typeList[i],value:i})
      }
      return arr
    })
    // 编辑器配置
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {},
    };
    const toolbarConfig = {
      toolbarKeys: [
        "bold",
        "emotion",
        "underline",
        "italic",
        "color",
        "bgColor",
        "insertLink",
      ],
    };

    // 编辑器回调函数
    //编辑器初始化函数
    const handleCreated = (editor) => {};
    //编辑器内容更改函数
    const handleChange = (editor) => {
      newContent.data = editor.getHtml({ withFormat: false });
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    //编辑器内部粘贴函数
    const customPaste = (editor, event, callback) => {
      message.warning('请手动输入，禁止粘贴')
      callback(false); // 返回 false ，阻止默认粘贴行为
    };
    /**
     * 点击事件
     */
    const handleClick=()=>{
      let editor = getEditor(editorId);
      props.handleClick(newContent,addDisabled,editor,selectValue)
    }
    onBeforeMount(()=>{
      
    })
    // 及时销毁编辑器
    onUnmounted(() => {
      let editor = getEditor(editorId);
      if (editor == null) return;
      // 销毁，并移除 editor
      editor.destroy();
      removeEditor(editorId);
    });

    return {
      editorId,
      mode: "simple",
      getDefaultContent,
      editorConfig,
      toolbarConfig,
      handleCreated,
      handleChange,
      customAlert,
      customPaste,
      newContent,
      options,
      selectValue,
      addDisabled,
      handleClick,
      props
    };
  },
});
</script>
<style scoped>
</style>