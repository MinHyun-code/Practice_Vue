import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/login/Login"; //로그인 컴포넌트 호출
import Join from "@/components/login/Join"; //회원가입 컴포넌트 호출
import Main from "@/components/Main"; //메인 컴포넌트 호출
import BoardList from "@/components/board/BoardList"; //게시판 리스트 컴포넌트 호출
import Error_404 from "@/components/error/Error_404"; //404 에러 컴포넌트 호출

const routes = [
  {
    path: "/",
    name: Login,
    component: Login,
  },
  {
    path: "/join",
    name: Join,
    component: Join,
  },
  {
    path: "/main",
    name: Main,
    component: Main,
  },
  {
    path: "/boardList",
    name: BoardList,
    component: BoardList,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/Error_404",
  },
  {
    path: "/Error_404",
    component: Error_404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
