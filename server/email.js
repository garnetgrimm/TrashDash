Accounts.emailTemplates.siteName = "TrashDash";
Accounts.emailTemplates.from     = "TrashDash <admin@trashdash.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[TrashDash] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@trashdash.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email.`;

    return emailBody;
  }
};