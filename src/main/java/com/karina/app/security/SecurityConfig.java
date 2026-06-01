package com.karina.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtTokenManager jwtTokenManager;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    //
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity security)throws Exception{
        security
                .cors((cors)->cors.configurationSource(corsConfigurationSource()))
                .csrf((csrf)->csrf.disable())
                //권한에 관한 설정
                .authorizeHttpRequests((a)->{
                    a
                            .requestMatchers("/notice/list").authenticated()
                            .requestMatchers("/notice/add").hasRole("ADMIN")
                            .anyRequest().permitAll()
                            ;
                })
                .formLogin((f)->f.disable())
                .logout((logout)->{

                })
                //세션을 사용하지않겠다
                .sessionManagement((s)->{
                    s.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .httpBasic((h)->h.disable())

                //filter 등록
                .addFilter(new JwtAuthencationFilter(authenticationConfiguration.getAuthenticationManager(),jwtTokenManager))
                .addFilter(new JwtLoginFilter(authenticationConfiguration.getAuthenticationManager(),jwtTokenManager))

                ;

        return security.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
