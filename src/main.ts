import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/assets/css/global.css'
import 'element-plus/dist/index.css'

//支持中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入图标
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus,{
  locale: zhCn,
})
app.use(store).use(router).mount('#app')

//全局注册组件
Object.keys(Icons).forEach((key)=>{
  app.component(key,Icons[key as keyof typeof Icons])
})