import Layout from '@/layout'

export default {
  path: '/report',
  component: Layout,
  children: [
    {
      path: 'report',
      component: () => import('@/views/report/index'),
      meta: { title: '对账系统', icon: 'zhangdan_o' },
    },
  ],
}
