package com.karina.app.member;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class MemberService implements UserDetailsService {

    private MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findById(username).orElse(null);
    }

    //가입메서드
    public MemberDTO join(MemberDTO memberDTO) {
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        return memberRepository.save(memberDTO);
    }

    public MemberDTO login(MemberDTO memberDTO) {
        MemberDTO found = memberRepository.findById(memberDTO.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "아이디 또는 비밀번호가 일치하지 않습니다."));
        if (!found.getPassword().equals(memberDTO.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        return found;
    }
}
