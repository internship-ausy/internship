namespace service_manager_api.Dtos.Admin
{
    public class ChangePasswordDto
    {
        public string? Password { get; set; }
        public string? PasswordConfirmation { get; set; }
    }
}
