import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인 핸들러
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }
    
    setIsSubmitting(true);

    fetch("http://localhost:8080/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword
      })
    })
      .then((r) => {
        if (!r.ok) {
          if (r.status === 401) {
            throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
          }
          throw new Error("로그인 처리 중 서버 에러가 발생했습니다.");
        }
        return r.json();
      })
      .then((data) => {
        localStorage.setItem("refreshToken",data.refreshToken)
        sessionStorage.setItem("accessToken",data.accessToken)
        const sessionData = {
          username: data.username,
          name: data.name,
          email: data.email
        };
        // 웹 스토리지에 로그인 정보 캐싱
        localStorage.setItem("bakery_user", JSON.stringify(sessionData));
        
        // 전역 상태 변경 (Header 및 App 즉각 갱신 유도)
        setUser(sessionData);
        setIsSubmitting(false);
        
        alert(`환영합니다, ${sessionData.name} 님!`);
        navigate("/"); // 로그인 성공 시 메인 홈으로 부드럽게 이동
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert(err.message);
      });
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("bakery_user");
    setUser(null);
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
    <div className="bakery-container section-padding flex-center-wrapper">
      <div className="member-card-wrapper">
        {user ? (
          /* 로그인 성공 웰컴 카드 (전역 user 기준 판별) */
          <div className="bakery-card success-member-card animate-scale-up">
            <span className="success-bread-icon">🎉</span>
            <h2 className="font-serif">어서오세요, {user?.name} 님!</h2>
            <p className="success-welcome-msg">
              오늘도 하루식빵과 함께 향긋하고 쫄깃한 하루를 시작해 보세요.<br />
              회원님만을 위한 따뜻한 맞춤형 혜택 정보가 발효되고 있습니다.
            </p>
            
            <div className="membership-info-box">
              <div className="info-row">
                <span>회원 계정명 (ID)</span>
                <strong>{user?.username}</strong>
              </div>
              <div className="info-row">
                <span>회원 등급</span>
                <span className="badge-tier">패밀리 버터 🧈</span>
              </div>
              <div className="info-row">
                <span>보유 적립금</span>
                <strong>2,000 P</strong>
              </div>
              <div className="info-row">
                <span>이메일 주소</span>
                <span>{user?.email}</span>
              </div>
            </div>
            
            <div className="success-actions">
              <button onClick={() => navigate("/")} className="bakery-btn bakery-btn-primary" style={{ width: "100%" }}>
                메인 홈으로 바로가기
              </button>
              <button onClick={handleLogout} className="bakery-btn bakery-btn-outline" style={{ width: "100%" }}>
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          /* 로그인 전용 독립 카드 */
          <div className="bakery-card member-card animate-scale-up" style={{ padding: "40px 30px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>🍞</span>
              <h2 className="font-serif" style={{ fontSize: "26px", margin: "0 0 8px" }}>로그인</h2>
              <p style={{ fontSize: "14px", color: "var(--bakery-text-muted)", margin: 0 }}>
                하루식빵 멤버십 회원 로그인 페이지입니다.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="bakery-input-group">
                <label className="bakery-label">회원 아이디 (ID)</label>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">비밀번호</label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-utils" style={{ marginTop: "16px", marginBottom: "24px" }}>
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>로그인 유지하기</span>
                </label>
                <a href="#recovery" className="recovery-link">
                  비밀번호 찾기
                </a>
              </div>

              <button
                type="submit"
                className="bakery-btn bakery-btn-primary"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "로그인 중..." : "로그인하고 오븐 열기"}
              </button>

              <div style={{ textAlign: "center", marginTop: "32px", borderTop: "1px dashed var(--bakery-border)", paddingTop: "24px" }}>
                <p style={{ fontSize: "14px", color: "var(--bakery-text-muted)", margin: "0 0 8px" }}>
                  아직 하루식빵 회원이 아니신가요?
                </p>
                <Link to="/join" className="bakery-btn bakery-btn-outline" style={{ width: "100%", boxSizing: "border-box" }}>
                  간편 회원가입하러 가기
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .flex-center-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .member-card-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .form-utils {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13.5px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--bakery-text);
          cursor: pointer;
        }

        .recovery-link {
          color: var(--bakery-text-muted);
          text-decoration: none;
          transition: var(--bakery-transition);
        }

        .recovery-link:hover {
          color: var(--bakery-primary);
        }

        /* 성공 카드 디자인 */
        .success-member-card {
          padding: 48px 40px;
          text-align: center;
        }

        .success-bread-icon {
          font-size: 60px;
          margin-bottom: 24px;
          display: block;
        }

        .success-welcome-msg {
          font-size: 15px;
          color: var(--bakery-text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .membership-info-box {
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 32px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 14.5px;
          color: var(--bakery-text);
        }

        .badge-tier {
          color: var(--bakery-primary);
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Login;
