<template>
  <n-list>
    <template #header>
      <span style="font-size: 20px; font-weight: 700; color: red;background-color:#f5f5f5;padding:10px;border-radius:10px"
        ><RibbonOutline
          style="height: 30px; vertical-align: middle"
        />推荐列表</span
      ></template
    >
    <n-list-item
      style="
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 5px;
        margin-bottom: 5px;
      "
      v-for="content in preferContents"
      :key="content.contentId"
    >
      <template #suffix>
        <n-button @click="turnContent(content.contentId, router)" type="primary"
          >查看</n-button
        >
      </template>
      <n-thing>
        <template #header
          ><span style="font-weight: 900">{{ content.title }}</span></template
        >
        <template #header-extra
          ><span style="color: #6950a1">{{ content.addUser }}</span></template
        >
        <template #description
          ><span style="font-weight: 600; color: #2a5caa">{{
            contentType[content.contentType]
          }}</span></template
        >
        <div
          v-html="content.data"
          style="overflow: hidden; max-width: 185px"
        ></div>
        <span style="color: red; margin-left: 30px"
          ><HeartOutline style="height: 20px; vertical-align: middle" />
          {{ content.likes }}</span
        >
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script>
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { RibbonOutline, HeartOutline } from "@vicons/ionicons5";
import { turnContent } from "@/utils/common";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    RibbonOutline,
    HeartOutline,
  },
  setup() {
    const router = useRouter();
    const preferContents = ref([]);
    const store = useStore();
    const contentType = computed(() => store.state.typeList); //文章类型
    const getPreferContents = () => {
      axios.get("/getPreferContents").then((res) => {
        preferContents.value = res.data;
      });
    };
    onBeforeMount(() => {
      getPreferContents();
    });
    return {
      preferContents,
      contentType,
      turnContent,
      router,
    };
  },
});
</script>
<style scoped>
</style>