<template>
  <div id="main_footer">
    <div class="w">
        <h3>联系方式:</h3>

        tel:18623900936
        微信:同tel
        QQ:1670180567
        email:1670180567@qq.com
      </div>
      <div class="w" style="margin-top:30px">
        <a href="https://beian.miit.gov.cn">豫ICP备2021025360号</a>
      </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
  setup() {
    return {
    }
  },
})

</script>
<style lang='less' scoped>
#main_footer{
  height: 200px;
  background: #4CA1AF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #4CA1AF, #76b9c4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #4CA1AF, #76b9c4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-align: center;
}
</style>