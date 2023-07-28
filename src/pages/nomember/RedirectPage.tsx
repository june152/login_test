import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios"
import MemberAPI from '../../apis/MemberAPI';
import useMember from '../../hooks/useMember';

export interface SnsType {
    snsType: "kakao" | "naver" | "google"
}

const SUCCESS = "success"
const FAIL = "fail"

const RedirectPage = () => {
    const {member, getMemberData} = useMember()
    const [searchParams] = useSearchParams();
    const K_AUTH_CODE = searchParams.get('code');
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log("code : ", K_AUTH_CODE)
        //카카오 계정 정보 로드
        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_K_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_K_REDIRECT_URI}&code=${K_AUTH_CODE}`,
        {
            headers:
            {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }
        ).then((res) => {
            console.log("res.data.access_token : ", res.data.access_token)
            MemberAPI.getUserInfoToAccessTokenTwo({
                accessToken: res.data.access_token,
            }).then((res) => {
                console.log("Info2 id : ", res.id)
                //가입된 계정인지 체크 필요
                MemberAPI.login({
                    userId: String(res.id),
                    nickName: res.properties.nickname,
                    profileImg: res.properties.profile_image,
                    socialType: 'kakao',
                }).then((res) => {
                    console.log("res : ", res)
                    if (res.message === FAIL) { //회원아님
                        window.alert("회원 아님")
                        getMemberData()
                        navigate("/home", {replace: true})
                    } else {
                        window.alert("로그인 완료")
                        getMemberData()
                        navigate("/home", {replace: true})
                    }
                })
            })
        })
    }, [])

    return (
        <div>
            RedirectPage
        </div>
    );
};

export default RedirectPage;