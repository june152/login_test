import React, { useEffect } from 'react';
import useMember from '../../hooks/useMember';
import { useNavigate } from 'react-router-dom';

const LogOutPage = () => {
    const navigate = useNavigate()
    const { logOut } = useMember()
    
    useEffect(() => {
        logOut()
        window.alert("로그아웃했습니다.")
        navigate("/home", {replace: true})
    }, [])

    return (
        <div>
            LogOut
        </div>
    );
};

export default LogOutPage;