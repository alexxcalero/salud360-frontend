package pe.edu.pucp.salud360.seguridad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //.cors()  // Esto activa el CORS configurado en WebConfig
                .csrf().disable()  // Solo para pruebas; idealmente manejar token CSRF luego
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/usuarios/**",
                                "/api/medicos/**",
                                "/api/personas/**",
                                "/api/tiposDocumentos/**",
                                "/api/permisos/**",
                                "/api/roles/**").permitAll()  // Agregar los endpoints a probar, sino dara error
                        .anyRequest().authenticated()
                )
                .httpBasic();  // Soporta autenticación básica vía Postman
        return http.build();
    }

    // Para poder hashear las contrasenhas de usuario antes de guardarlas en la BD
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Esto es para poder hashear las contrasenhas de los usuarios, y a su vez poder autenticar las peticiones de Postman
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(
                User.withUsername("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .build()
        );
        return manager;
    }
}
