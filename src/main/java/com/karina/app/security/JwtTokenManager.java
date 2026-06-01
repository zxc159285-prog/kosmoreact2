package com.karina.app.security;

import com.karina.app.member.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenManager {

    @Value("${jwt.accessValidTime}")
    private Long accessValidTime;
    @Value("${jwt.refreshValidTime}")
    private Long refreshValidTime;
    @Value("${jwt.issur}")
    private String issur;
    @Value("${jwt.secretKey}")
    private String secretKey;

    private SecretKey key;

    @Autowired
    private MemberRepository memberRepository;

    //생성자가 실행된 후 실행
    @PostConstruct
    public void init(){
        this.key=Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String createAccessToken(Authentication authentication){
        return this.createToken(authentication,accessValidTime);
    }
    public String createRefreshToken(Authentication authentication){
        return this.createToken(authentication,refreshValidTime);
    }

    //토큰을 생성하는 메서드
    private String createToken(Authentication authentication,Long validTime){

        //라이브러리
       return Jwts
                .builder()
                //사용자 정보
                .subject(authentication.getName())
                //더 추가하고 싶은 정보는 claim에 넣는다
                //.claim()
                //토큰 생성 시간
                .issuedAt(new Date())
                //토큰의 유효시간
                .expiration(new Date(System.currentTimeMillis()+validTime))
                //발급자
                .issuer(this.issur)
                //암호화 알고리즘
                .signWith(this.key)
                .compact();
    }

    //토큰 검증 메서드
    public Authentication getAuthenticationByToken(String token)throws Exception{
        //검증
       Claims clams= Jwts
                .parser()
                .verifyWith(this.key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                ;
       //검증이 실패하면 익셉션을 발생시킴
//        MemberDTO memberDTO=new MemberDTO();
//        memberDTO.setUsername(clams.getSubject());

       UserDetails memberDTO= memberRepository.findById(clams.getSubject()).get();

       Authentication authentication=new UsernamePasswordAuthenticationToken(memberDTO,null,memberDTO.getAuthorities());
        return authentication;
    }
}
