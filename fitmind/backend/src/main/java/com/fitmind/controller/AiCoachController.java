package com.fitmind.controller;
import com.fitmind.dto.ChatRequest;
import com.fitmind.dto.ChatResponse;
import com.fitmind.entity.AiChatMessage;
import com.fitmind.security.JwtUtil;
import com.fitmind.service.AiCoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/ai")
public class AiCoachController {
    private final AiCoachService aiCoachService;
    private final JwtUtil jwtUtil;
    public AiCoachController(AiCoachService aiCoachService, JwtUtil jwtUtil) { this.aiCoachService = aiCoachService; this.jwtUtil = jwtUtil; }
    private Long getUserId(String authHeader) { return jwtUtil.extractUserId(authHeader.substring(7)); }
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestHeader("Authorization") String auth, @RequestBody ChatRequest req) { return ResponseEntity.ok(aiCoachService.chat(getUserId(auth), req)); }
    @GetMapping("/history")
    public ResponseEntity<List<AiChatMessage>> getChatHistory(@RequestHeader("Authorization") String auth) { return ResponseEntity.ok(aiCoachService.getChatHistory(getUserId(auth))); }
}
