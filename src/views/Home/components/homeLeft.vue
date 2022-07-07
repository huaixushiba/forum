<template>
  <n-space vertical>
    <n-layout has-sider content-style='background-color:#F5F5F5'>
      <n-layout-sider
        content-style='background-color:#f5f5f5'
        trigger-style='background-color:green'
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          default-value="全部文章"
          :options="menuOptions"
          :render-label="renderMenuLabel"
           @update:value="handleUpdateValue"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script>
import { h, ref, defineComponent,computed } from "vue";
import { NIcon,NButton } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { useStore } from "vuex";
export default defineComponent({
  components:{
    NButton
  },
  props:['changeContent'],
  setup(props) {
    const store = useStore()
    const menuOptions = computed(()=>{
      let arr = [{
        label:'全部文章',
        key: "全部文章",
      }]
      for(let i  in store.state.typeList){
        arr.push({label:store.state.typeList[i],key: i})
      }
      return arr
    })
    const collapsed=ref(false)
    const renderMenuLabel=(option)=>{
      if ("href" in option) {
          return h("a", { href: option.href, target: "_blank" }, option.label);
        }
        return option.label;
    }
    const renderMenuIcon=(option)=>{
      // 渲染图标占位符以保持缩进
        if (option.key === "sheep-man") return true;
        // 返回 falsy 值，不再渲染图标及占位符
        if (option.key === "food") return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
    }
    const expandIcon=()=>{
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    }
    const handleUpdateValue =(key) =>{
        props.changeContent(key)
      }
    return {
      collapsed,
      menuOptions,
      renderMenuLabel,
      renderMenuIcon,
      expandIcon,
      handleUpdateValue
    };
  },
});
</script>
<style scoped>
</style>