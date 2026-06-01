package com.karina.app.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.karina.app.member.MemberDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    private ObjectMapper objectMapper = new ObjectMapper();

    private JwtTokenManager jwtTokenManager;

    private AuthenticationManager authenticationManager;

    public JwtLoginFilter(AuthenticationManager authenticationManager,JwtTokenManager jwtTokenManager ){
        this.setFilterProcessesUrl("/member/login");
        this.authenticationManager=authenticationManager;
        this.jwtTokenManager=jwtTokenManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(memberDTO.getUsername(),memberDTO.getPassword());
            return authenticationManager.authenticate(token);
        }
        catch (IOException e) {
          //  throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("로그인 성공");
        String accessToken=jwtTokenManager.createAccessToken(authResult);
        String refreshToken=jwtTokenManager.createRefreshToken(authResult);

        //응답헤더 설정 및 바디설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        //응답 데이터를 json구조로 만들기
        Map<String,Object> map=new HashMap<>();
        map.put("accessToken",accessToken);
        map.put("refreshToken",refreshToken);

        //응답으로 전송
        response.getWriter().write(objectMapper.writeValueAsString(map));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        System.out.println("로그인 실패");
    }
}
