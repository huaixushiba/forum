<template>
  <ul class="star_list">
    <li class="star" v-for="star in starList" :key="star.id" :style="{top:star.top+'px',left:star.left+'px',animationDelay:star.delay+'s'}"></li>
  </ul>
  <mainHeader />
  <router-view/>
  <main-footer/>
</template>

<script>
import { defineComponent,ref, watch } from "vue";
import mainHeader from "@/components/mainHeader.vue";
import mainFooter from '@/components/mainFooter.vue'
import { useStore } from "vuex";
export default defineComponent({
  components: {
    mainHeader,
    mainFooter
  },
  setup() {
    const starList = ref([])
    const store = useStore()
    const setStar = (height)=>{
      for(let i = 0 ; i < 30;i++ ){
        let top = parseInt(Math.random()*height)
        let left = parseInt(Math.random()*(document.body.clientWidth-200))
        let delay = parseInt(Math.random()*10)
        let star = {}
        star.id = i
        star.top = top
        star.left = left
        star.delay = delay
        starList.value.push(star)
      }
    }
    watch(()=>store.state.contentLength,(newValue,oldValue)=>{
      starList.value = []
      setStar(newValue*150+400)
    },{immediate:true})
    return {
      starList
    };
  },
});
</script>
<style lang='less' scoped>
.star_list{
  z-index: 1;
  position: relative;
  margin: 0;
  .star{
    width: 0;
    height: 0;
    position: relative;
    animation: star-fall 3s linear infinite;
  }
  .star::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 3px solid transparent;
    border-left-width: 200px;
    border-left-color: rgba(241, 144, 79, 0.7);
    transform: rotate(-45deg) translate3d(1px,3px,0);
    transform-origin: 0% 100%;
  }
}

@keyframes star-fall{
  0%{
    opacity: 0;
    transform: scale(0.7) translate3d(0,0,0);
  }
  50%{
    opacity: 1;
    transform: scale(0.7) translate3d(-200px,200px,0);
  }
  100%{
    opacity: 0;
    transform: scale(0.7) translate3d(-300px,300px,0);
  }
}
</style>