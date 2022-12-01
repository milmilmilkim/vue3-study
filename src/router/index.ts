import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DragView from '../views/DragView.vue';
import PiniaView from '../views/PiniaView.vue';
import ExchangeView from '../views/ExchangeView.vue';
import TableView from '../views/TableView.vue';
import TetrisView from '../views/TetrisView.vue';
import CanvasView from '../views/CanvasView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/drag',
    name: 'drag',
    component: DragView,
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: PiniaView,
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: ExchangeView,
  },
  {
    path: '/table',
    name: 'table',
    component: TableView,
  },
  {
    path: '/tetris',
    name: 'tetris',
    component: TetrisView,
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: CanvasView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
