import {createRouter, createWebHashHistory} from 'vue-router'
import UploadGoods from '@/components/UploadGoods.vue'
import ChangePwd from '@/components/ChangePwd.vue'
import OrdersManager from '@/components/OrdersManager.vue'
import Login from "@/components/login.vue";
import EditGoods from "@/components/EditGoods.vue"
import HistoryGoods from "@/components/HistoryGoods.vue"
import goodsinfo from "@/components/GoodsInfo.vue"
import NotFound from '@/components/NotFound.vue'
import register from '@/components/register.vue'
import UserInfo from '@/components/UserInfo.vue'
import Orders from '@/components/Orders.vue'
import EditUserInfo from '@/components/EditUserInfo.vue'
import GoodsList from '@/components/GoodsList.vue'
import HistoryBuy from "../components/HistoryBuy.vue";
import HistoryBuyInfo from "../components/HistoryBuyInfo.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path : '/',redirect: 'GoodsList'},
        { path : '/login',component: Login},
        { path: '/GoodsList', component: GoodsList },
        { path: '/EditGoods',component:EditGoods},
        { path: '/uploadgoods', component: UploadGoods },
        { path: '/changepwd', component: ChangePwd },
        { path: '/ordersmanager', component: OrdersManager },
        { path: '/historybuy', component: HistoryBuy },
        { path: '/historybuyinfo', component: HistoryBuyInfo },
        { path: '/historygoods',component:HistoryGoods},
        { path: '/goodsinfo',component:goodsinfo},
        { path:'/register',component:register},
        { path:'/userinfo',component:UserInfo},
        { path: '/orders', component: Orders },
        { path: '/edituserinfo', component: EditUserInfo },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router
