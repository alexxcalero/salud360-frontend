package pe.edu.pucp.salud360.seguridad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //.cors() // 👈 Esto activa el CORS configurado en WebConfig
                .csrf().disable() // ❗ Solo para pruebas; idealmente manejar token CSRF luego
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/usuarios/**", "/api/medicos/**").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(); // Soporta autenticación básica vía Postman
        return http.build();
    }
}


