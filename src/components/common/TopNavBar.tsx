import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../hooks/useMember";


// 탭을 다섯 개의 문자열 중 하나로 강제
export type TopNavTab =
  | "Home"
  | "Info"
  | "ETC"
  | "Login"
  | "LogOut"
  | "Join"

/**
 * 상단 네비게이션 바
 * @param tab 현재 선택된 탭
 * @param onTabChange 탭의 변경을 알리는 함수
 */
const TopNavBar = ({
  tab,
  onTabChange,
}: {
  tab?: TopNavTab;
  onTabChange: (tab: TopNavTab) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { member } = useMember()
  
    // 모든 탭을 배열로 선언
    const tabs: TopNavTab[] = member ? [
      "Home",
      "Info",
      "ETC",
      "LogOut",
      "Join"
    ] : [
      "Home",
      "Info",
      "ETC",
      "Login",
      "Join"
    ];

  return (
    <header>
      <NavBar tab={tab} onTabChange={onTabChange} divideTabs={tabs} />
    </header>
  );
};

/**
 * 네비게이션 바
 * @param tab 현재 선택된 탭
 * @param onTabChange 탭의 변경을 알리는 함수
 */
const NavBar = ({
  tab,
  onTabChange,
  divideTabs,
}: {
  tab?: TopNavTab;
  onTabChange: (tab: TopNavTab) => void;
  divideTabs: TopNavTab[]
}): JSX.Element => {
  return (
    <ul className="gnb">
      {divideTabs.map((e, index) => (
        <li key={index} className={e === tab ? "on" : ""}>
          <a href="#" onClick={() => onTabChange(e)}>
            {e}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TopNavBar;
