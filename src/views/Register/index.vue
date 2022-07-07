<template>
  <!-- 粒子特效插件 -->
  <Particles
    id="tsparticles"
    :options="{
      autoPlay: true,
      background: {
        color: {
          value: '#000000',
        },
        image: '',
        position: '',
        repeat: '',
        size: '',
        opacity: 1,
      },
      backgroundMask: {
        composite: 'destination-out',
        cover: {
          color: {
            value: '#fff',
          },
          opacity: 1,
        },
        enable: false,
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 60,
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: false,
            mode: [],
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: 'circle',
          },
          onHover: {
            enable: false,
            mode: [],
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: true,
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            easing: 'ease-out-quad',
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: '#ffffff',
                },
                stop: {
                  value: '#000000',
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: '#000000',
              },
              length: 2000,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: 'ease-out-quad',
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
        },
      },
      manualParticles: [],
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
      particles: {
        bounce: {
          horizontal: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 0,
          },
          vertical: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 0,
          },
        },
        collisions: {
          bounce: {
            horizontal: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
            vertical: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
          },
          enable: false,
          mode: 'bounce',
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E'],
          animation: {
            h: {
              count: 0,
              enable: true,
              offset: 0,
              speed: 30,
              sync: true,
            },
            s: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              sync: true,
            },
            l: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              sync: true,
            },
          },
        },
        destroy: {
          mode: 'none',
          split: {
            count: 1,
            factor: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 3,
            },
            rate: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
          },
        },
        gradient: [],
        groups: {},
        life: {
          count: 0,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
            sync: false,
          },
          duration: {
            random: {
              enable: false,
              minimumValue: 0.0001,
            },
            value: 0,
            sync: false,
          },
        },
        links: {
          blink: false,
          color: {
            value: '#fff',
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: '#00ff00',
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          decay: 0.1,
          distance: {},
          direction: 'top',
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: true,
            inverse: false,
            maxSpeed: 200,
          },
          path: {
            clamp: true,
            delay: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: 'destroy',
            bottom: 'bounce',
            left: 'destroy',
            right: 'destroy',
            top: 'none',
          },
          random: false,
          size: false,
          speed: {
            min: 50,
            max: 150,
          },
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fillColor: {
              value: '#000000',
            },
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: false,
            area: 800,
            factor: 1000,
          },
          limit: 300,
          value: 0,
        },
        opacity: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
          animation: {
            count: 0,
            enable: false,
            speed: 0.3,
            sync: true,
            destroy: 'min',
            startValue: 'max',
          },
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 45,
          },
          width: 1,
        },
        reduceDuplicates: false,
        repulse: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
        roll: {
          darken: {
            enable: true,
            value: 30,
          },
          enable: true,
          enlighten: {
            enable: true,
            value: 30,
          },
          mode: 'vertical',
          speed: {
            min: 15,
            max: 25,
          },
        },
        rotate: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            sync: false,
          },
          direction: 'random',
          path: false,
        },
        shadow: {
          blur: 0,
          color: {
            value: '#000000',
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          options: {
            polygon: [
              {
                sides: 5,
              },
              {
                sides: 6,
              },
            ],
            character: [
              {
                value: ['💩', '🤡', '🍀', '🍙'],
              },
            ],
          },
          type: [
            'circle',
            'square',
            'polygon',
            'character',
            'character',
            'character',
          ],
        },
        size: {
          random: {
            enable: false,
            minimumValue: 1,
          },
          value: 3,
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            sync: false,
            destroy: 'none',
            startValue: 'random',
          },
        },
        stroke: {
          width: 0,
        },
        tilt: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            sync: false,
          },
          direction: 'random',
          enable: true,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
        zIndex: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      themes: [],
      zLayers: 100,
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
        },
        rate: {
          quantity: 10,
          delay: 0.1,
        },
        shape: 'square',
        startCount: 0,
        size: {
          mode: 'percent',
          height: 0,
          width: 0,
        },
        position: {
          x: 50,
          y: 100,
        },
      },
    }"
  />
  <div id="login_form">
    <n-alert title="错误" type="error" closable v-show="errMsg">
      {{ errMsg }}
    </n-alert>
    <div id="login_title">
      <i class="red">R</i><i class="yellow">a</i><i class="green">i</i
      ><i class="blue">n</i><i class="snow">S</i><i class="violet">t</i
      ><i class="aquamarine">o</i><i class="gold">r</i><i class="lavender">m</i>
    </div>
    <n-form :model="loginForm" ref="formRef" :rules="rules">
      <n-form-item path="account" label="账号">
        <n-input
          v-model:value="loginForm.account"
          @keydown.enter.prevent
          placeholder="请输入账号"
          clearable
        />
      </n-form-item>
      <n-form-item path="userName" label="昵称">
        <n-input
          v-model:value="loginForm.userName"
          @keydown.enter.prevent
          placeholder="请输入昵称"
          clearable
        />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="loginForm.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入密码"
          show-password-on="mousedown"
        />
      </n-form-item>
      <n-form-item
        path="reenteredPassword"
        label="重复密码"
      >
        <n-input
          :disabled="!loginForm.password"
          v-model:value="loginForm.reenteredPassword"
          type="password"
          @keydown.enter.prevent
          show-password-on="mousedown"
        />
      </n-form-item>
      <div style="display: flex; justify-content: center">
        <n-button
          @click="loginSubmit"
          round
          type="primary"
          :disabled="isLoading"
        >
          注册
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRaw, ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { setStore } from "@/utils/storage.js";
import axios from "axios";
import md5 from "js-md5";
export default defineComponent({
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    const errMsg = ref("");
    //正在请求后端
    const isLoading = ref(false);
    //表单验证规则
    const rules = {
      account: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("需要账号");
            } else if (value.length < 8 || value.length > 16) {
              return new Error("账号长度在8-16之间");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      userName: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("需要昵称");
            } else if (value.length > 16) {
              return new Error("昵称应小于16");
            } else {
              return true;
            }
          },
          trigger: ["blur"],
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
      reenteredPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
          },
          {
            validator(rule, value){
              if(value){
                if(value!==loginForm.value.password){
                  return false
                }else{
                  return true
                }
              }
            },
            message: '两次密码输入不一致',
            trigger: ['input','blur']
          },
        ]
    };
    //表单数据
    const loginForm = ref({
      account: null,
      userName: "",
      password: null,
      reenteredPassword:null
    });
    //注册数据
    const registerForm = ref({
      account: null,
      userName: "",
      password: null,
      createTime:null,
    })
    /*
      登录按钮，请求后端接口
    */
    const loginSubmit = async (e) => {
      e.preventDefault();
      formRef.value.validate((errors) => {
        if (!errors) {
          isLoading.value = true;
          message.loading("正在注册", { duration: 10000 });
          registerForm.value.account=loginForm.value.account
          registerForm.value.userName=loginForm.value.userName
          registerForm.value.password=loginForm.value.password
          registerForm.value.createTime = Date.now()
          axios.post("/register", toRaw(registerForm.value)).then((res) => {
            isLoading.value = false;
            message.destroyAll();
            if(res.data==='账号重复'){
              message.error('账号已存在')
            }else if(res.data==='昵称重复'){
              message.error('昵称已存在')
            }else if(res.data==='success'){
              message.success('注册成功')
              router.push('/login')
            }else{
              message.warning('注册出错，请联系管理员')
            }
          }).catch(err=>{
            message.error(err)
          });
        } else {
          console.log(errors);
          message.error("验证失败");
        }
      });
    };
    return {
      formRef,
      errMsg,
      loginForm,
      rules,
      loginSubmit,
      isLoading,
    };
  },
});
</script>
<style lang='less' scoped>
#login_form {
  background-color: #c0c4cc;
  max-width: 600px;
  min-width: 450px;
  padding: 30px;
  border-radius: 20px;
  margin: auto;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  #login_title {
    text-align: center;
    letter-spacing: 5px;
    padding-right: 10px;
    font-size: 20px;
    margin-bottom: 10px;
    .red {
      color: red;
    }
    .yellow {
      color: yellow;
    }
    .green {
      color: green;
    }
    .blue {
      color: blue;
    }
    .snow {
      color: snow;
    }
    .violet {
      color: violet;
    }
    .aquamarine {
      color: aquamarine;
    }
    .gold {
      color: gold;
    }
    .lavender {
      color: lavender;
    }
  }
}
</style>