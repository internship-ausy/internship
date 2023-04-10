export class RegisterUser {
    constructor(
        public fullName: string,
        public username: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {}
}