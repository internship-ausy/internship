export class ChangePassword {
  constructor(
      public emailToken: string,
      public newPassword: string,
  ) {}
}
