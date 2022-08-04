import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/policy/index'),
      meta: { title: '策略管理', icon: 'dengpao' },
    },
  ],
}
