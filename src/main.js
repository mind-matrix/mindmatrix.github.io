import Vue from 'vue'
import App from './App.vue'
import { Navbar, Icon, Button, Field, Input, Loading } from 'buefy'
import 'buefy/dist/buefy.css'
import 'prismjs/themes/prism.css';

Vue.config.productionTip = false

Vue.use(Navbar)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Field)
Vue.use(Input)
Vue.use(Loading)

new Vue({
  render: h => h(App),
}).$mount('#app')
