import Vue from 'vue'
import App from './App.vue'
import { MdLayout, MdButton, MdField, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdLayout)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(MdContent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
