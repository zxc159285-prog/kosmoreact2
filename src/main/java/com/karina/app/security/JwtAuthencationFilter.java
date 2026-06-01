package com.karina.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthencationFilter extends BasicAuthenticationFilter {

    private  JwtTokenManager jwtTokenManager;
    public JwtAuthencationFilter(AuthenticationManager manager,JwtTokenManager jwtTokenManager){
        super(manager);
        this.jwtTokenManager=jwtTokenManager;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader("Authorization");

        if(token != null) {
           // String[] ar = token.split("");
            token = token.substring(token.indexOf(" ") + 1);

            try {
                Authentication authentication=this.jwtTokenManager.getAuthenticationByToken(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }


        }
        chain.doFilter(request,response);
    }
}
