using Application.Interfaces.Email;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Infrastructure.Email
{
    public class SmtpEmailSender : ISmtpEmailSender
    {
        private readonly IConfiguration _configuration;
        private string host = "smtp.gmail.com";
        private int port = 587;

        public SmtpEmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendEmail(string subject, string body, string toEmail)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Mark Tallentire", "lonelycooler@googlemail.com"));
            message.To.Add(new MailboxAddress(toEmail, toEmail));

            message.Subject = subject;
            message.Body = new TextPart("html") {Text = body};


            using var client = new SmtpClient();
            client.Connect(host, port);
            client.Authenticate(_configuration["smtpSettings:username"], _configuration["smtpSettings:password"]);

            client.Send(message);
            client.Disconnect(true);
        }
    }
}