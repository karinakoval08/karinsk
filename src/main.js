import {createApp} from 'vue'
import App from './components/App.vue'
import Students from '/components/Students.vue'
import StudentsInfo from '/components/StudentsInfo.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from '/store.js';
import Login from "./components/login.vue";

const routes = [
    {path: "/", component: Students, meta: {requiresAuth: true}},
    {path: "/students-info/:id", component: StudentsInfo, props: true, meta: {requiresAuth: true}},
    {path: '/login', component: Login},   
]
const router = new createRouter({history: createWebHashHistory(), routes})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.getUser === null) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

const app = createApp(App);
app.use(store);
createApp(App).use(router).use(store).mount('#app');

