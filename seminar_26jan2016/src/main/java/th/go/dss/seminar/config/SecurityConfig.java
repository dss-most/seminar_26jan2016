package th.go.dss.seminar.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


	protected void configure(HttpSecurity http) throws Exception {
	    http
			.authorizeRequests()
				.anyRequest().permitAll()
				.and()
			.formLogin()
				.loginPage("/login").permitAll()
				.loginProcessingUrl("/login").permitAll()
				.defaultSuccessUrl("/web/")
				.and()
			.logout().logoutUrl("/logout").logoutSuccessUrl("/web/");
			
	}
	
}
