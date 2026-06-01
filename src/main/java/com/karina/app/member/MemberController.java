package com.karina.app.member;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member/*")
@AllArgsConstructor
@Slf4j
public class MemberController {
    private MemberService memberService;
    
    @GetMapping("join")
    public void join()throws Exception{
        System.out.println("join");
    }

    @PostMapping("join")
    public int joinPost(@Valid @RequestBody MemberDTO memberDTO,BindingResult bindingResult) throws Exception {

         memberService.join(memberDTO);
         if(memberDTO !=null){
             return 1;
         }else{
             throw new Exception();
         }

    }

    @PostMapping("login")
    public MemberDTO loginPost(@RequestBody MemberDTO memberDTO) throws Exception {

        return memberService.login(memberDTO);
    }
}
