import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HelpHeader.css";
import Login from "../../login";
import banner from "../../image/HelpHeaderBanner.jpg";

export default function HelpHeader() {
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("token") === "admin")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAdmin(Boolean(localStorage.getItem("token") === "admin"));
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  function handleLoginSuccess() {
    setIsAdmin(true);
    setIsLoggedIn(true);
  }
  const movePage = useNavigate();
  function goHome() {
    movePage("/");
  }
  function goMemberShip() {
    movePage("/membership");
  }
  function goMypage() {
    movePage("/mypage");
  }
  function goHelpUser() {
    movePage("/HelpUser");
  }
  function goAdmin() {
    movePage("/Admin");
  }
  return (
    <>
      <div id="SubHeaderLayout">
        <div onClick={goHome} id="SubLogo">
          PHOPO
        </div>
        <nav className="NavMenu">
          <Login onLoginSuccess={handleLoginSuccess} />
          {isLoggedIn ? null : (
            <button onClick={goMemberShip} className="NavMenuTitle">
              회원가입
            </button>
          )}
          {isLoggedIn && (
            <button onClick={goMypage} className="NavMenuTitle">
              마이페이지
            </button>
          )}
          <button onClick={goHelpUser} className="NavMenuTitle">
            고객지원
          </button>
          {isAdmin && (
            <button onClick={goAdmin} className="NavMenuTitle">
              관리자페이지
            </button>
          )}
        </nav>
        <br />
      </div>
      <br />
      {/* 고객지원 배너 이미지 */}
      <div id="HelpHeaderBanner">
        <img src={banner} alt="banner" id="HelpHeaderBannerImg" />
      </div>
    </>
  );
}
