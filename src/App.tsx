import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import TopNavBar, { TopNavTab } from "./components/common/TopNavBar";
import LoginPage from "./pages/nomember/LoginPage";
import JoinPage from "./pages/nomember/JoinPage";
import RedirectPage from "./pages/nomember/RedirectPage";
import HomePage from "./pages/member/HomePage";
import InfoPage from "./pages/member/InfoPage";
import EtcPage from "./pages/member/EtcPage";
import LogOutPage from "./pages/member/LogOutPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<TopNavTab>();

  // 주소 변경 시 탭 변경
  useEffect(() => {
    if (location.pathname.includes("/home")) {
      setTab("Home");
    } else if (location.pathname.includes("/info")) {
      setTab("Info");
    } else if (location.pathname.includes("/etc")) {
      setTab("ETC");
    } else if (location.pathname.includes("/login")) {
      setTab("Login");
    } else if (location.pathname.includes("/logout")) {
      setTab("LogOut");
    } else if (location.pathname.includes("/join")) {
      setTab("Join");
    }
  }, [location])

  const handleTabChange = (tab: TopNavTab) => {
    switch (tab) {
      case "Home":
        navigate("/home", { replace: true });
        break;
      case "Info":
        navigate("/info", { replace: true });
        break;
      case "ETC":
        navigate("/etc", { replace: true });
        break;
      case "Login":
        navigate("/login", { replace: true });
        break;
      case "LogOut":
        navigate("/logout", { replace: true });
        break;
      case "Join":
        navigate("/join", { replace: true });
        break;
      default:
        navigate("/home", { replace: true });
        break;
    }
  }

  const routes = useRoutes([
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/logout", element: <LogOutPage /> },
    { path: "/join", element: <JoinPage /> },
    { path: "/redirect", element: <RedirectPage /> },
    {
      path: "/redirect/*",
      children: [
        { path: ":code", element: <RedirectPage /> }
      ]
    },
    {
      path: "/home/*",
      children: [
        {
          path: "*",
          element: <Navigate to="/home/1" replace />,
        },
        { path: ":page", element: <HomePage /> },
      ],
    },
    {
      path: "/info/*",
      children: [
        {
          path: "*",
          element: <Navigate to="/info/1" replace />,
        },
        { path: ":page", element: <InfoPage /> },
      ],
    },
    {
      path: "/etc/*",
      children: [
        {
          path: "*",
          element: <Navigate to="/etc/1" replace />,
        },
        { path: ":page", element: <EtcPage /> },
      ],
    },
  ])

  return (
    <div className="Wrapper">
      <TopNavBar tab={tab} onTabChange={handleTabChange} />
      {routes}
    </div>
  );
}

export default App;
