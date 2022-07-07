<template>
  <div id="personArea" class="w">
    <div id="person_leftmenu">
      <n-menu :options="menuOptions" 
      style="textAlign:center;"
      :value='menuValue[route.path]'
      />
    </div>
    <div id="person_rightmenu">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, h } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";
import { RouterLink, useRoute } from "vue-router";
import { NIcon } from "naive-ui";
import {
  HomeOutline,
  HeartOutline,
  BookmarkOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
export default defineComponent({
  setup() {
    const message = useMessage();
    const showModalRef = ref(false);
    const previewImageUrlRef = ref("");
    const route = useRoute()
    const menuValue = {
      '/personarea/':'myspace',
      '/personarea/myfollows':'myfollows',
      '/personarea/mycollections':'mycollections',
      '/personarea/mysetting':'mysetting'
    }
    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "myspace",
                path: "/personarea/",
              },
            },
            { default: () => "我的空间" }
          ),
        key: "myspace",
        icon: renderIcon(HomeOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "myfollows",
                path: "/personarea/myfollows",
              },
            },
            { default: () => "我的关注" }
          ),
        key: "myfollows",
        icon: renderIcon(HeartOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "mycollections",
                path: "/personarea/mycollections",
              },
            },
            { default: () => "我的收藏" }
          ),
        key: "mycollections",
        icon: renderIcon(BookmarkOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "mysetting",
                path: "/personarea/mysetting",
              },
            },
            { default: () => "我的设置" }
          ),
        key: "mysetting",
        icon: renderIcon(SettingsOutline),
      },
    ];
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
      showModalRef.value = true;
    }
    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }
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
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      beforeUpload,
      menuOptions,
      menuValue,
      route
    };
  },
});
</script>
<style lang='less' scoped>
#personArea {
  display: flex;
  margin-top: 10px;
  min-height: 75vh;
  #person_leftmenu {
    flex-basis: 150px;
    flex-grow: 1;
    background-color: #f5f5f5;
    padding: 20px 10px 20px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    height: 500px;
  }
  #person_rightmenu {
    flex-basis: 350px;
    flex-grow: 4;
    margin-left: 20px;
  }
}
</style>