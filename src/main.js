import {createApp} from 'vue'
import App from './components/App.vue'
import Students from '/components/Students.vue'
import StudentsInfo from '/components/StudentsInfo.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from '/store.js';

const routes = [
    {path: "/", component: Students},
    {path: "/students-info/:id", component: StudentsInfo, props: true},   
]
const router = new createRouter({history: createWebHashHistory(), routes})

createApp(App).use(router).use(store).mount('#app');

