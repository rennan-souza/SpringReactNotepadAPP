package renan.notepadapp.services;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class EmailService {
	
	@Value("${url.reset.password}")
	private String urlResetPassword;
	
	@Value("${spring.mail.username}")
	private String emailFrom;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SpringTemplateEngine template;

	public void sendEmailRecoverPassword(String userFullName, String to, String token) {

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					"UTF-8");

			Context context = new Context();
			context.setVariable("userFullName", userFullName);
			context.setVariable("token", token);
			context.setVariable("linkRecover", urlResetPassword + token);

			String html = template.process("email/sendRecoverPassword", context);
			helper.setTo(to);
			helper.setText(html, true);
			helper.setSubject("Redefinição de senha");
			helper.setFrom(emailFrom, "NotepadAPP");

			mailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
