<template>
<n-card title="设置" hoverable style="background-color: #F5F5F5;"> 
  <template #footer> <n-button type="warning">退出登录</n-button></template>
</n-card>
</template>

<script>
import {defineComponent, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    onBeforeMount(()=>{
      store.commit('CHANGECONTENTLENGTH',0)
    })
    return {
    }
  },
})

</script>
<style scoped>

</style>