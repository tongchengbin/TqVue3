/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
  ]
};

export default nestedRouter
