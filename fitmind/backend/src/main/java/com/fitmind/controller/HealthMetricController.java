package com.fitmind.controller;
import com.fitmind.dto.HealthMetricRequest;
import com.fitmind.entity.HealthMetric;
import com.fitmind.security.JwtUtil;
import com.fitmind.service.HealthMetricService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/metrics")
public class HealthMetricController {
    private final HealthMetricService healthMetricService;
    private final JwtUtil jwtUtil;
    public HealthMetricController(HealthMetricService healthMetricService, JwtUtil jwtUtil) { this.healthMetricService = healthMetricService; this.jwtUtil = jwtUtil; }
    private Long getUserId(String authHeader) { return jwtUtil.extractUserId(authHeader.substring(7)); }
    @PostMapping
    public ResponseEntity<HealthMetric> saveMetric(@RequestHeader("Authorization") String auth, @RequestBody HealthMetricRequest req) { return ResponseEntity.ok(healthMetricService.saveMetric(getUserId(auth), req)); }
    @GetMapping
    public ResponseEntity<List<HealthMetric>> getMetrics(@RequestHeader("Authorization") String auth) { return ResponseEntity.ok(healthMetricService.getMetrics(getUserId(auth))); }
}
