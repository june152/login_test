import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Member from '../models/Member';
import MemberAPI from '../apis/MemberAPI';
import MemberContext from './MemberContext';

const MemberContextProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const [member, setMember] = useState<Member | undefined>()
    useEffect(() => {
        getMemberData()
    }, [])

    const getMemberData = () => {
        console.log("getMemberData")
        MemberAPI.getUserData({}).then((res) => {
            setMember(res)
        })
    }

    const logOut = () => {
        console.log("Logout")
        MemberAPI.logout().then((res) => {
            console.log("logout resp : ", res)
            setMember(undefined)
        })
    }

    return (
        <MemberContext.Provider value={{member, getMemberData, logOut}}>
            {children}
        </MemberContext.Provider>
    );
};

export default MemberContextProvider;