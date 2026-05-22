const routes = [
  // ======================
  // AUTH
  // ======================
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
    ],
  },

  // ======================
  // ADMIN PANEL
  // ======================
  {
    path: '/admin',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },

      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
      },

      {
        path: 'products',
        name: 'admin-products',
        component: () => import('pages/products/ProductsPage.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('pages/users/UsersPage.vue'),
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('pages/orders/OrdersPage.vue'),
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('pages/settings/SettingsPage.vue'),
      },
      {
        path: 'cart',
        name: 'admin-cart',
        component: () => import('pages/cart/CartPage.vue'),
      },

      {
        path: 'checkout',
        name: 'admin-checkout',
        component: () => import('pages/checkout/CheckoutPage.vue'),
      },
    ],
  },

  // ======================
  // SHOP (CUSTOMER SIDE)
  // ======================
  {
    path: '/shop',
    component: () => import('layouts/ShopLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'products',
      },

      {
        path: 'products',
        name: 'shop-products',
        component: () => import('pages/shop/ProductsPage.vue'),
      },

      {
        path: 'cart',
        name: 'shop-cart',
        component: () => import('pages/shop/CartPage.vue'),
      },

      {
        path: 'checkout',
        name: 'shop-checkout',
        component: () => import('pages/shop/CheckoutPage.vue'),
      },
    ],
  },

  // ======================
  // 404 PAGE
  // ======================
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
