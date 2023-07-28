export default class Member {
    constructor(
        public userId: string,
        public nickName: string,
        public userPwd?: string,
        public socialType?: string,
        public email?: string,
        public profileImg?: string,
    ) {}
}