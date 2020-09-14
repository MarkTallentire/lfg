using System.Collections.Generic;

namespace Application.Interfaces.Email
{
    public interface ISmtpEmailSender
    {
        void SendEmail(string subject, string body, string toEmail);
    }
}