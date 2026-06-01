import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { to: "/", label: "홈" },
    { to: "/products", label: "상품소개" },
    { to: "/notice", label: "공지사항" },
    { to: "/qna", label: "Q&A 게시판" },
  ];

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("bakery_user");
    setUser(null);
    alert("안전하게 로그아웃 되었습니다. 다음에 또 맛있는 빵으로 찾아뵐게요!");
    setIsOpen(false);
    navigate("/"); // 로그아웃 시 메인 홈으로 안전 이동
  };

  return (
    <header className="bakery-header">
      <div className="bakery-container header-inner">
        {/* 로고 영역 (홈으로 이동) */}
        <Link to="/" className="logo-section" onClick={() => setIsOpen(false)}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0" />
            <path d="M7 12a5 5 0 0110 0" strokeDasharray="2 2" />
            <path d="M12 3v18" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
          <span className="logo-text font-serif">하루식빵</span>
          <span className="logo-subtext">HARU BREAD</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="desktop-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* 로그인 상태에 따른 조건부 우측 퀵 메뉴 렌더링 */}
          {user ? (
            /* 로그인 완료 상태의 헤더 UI */
            <div className="user-header-menu">
              <span className="user-welcome-badge">
                🍞 <strong>{user.name}</strong>님 환영합니다!
              </span>
              <button onClick={handleLogout} className="bakery-btn bakery-btn-outline header-logout-btn">
                로그아웃
              </button>
            </div>
          ) : (
            /* 로그아웃 상태의 헤더 UI */
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                style={{ marginLeft: "6px" }}
              >
                로그인
              </NavLink>
              <NavLink
                to="/join"
                className={({ isActive }) => `bakery-btn bakery-btn-primary nav-member-btn ${isActive ? "active" : ""}`}
              >
                회원가입
              </NavLink>
            </>
          )}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="메뉴 토글">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 네비게이션 드롭다운 */}
      {isOpen && (
        <div className="mobile-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* 모바일 환경 분기 처리 */}
          {user ? (
            <div className="mobile-user-section">
              <div className="mobile-welcome-text">
                🍞 {user.name}님 환영합니다!
              </div>
              <button onClick={handleLogout} className="mobile-nav-link mobile-member-btn" style={{ borderColor: "var(--bakery-text-muted)", color: "var(--bakery-text)" }}>
                안전 로그아웃
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                로그인
              </NavLink>
              <NavLink
                to="/join"
                className={({ isActive }) => `mobile-nav-link mobile-member-btn ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                회원가입
              </NavLink>
            </>
          )}
        </div>
      )}

      <style>{`
        .bakery-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: rgba(250, 247, 242, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--bakery-border);
          box-shadow: 0 4px 20px rgba(78, 61, 48, 0.02);
          transition: var(--bakery-transition);
        }
        
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: var(--bakery-primary);
        }

        .logo-text {
          font-size: 22px;
          font-weight: 900;
          color: var(--bakery-text);
          letter-spacing: -0.5px;
        }

        .logo-subtext {
          font-size: 11px;
          font-weight: 700;
          color: var(--bakery-text-muted);
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-link {
          text-decoration: none;
          padding: 10px 18px;
          font-size: 15px;
          font-weight: 500;
          color: var(--bakery-text);
          cursor: pointer;
          border-radius: 8px;
          transition: var(--bakery-transition);
        }

        .nav-link:hover {
          color: var(--bakery-primary);
          background-color: rgba(212, 140, 69, 0.05);
        }

        .nav-link.active {
          color: var(--bakery-primary);
          font-weight: 700;
          background-color: var(--bakery-secondary);
        }

        .nav-member-btn {
          padding: 8px 20px;
          font-size: 14px;
          margin-left: 10px;
        }

        .nav-member-btn.active {
          background-color: var(--bakery-primary-hover);
        }

        /* 로그인 유저 세션 배지 스타일 */
        .user-header-menu {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: 10px;
        }

        .user-welcome-badge {
          font-size: 14.5px;
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          color: var(--bakery-text);
          padding: 6px 16px;
          border-radius: 30px;
        }

        .header-logout-btn {
          padding: 6px 16px;
          font-size: 13.5px;
        }

        .mobile-user-section {
          padding: 10px 20px;
          border-bottom: 1px dashed var(--bakery-border);
          margin-bottom: 10px;
        }

        .mobile-welcome-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--bakery-primary);
          margin-bottom: 8px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--bakery-text);
          cursor: pointer;
          padding: 6px;
        }

        .mobile-nav {
          display: none;
          background-color: var(--bakery-card-bg);
          border-bottom: 1px solid var(--bakery-border);
          padding: 16px 5%;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .mobile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          text-decoration: none;
          padding: 14px 20px;
          font-size: 16px;
          font-weight: 500;
          color: var(--bakery-text);
          cursor: pointer;
          border-radius: 8px;
          margin-bottom: 4px;
          transition: var(--bakery-transition);
          box-sizing: border-box;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background-color: var(--bakery-secondary);
          color: var(--bakery-primary);
          font-weight: 700;
        }

        .mobile-member-btn {
          margin-top: 10px;
          border: 1px solid var(--bakery-primary);
          color: var(--bakery-primary);
          text-align: center;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .mobile-nav {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
