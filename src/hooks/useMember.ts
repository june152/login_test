import { useContext } from "react";

import MemberContext from "../context/MemberContext";

const useMember = () => useContext(MemberContext);

export default useMember;