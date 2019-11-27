export default [{

    title: 'home',
    icon: 'home',
    path: '/',
  },
  {
    title: 'products',
    icon: 'appstor',
    children: [{
        title: 'categoey',
        icon: 'bars',
        path: '/category',
      },
      {
        title: 'product',
        icon: 'tool',
        path: '/product',
      }

    ]
  },
  {
    title: 'user',
    icon: 'user',
    path: '/user',
  },
  {
    title: 'role',
    icon: 'safety',
    path: './role'
  },
  {
    title: 'charts',
    icon: 'area-chart',
    children: [{
        title: 'line',
        icon: 'line-chart',
        path: '/charts/line'
      },
      {
        title: 'bar',
        icon: 'bar-chart',
        path: '/chart/bar',
      },
      {
        title: 'pie',
        icon: 'pie-chart',
        path: './chart/pie'
      }

    ]
  }
]