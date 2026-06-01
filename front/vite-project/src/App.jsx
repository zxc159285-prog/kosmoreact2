import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./bakery.css"; // 식빵 전문점 글로벌 디자인 시스템
import Layout from "./components/common/Layout";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import NoticeList from "./components/notice/list";
import Qna from "./components/pages/Qna";
import Login from "./components/pages/Login";
import Join from "./components/pages/Join";

// 페이지 이동 시 항상 스크롤을 최상단(Y=0)으로 강제 스크롤하는 전용 라우팅 가드 컴포넌트
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 부드러운 스크롤 방식 대신, 즉각적이고 안정적인 탑 이동 수행
    window.scrollTo(0, 0);
  }, [pathname]); // 주소 경로(URL)가 바뀔 때마다 작동

  return null; // 화면에 렌더링할 시각 자원은 없음
}

function App() {
  // 브라우저 로컬 스토리지에서 로그인 세션 복원 시도
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("bakery_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      {/* 라우터 바로 아래에 스크롤 가드 배치 */}
      <ScrollToTop />
      
      {/* 레이아웃과 상/하단바에 로그인 상태 전파 */}
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/qna" element={<Qna />} />
          
          {/* 로그인, 회원가입 페이지에 전역 세션 핸들러 주입 */}
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/join" element={<Join user={user} setUser={setUser} />} />
          
          {/* 정의되지 않은 경로 접근 시 홈으로 리다이렉트 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
