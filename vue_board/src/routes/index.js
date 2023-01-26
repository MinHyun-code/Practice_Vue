import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/login/Login"; //메인 컴포넌트 호출
import Main from "@/components/Main"; //메인 컴포넌트 호출
import boardList from "@/components/board/BoardList"; //게시판 리스트 컴포넌트 호출

const routes = [
  {
    path: "/",
    name: Login,
    component: Login,
  },
  {
    path: "/main",
    name: Main,
    component: Main,
  },
  {
    path: "/boardList",
    name: boardList,
    component: boardList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
