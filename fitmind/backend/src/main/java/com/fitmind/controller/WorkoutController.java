package com.fitmind.controller;
import com.fitmind.dto.WorkoutRequest;
import com.fitmind.entity.Workout;
import com.fitmind.security.JwtUtil;
import com.fitmind.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final JwtUtil jwtUtil;
    public WorkoutController(WorkoutService workoutService, JwtUtil jwtUtil) { this.workoutService = workoutService; this.jwtUtil = jwtUtil; }
    private Long getUserId(String authHeader) { return jwtUtil.extractUserId(authHeader.substring(7)); }
    @PostMapping
    public ResponseEntity<Workout> logWorkout(@RequestHeader("Authorization") String auth, @RequestBody WorkoutRequest req) { return ResponseEntity.ok(workoutService.logWorkout(getUserId(auth), req)); }
    @GetMapping
    public ResponseEntity<List<Workout>> getWorkouts(@RequestHeader("Authorization") String auth) { return ResponseEntity.ok(workoutService.getWorkouts(getUserId(auth))); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) { workoutService.deleteWorkout(id); return ResponseEntity.noContent().build(); }
}
