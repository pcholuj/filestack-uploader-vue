import Vue from 'vue';
import Router from 'vue-router';
import FilesList from '@/modules/files/components/list/list.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: FilesList
        }
    ]
});
