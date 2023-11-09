import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import UploadGoods from '@/components/UploadGoods.vue'
import Goods from '@/components/Goods.vue'
import ChangePwd from '@/components/ChangePwd.vue'
import OrdersManager from '@/components/OrdersManager.vue'
import Login from "@/components/login.vue";
import Buy from "@/components/Buy.vue"
import EditGoods from "@/components/EditGoods.vue"
import HistoryGoods from "@/components/HistoryGoods.vue"
import goodsinfo from "@/components/GoodsInfo.vue"
import NotFound from '@/components/NotFound.vue'
import register from '@/components/register.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path : '/',redirect: 'goods'},
        { path : '/login',component: Login},
        { path: '/goods', component: Goods },
        { path: '/EditGoods',component:EditGoods},
        { path: '/uploadgoods', component: UploadGoods },
        { path: '/changepwd', component: ChangePwd },
        { path: '/ordersmanager', component: OrdersManager },
        { path: '/buy', component: Buy },
        { path: '/historygoods',component:HistoryGoods},
        { path: '/goodsinfo',component:goodsinfo},
        { path:'/register',component:register},
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router
