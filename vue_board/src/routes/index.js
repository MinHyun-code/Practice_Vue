import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/login/Login"; //로그인 컴포넌트 호출
import Join from "@/components/login/Join"; //회원가입 컴포넌트 호출
import Main from "@/components/Main"; //메인 컴포넌트 호출
import BoardList from "@/components/board/BoardList"; //게시판 리스트 컴포넌트 호출
import Error_404 from "@/components/error/Error_404"; //404 에러 컴포넌트 호출
import MyPage from "@/components/info/MyPage"; // 개인정보 컴포넌트 호출
import Setting from "@/components/info/Setting"; // 셋팅 컴포넌트 호출
import Calendar from "@/components/calendar/Calendar"; // 캘린더 컴포넌트 호출
import Memo from "@/components/calendar/Memo"; // 메모 컴포넌트 호출

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
    path: "/myPage",
    name: MyPage,
    component: MyPage,
  },
  {
    path: "/Setting",
    name: Setting,
    component: Setting,
  },
  {
    path: "/boardList",
    name: BoardList,
    component: BoardList,
  },
  {
    path: "/calendar",
    name: Calendar,
    component: Calendar,
  },
  {
    path: "/memo",
    name: Memo,
    component: Memo,
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
