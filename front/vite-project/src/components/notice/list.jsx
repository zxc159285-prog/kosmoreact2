import React, { useState, useEffect, useRef } from "react";
import "./list.css";
import {useNavigate} from "react-router-dom";

function NoticeList() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    // 공지 등록 모드 및 전송 중 상태 제어 (입력 폼 상태 useState는 전면 제거)
    const [isWriting, setIsWriting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 비제어 컴포넌트 관리를 위한 useRef 참조자 생성
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    // 공지사항 목록 불러오기 공통 함수
    const loadNotices = () => {
        setLoading(true);
        fetch("http://localhost:8080/notice/list",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+sessionStorage.getItem("accessToken")
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("서버와의 통신이 원활하지 않습니다.");
                }
                return res.json();
            })
            .then((data) => {
                console.log("공지사항 목록 데이터:", data);
                // 최신 글이 항상 상단에 나오도록 ID 내림차순(역순)으로 정렬
                const sortedData = (data || []).sort((a, b) => b.id - a.id);
                setNotices(sortedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("네트워크 또는 CORS 에러 발생:", err);
                setError(err.message || "데이터를 불러오는 중 에러가 발생했습니다.");
                setLoading(false);
            });
    };

    // 컴포넌트 마운트 시 최초 데이터 불러오기
    useEffect(() => {
        loadNotices();
    }, []);

    // 날짜 포맷팅 함수 (예: 2026. 05. 28. 14:57)
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch (e) {
            return dateString;
        }
    };

    // 테이블 행 클릭 시 내용 보기 토글
    const handleRowClick = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    // useRef 값 참조 및 공지사항 등록 통신 처리
    const handleWriteSubmit = (e) => {
        e.preventDefault();
        
        // useRef 참조자를 통한 실시간 Dom 값 추출
        const titleValue = titleRef.current?.value;
        const contentValue = contentRef.current?.value;

        if (!titleValue || !contentValue) {
            alert("모든 빈칸을 채워주세요.");
            return;
        }

        setIsSubmitting(true);

        // 오직 title과 content만 실어서 JSON 데이터 전송
        const newNotice = {
            title: titleValue,
            content: contentValue
        };

        fetch("http://localhost:8080/notice/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNotice)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("공지 등록 중 서버 에러가 발생했습니다.");
                }
                return res.json();
            })
            .then((data) => {
                console.log("등록 성공 데이터:", data);
                // 작성 창 닫기 및 다시 목록 갱신 (비제어 컴포넌트이므로 입력 필드 강제 지우기 불필요)
                setIsWriting(false);
                setIsSubmitting(false);
                loadNotices();

            })
            .catch((err) => {
                alert(err.message || "공지사항 등록에 실패했습니다.");
                setIsSubmitting(false);
            });
    };

    // 1. 공지 등록 작성 폼 화면
    if (isWriting) {
        return (
            <div className="notice-container">
                <div className="notice-header">
                    <div className="notice-title-section">
                        <h2 className="notice-title font-serif">📢 신규 공지사항 등록</h2>
                    </div>
                    <button className="bakery-btn bakery-btn-outline" onClick={() => setIsWriting(false)} style={{ padding: "8px 18px" }}>
                        ← 목록으로 가기
                    </button>
                </div>

                <div className="bakery-card" style={{ padding: "32px", border: "1px solid var(--bakery-border)" }}>
                    <form onSubmit={handleWriteSubmit}>
                        
                        {/* 작성자는 입력 필드에서 전면 삭제하고 안내 문구로 깔끔히 정렬 */}
                        <div className="bakery-input-group" style={{ marginBottom: "24px" }}>
                            <label className="bakery-label" style={{ color: "var(--bakery-primary)" }}>작성 정보</label>
                            <div style={{
                                padding: "12px 20px",
                                backgroundColor: "var(--bakery-secondary)",
                                border: "1px dashed var(--bakery-secondary-border)",
                                borderRadius: "10px",
                                fontSize: "14.5px",
                                fontWeight: "600",
                                color: "var(--bakery-text)"
                            }}>
                                👤 작성 권한: <strong>관리자 (자동 지정)</strong>
                            </div>
                        </div>

                        <div className="bakery-input-group">
                            <label className="bakery-label">공지 제목</label>
                            <input
                                type="text"
                                className="bakery-input"
                                placeholder="공지사항 제목을 기재해 주세요"
                                ref={titleRef}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="bakery-input-group">
                            <label className="bakery-label">공지 세부 내용</label>
                            <textarea
                                className="bakery-input"
                                rows="8"
                                style={{ resize: "vertical" }}
                                placeholder="게시할 공지사항 상세 내용을 입력해 주세요"
                                ref={contentRef}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <button
                                type="submit"
                                className="bakery-btn bakery-btn-primary"
                                style={{ flex: 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "공지사항 등록 중..." : "📢 공지사항 발행하기"}
                            </button>
                            <button
                                type="button"
                                className="bakery-btn bakery-btn-outline"
                                onClick={() => setIsWriting(false)}
                                style={{ flex: 0.3 }}
                                disabled={isSubmitting}
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // 2. 로딩 상태 화면
    if (loading) {
        return (
            <div className="notice-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>공지사항 목록을 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    // 3. 에러 상태 화면
    if (error) {
        return (
            <div className="notice-container">
                <div className="notice-header">
                    <div className="notice-title-section">
                        <h2 className="notice-title">공지사항</h2>
                    </div>
                    <button
                        className="bakery-btn bakery-btn-primary"
                        onClick={() => setIsWriting(true)}
                        style={{ padding: "8px 20px", fontSize: "14px" }}
                    >
                        📝 신규 공지 등록
                    </button>
                </div>
                <div className="empty-container">
                    <span className="empty-icon">⚠️</span>
                    <p className="empty-text">에러가 발생했습니다</p>
                    <p className="empty-subtext">{error}</p>
                    <button className="bakery-btn bakery-btn-outline" onClick={loadNotices} style={{ marginTop: "20px" }}>
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    // 4. 정상 데이터 리스트 화면
    return (
        <div className="notice-container">
            <div className="notice-header">
                <div className="notice-title-section">
                    <h2 className="notice-title">공지사항 목록</h2>
                    <span className="notice-count">총 {notices.length}개</span>
                </div>
                {/* 📝 신규 공지등록 단추 */}
                <button
                    className="bakery-btn bakery-btn-primary"
                    onClick={() => setIsWriting(true)}
                    style={{ padding: "8px 20px", fontSize: "14px" }}
                >
                    📝 신규 공지 등록
                </button>
            </div>

            {notices.length === 0 ? (
                // 공지사항이 없는 경우
                <div className="empty-container">
                    <span className="empty-icon">📝</span>
                    <p className="empty-text">등록된 공지사항이 없습니다.</p>
                    <p className="empty-subtext">새로운 소식을 준비 중입니다. 잠시만 기다려 주세요!</p>
                </div>
            ) : (
                // 공지사항 테이블 리스트
                <div className="notice-table-wrapper">
                    <table className="notice-table">
                        <thead>
                            <tr>
                                <th style={{ width: "80px", textAlign: "center" }}>번호</th>
                                <th>제목</th>
                                <th style={{ width: "140px" }}>작성자</th>
                                <th style={{ width: "180px" }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice) => {
                                const isExpanded = expandedId === notice.id;
                                return (
                                    <React.Fragment key={notice.id}>
                                        {/* 게시글 기본 행 */}
                                        <tr
                                            className={`notice-row ${isExpanded ? "active" : ""}`}
                                            onClick={() => handleRowClick(notice.id)}
                                        >
                                            <td className="col-id">{notice.id}</td>
                                            <td className="col-title">{notice.title}</td>
                                            <td className="col-author">{notice.author}</td>
                                            <td className="col-date">{formatDate(notice.createAt)}</td>
                                        </tr>
                                        {/* 클릭 시 슬라이드 다운되는 상세 내용 행 */}
                                        {isExpanded && (
                                            <tr className="detail-row">
                                                <td colSpan={4}>
                                                    <div className="detail-content">
                                                        <p className="detail-text">{notice.content || "상세 내용이 없습니다."}</p>
                                                        <div className="detail-meta">
                                                            <span className="meta-item">
                                                                작성자: <strong>{notice.author}</strong>
                                                            </span>
                                                            <span className="meta-item">
                                                                등록일: <strong>{formatDate(notice.createAt)}</strong>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default NoticeList;