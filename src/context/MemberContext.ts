import React from 'react';
import Member from '../models/Member';

interface MemberState {
    member?: Member,
    logOut: () => any
}

const initialState: MemberState = {
    logOut() {},
}

const MemberContext = React.createContext<MemberState>(initialState)

export default MemberContext;