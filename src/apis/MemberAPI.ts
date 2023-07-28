import axios from 'axios';
import { serialize } from 'object-to-formdata';
import { plainToInstance } from 'class-transformer';
import Member from '../models/Member';

interface GetAllParams {
    userId?: string,
    nickName?: string,
    userPwd?: string,
    socialType?: string,
    email?: string,
    profileImg?: string,
    refreshToken?: string,
}

interface AccessToken {
    access_token: string,
}

interface AccessToken2 {
    accessToken: string,
}

export interface Properties {
    nickname: string,
    profile_image: string,
    thumbnail_image: string,
}

export interface KakaoResponse {
    id: string,
    properties: Properties,
    socialType?: string,
}

export interface UserInfo {
    id: string,
    nickname: string,
    profile_image: string,
    thumbnail_image: string,
    socialType?: string,
}

export interface LoginResult {
    access_token: string,
    message: string,
}

export interface RefreshResponse {
    success: boolean,
    refreshToken?: string,
}

const getUserData = (params: GetAllParams) => {
    return axios.post("/api/member/getData", { params, withCredentials: true }).then((res) => {
        return res.data as Member
    })
}

const login = async (params: GetAllParams) => {
    return await axios.post("/api/member/login", serialize(params))
    .then((res) => res.data as LoginResult)
}

const getUserInfoToAccessToken = (params: AccessToken) => {
    return axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            "Authorization" : `Bearer ${params.access_token}`,
            "Content-Type" : 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: {
            property_keys: ['kakao_account.profile']
        }
    }).then((res) => res.data as KakaoResponse)
}

const getUserInfoToAccessTokenTwo = (params: AccessToken2) => {
    return axios.get("/api/member/getUserInfoToAccessToken", {params}).then((res) => res.data as KakaoResponse)
}

//ID값 중복여부 확인
const idCheck = (params: UserInfo) => {
    return axios.get("/api/member/idCheck", { params }).then((res) => {
        return res.data
    })
}

//Token refresh
const refresh = async () => {
    return await axios.post("/api/member/refresh", {
        withCredentials: true
    })
    .then((res) => res.data as RefreshResponse)
}

const MemberAPI = {
    login,
    getUserInfoToAccessToken,
    idCheck,
    refresh,
    getUserInfoToAccessTokenTwo,
    getUserData,
}

export default MemberAPI