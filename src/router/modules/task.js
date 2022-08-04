import Layout from '@/layout'

export default {
  path: '/task',
  component: Layout,
  name: '工单管理',
  meta: { title: '工单管理', icon: 'dingdan' },
  children: [
    {
      path: 'business',
      name: '管理',
      component: () => import('@/views/task/business/index.vue'),
      meta: { title: '运营工单' },
    },
    {
      path: 'operation',
      component: () => import('@/views/task/operation'),
      meta: { title: '运维工单' },
    },
  ],
}
