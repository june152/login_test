import React, { useEffect, useState } from 'react';
import MemberAPI from '../../apis/MemberAPI';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState("")

    useEffect(() => {
        MemberAPI.refresh().then((res) => {
            console.log("refresh 결과 : ", res)
            setIsLogin(String(res.success))
        })
    }, [])

    return (
        <main className="home">
            <section>
                HomePage, 로그인 상태 : {isLogin}
            </section>
        </main>
    );
};

export default HomePage;