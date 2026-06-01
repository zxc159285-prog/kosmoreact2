import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Join({ user, setUser }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 회원가입 폼 입력값 (MemberDTO와 100% 동일한 구조)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // 회원가입 처리 핸들러 (백엔드 /member/join API 연동)
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !passwordCheck || !name || !email) {
      alert("모든 필드를 기재해 주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!agreeTerms) {
      alert("이용약관 및 개인정보 동의는 필수 사항입니다.");
      return;
    }

    setIsSubmitting(true);

    const newMemberPayload = {
      username,
      password,
      passwordCheck,
      name,
      email
    };

    fetch("http://localhost:8080/member/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMemberPayload)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("회원가입 처리 중 서버 에러가 발생했습니다.");
        }
        return res.json();
      })
      .then((data) => {
        alert(`반갑습니다, ${data.name} 님! 하루식빵 가입이 성공적으로 완료되었습니다.`);
        // 3. 메인 홈으로 안전 이동
        navigate("/");
      })
      .catch((err) => {
        console.error("회원가입 에러:", err);
        alert(err.message || "서버와 연결할 수 없거나 이미 가입된 아이디입니다.");
      });
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("bakery_user");
    setUser(null);
  };

  return (
    <div className="bakery-container section-padding flex-center-wrapper">
      <div className="member-card-wrapper">
        {user ? (
          /* 회원가입 성공 / 가입완료 화면 (전역 user 기준 판별) */
          <div className="bakery-card success-member-card animate-scale-up">
            <span className="success-bread-icon">🎉</span>
            <h2 className="font-serif">환영합니다, {user?.name} 님!</h2>
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
          /* 회원가입 전용 독립 카드 */
          <div className="bakery-card member-card animate-scale-up" style={{ padding: "40px 30px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>🌾</span>
              <h2 className="font-serif" style={{ fontSize: "26px", margin: "0 0 8px" }}>회원가입</h2>
              <p style={{ fontSize: "14px", color: "var(--bakery-text-muted)", margin: 0 }}>
                하루식빵 멤버십 가입을 통해 따뜻한 적립금 혜택을 챙겨보세요.
              </p>
            </div>

            <form onSubmit={handleSignupSubmit}>
              <div className="bakery-input-group">
                <label className="bakery-label">가입 희망 아이디 (ID)</label>
                <input
                  type="text"
                  placeholder="영문/숫자 조합 아이디"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">이름</label>
                <input
                  type="text"
                  placeholder="성함을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">이메일 주소</label>
                <input
                  type="email"
                  placeholder="example@harubread.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">비밀번호 확인</label>
                <input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  className="bakery-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="terms-checkbox" style={{ marginTop: "20px", marginBottom: "24px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    disabled={isSubmitting}
                    style={{ marginTop: "3px" }}
                  />
                  <span style={{ fontSize: "13.5px", color: "var(--bakery-text)" }}>
                    [필수] 하루식빵 약관 및 개인정보 수집 이용에 동의합니다.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bakery-btn bakery-btn-primary"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "가입 등록 중..." : "새로운 멤버십 등록하기"}
              </button>

              <div style={{ textAlign: "center", marginTop: "32px", borderTop: "1px dashed var(--bakery-border)", paddingTop: "24px" }}>
                <p style={{ fontSize: "14px", color: "var(--bakery-text-muted)", margin: "0 0 8px" }}>
                  이미 계정이 있으신가요?
                </p>
                <Link to="/login" className="bakery-btn bakery-btn-outline" style={{ width: "100%", boxSizing: "border-box" }}>
                  로그인하러 가기
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

export default Join;
