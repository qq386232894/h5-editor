import Vue from 'vue'
import Router from 'vue-router'
import ComponentEditor from '@/modules/editor/componentEditor/ComponentEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: ComponentEditor
    }
  ]
})
