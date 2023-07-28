import React from 'react';

const LoginPage = () => {
    const handleKakaoLogin = () => {
        console.log("카카오 로그인")
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_K_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_K_REDIRECT_URI}&response_type=code`
    };

    return (
        <main className="home">
            <section>
                LoginPage
                <form className='loginBtn_box'>
                    <a
                        aria-label="카카오톡으로 시작하기"
                        className='kakao'
                        onClick={handleKakaoLogin}
                    >
                        카카오톡으로 시작하기
                    </a>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;