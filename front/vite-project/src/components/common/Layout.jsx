import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ user, setUser, children }) {
  return (
    <div className="bakery-layout-wrapper">
      {/* 상단 네비게이션 헤더에 로그인 상태 전달 */}
      <Header user={user} setUser={setUser} />

      {/* 메인 콘텐츠 페이지 렌더링 영역 */}
      <main className="bakery-main-content">
        {children}
      </main>

      {/* 하단 정보 푸터 */}
      <Footer />

      <style>{`
        .bakery-layout-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--bakery-bg);
        }

        .bakery-main-content {
          flex: 1 0 auto;
          animation: pageTransition 0.4s ease-out;
        }

        @keyframes pageTransition {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;
