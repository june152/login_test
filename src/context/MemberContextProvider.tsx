import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Member from '../models/Member';
import MemberAPI from '../apis/MemberAPI';
import MemberContext from './MemberContext';

const MemberContextProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const [member, setMember] = useState<Member | undefined>()
    useEffect(() => {
        MemberAPI.getUserData({}).then((res) => {
            setMember(res)
        })
    }, [])

    const logOut = () => {

    }

    return (
        <MemberContext.Provider value={{member, logOut}}>
            {children}
        </MemberContext.Provider>
    );
};

export default MemberContextProvider;