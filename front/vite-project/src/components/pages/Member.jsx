import React, { useState } from "react";

function Member() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인 폼 입력값 (DTO에 맞춰 username으로 통합)
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 회원가입 폼 입력값 (MemberDTO 필드 이름과 100% 매핑)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // 로그인 처리 핸들러 (아이디 기준)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }
    
    setIsSubmitting(true);

    // 로그인 시뮬레이션 처리
    setTimeout(() => {
      setIsLoggedIn(true);
      setRegisteredUser({
        username: loginUsername,
        name: loginUsername + " 회원",
        email: loginUsername + "@harubread.com"
      });
      setIsSubmitting(false);
    }, 600);
  };

  // 회원가입 처리 핸들러 (실제 MemberDTO 수신 백엔드 API 연동)
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

    // MemberDTO 규격과 동일한 필드로 Payload 객체 구성
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
        console.log("회원가입 성공 응답 데이터:", data);
        alert(`반갑습니다, ${data.name} 님! 하루식빵 가입이 완료되었습니다.`);
        
        // 가입 성공 정보로 즉시 로그인 연동
        setIsLoggedIn(true);
        setRegisteredUser(data);
        setIsSubmitting(false);

        // 입력 폼 필드 초기화
        setUsername("");
        setPassword("");
        setPasswordCheck("");
        setName("");
        setEmail("");
        setAgreeTerms(false);
      })
      .catch((err) => {
        console.error("회원가입 에러:", err);
        alert(err.message || "서버와 연결할 수 없거나 이미 가입된 아이디입니다.");
        setIsSubmitting(false);
      });
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRegisteredUser(null);
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
    <div className="bakery-container section-padding flex-center-wrapper">
      <div className="member-card-wrapper">
        {isLoggedIn ? (
          /* 로그인 성공 / 가입완료 화면 */
          <div className="bakery-card success-member-card animate-scale-up">
            <span className="success-bread-icon">🎉</span>
            <h2 className="font-serif">어서오세요, {registeredUser?.name} 님!</h2>
            <p className="success-welcome-msg">
              오늘도 하루식빵과 함께 향긋하고 쫄깃한 하루를 시작해 보세요.<br />
              회원님만을 위한 따뜻한 맞춤형 혜택 정보가 발효되고 있습니다.
            </p>
            
            <div className="membership-info-box">
              <div className="info-row">
                <span>회원 계정명 (ID)</span>
                <strong>{registeredUser?.username}</strong>
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
                <span>{registeredUser?.email}</span>
              </div>
            </div>
            
            <div className="success-actions">
              <button onClick={() => window.location.reload()} className="bakery-btn bakery-btn-primary" style={{ width: "100%" }}>
                마이페이지 바로가기
              </button>
              <button onClick={handleLogout} className="bakery-btn bakery-btn-outline" style={{ width: "100%" }}>
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          /* 로그인 / 회원가입 폼 카드 */
          <div className="bakery-card member-card animate-fade-in">
            {/* 탭 컨트롤 헤더 */}
            <div className="member-tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
                disabled={isSubmitting}
              >
                로그인
              </button>
              <button
                className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
                disabled={isSubmitting}
              >
                회원가입
              </button>
            </div>

            {activeTab === "login" ? (
              /* 로그인 폼 패널 */
              <div className="tab-panel animate-panel">
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

                  <div className="form-utils">
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
                    style={{ width: "100%", marginTop: "20px" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "로그인 중..." : "로그인하고 오븐 열기"}
                  </button>
                </form>
              </div>
            ) : (
              /* 회원가입 폼 패널 (MemberDTO 기준 설계) */
              <div className="tab-panel animate-panel">
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

                  <div className="terms-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        disabled={isSubmitting}
                      />
                      <span>[필수] 하루식빵 약관 및 개인정보 수집 이용에 동의합니다.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bakery-btn bakery-btn-primary"
                    style={{ width: "100%", marginTop: "28px" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "가입 등록 중..." : "새로운 멤버십 등록하기"}
                  </button>
                </form>
              </div>
            )}
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

        /* 탭 디자인 */
        .member-tabs {
          display: flex;
          border-bottom: 1px solid var(--bakery-border);
          background-color: var(--bakery-secondary);
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 16px 0;
          font-size: 16px;
          font-weight: 700;
          color: var(--bakery-text-muted);
          cursor: pointer;
          transition: var(--bakery-transition);
          position: relative;
        }

        .tab-btn:hover {
          color: var(--bakery-primary);
        }

        .tab-btn.active {
          color: var(--bakery-primary);
          background-color: var(--bakery-card-bg);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 2px;
          background-color: var(--bakery-primary);
        }

        .tab-panel {
          padding: 40px 30px;
        }

        .form-utils {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13.5px;
          margin-top: 16px;
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

        .terms-checkbox {
          display: flex;
          font-size: 13.5px;
          color: var(--bakery-text);
          margin-top: 20px;
          cursor: pointer;
        }

        .terms-checkbox label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
        }

        .terms-checkbox input {
          margin-top: 3px;
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

        /* 애니메이션 */
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-panel {
          animation: panelFadeIn 0.3s ease-out;
        }

        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Member;
