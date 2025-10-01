    import { createRouter, createWebHistory } from 'vue-router'
    import Home from '../views/Home.vue'
    import CreateTask from '../views/CreateTasks.vue'
    import DetailPage from '../views/DetailPage.vue'
    import EditTask from '../views/EditTask.vue'
    import Login from '../views/Login.vue'
    import NotFound from '../views/NotFound.vue'
    

    const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/create', name: 'CreateTask', component: CreateTask },
    { path: '/task/:id', name: 'DetailPage', component: DetailPage, props: true },
    { path: '/task/:id/edit', name: 'EditTask', component: EditTask, props: true },
    { path: '/login', name: 'Login', component: Login },
    // { path: '/crash', name: 'Crash', component: Crash },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
    ]

    export default createRouter({ history: createWebHistory(), routes })
