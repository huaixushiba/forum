<template>
<div id="home_page" class="w">
  <div class="home_left">
    <homeLeft :changeContent='changeContent'/>
  </div>
  <div class="home_middle">
    <homeMiddle :contentKey='contentKey'/>
  </div>
  <div class="home_right">
    <homeRight/>
  </div>
</div>
</template>

<script>
import { defineComponent,ref } from "vue";
import homeLeft from './components/homeLeft.vue'
import homeMiddle from './components/homeMiddle.vue'
import homeRight from './components/homeRight.vue'
export default defineComponent({
  components: {
    homeLeft,
    homeMiddle,
    homeRight
  },
  setup() {
    const contentKey=ref('')
    const changeContent=(key)=>{
      contentKey.value=key
    }
    return {
      changeContent,
      contentKey
    };
  },
});
</script>
<style lang='less' scoped>
#home_page{
  display: flex;
  min-height: 80vh;
  margin-top: 10px;
  .home_left{
    border-radius: 10px;
    overflow: hidden;
  }
  .home_middle{
    flex-basis: 250px;
    flex-grow: 2;
    margin-right: 10px;
    margin-left: 10px;
  }
  .home_right{
    flex-basis: 125px;
    flex-grow: 1;
  }
}
</style>