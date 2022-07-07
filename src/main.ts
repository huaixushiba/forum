import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//粒子特效插件
import Particles from "particles.vue3";
import './utils/http.js'
//按需引入native ui
import {
    // create naive ui
    create,
    // component
    NButton,
    NForm,
    NFormItem,
    NInput,
    NMessageProvider,
    NAlert,
    NIcon,
    NSpace,
    NDropdown,
    NLayout,
    NMenu,
    NLayoutSider,
    NList,
    NListItem,
    NThing,
    NPagination,
    NUpload,
    NCard,
    NSelect,
    NModal
  } from 'naive-ui'
const naive = create({
  components: [NButton,NForm,NFormItem,NInput,NMessageProvider,NAlert,NIcon,NSpace,NDropdown,NLayout,NMenu,NLayoutSider,NList,NListItem,NThing,NPagination,NUpload,NCard,NSelect,NModal]
})


const app =createApp(App)
app.use(store)
.use(naive)
.use(router)
.use(Particles)
.mount('#app')
