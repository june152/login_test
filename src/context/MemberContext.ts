import React from 'react';
import Member from '../models/Member';

interface MemberState {
    member?: Member,
    getMemberData: () => any,
    logOut: () => any
}

const initialState: MemberState = {
    getMemberData() {},
    logOut() {},
}

const MemberContext = React.createContext<MemberState>(initialState)

export default MemberContext;