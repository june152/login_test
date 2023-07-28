import React, { useEffect, useState } from 'react';
import MemberAPI from '../../apis/MemberAPI';
import Member from '../../models/Member';
import { Navigate, useNavigate } from 'react-router-dom';
import useMember from '../../hooks/useMember';

const KAKAO = "카카오"
const NAVER = "네이버"
const GOOGLE = "구글"

const InfoPage = () => {
    const {member, getMemberData} = useMember()
    const navigate = useNavigate()
    const [snsType, setSnsType] = useState("없음")
    useEffect(() => {
        getMemberData()
    }, [])
    
    if (!member) {
        window.alert("로그인이 필요합니다!!")
        return <Navigate to="/login" />
    }

    return (
        <main className="home">
            <section>
                InfoPage
                <div className="mypage_popup_inner popup_white">
                    <div className="popup_tit">
                        <h3>유저 정보</h3>
                    </div>
                    <div className="popup_con">
                        <div className="info_img">
                            <div className="img_wrap">
                                <div className="img">
                                    <img
                                        src={member?.profileImg}
                                        alt="프로필 이미지"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="default_input name">
                            <h4>닉네임</h4>
                            <div className="write_box">
                                <input
                                    type='text'
                                    disabled
                                    value={member?.nickName}
                                />
                            </div>
                        </div>
                        <div className="default_input name">
                            <h4>SNS</h4>
                            <div className="write_box">
                                <input
                                    type='text'
                                    disabled
                                    value={snsType}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InfoPage;