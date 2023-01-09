import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld"; //메인 컴포넌트 호출
import BoardList from "@/components/board/List"; //게시판 리스트 컴포넌트 호출

const routes = [
  {
    path: "/",
    name: HelloWorld,
    component: HelloWorld,
  },
  {
    path: "/board/list",
    name: BoardList,
    component: BoardList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
