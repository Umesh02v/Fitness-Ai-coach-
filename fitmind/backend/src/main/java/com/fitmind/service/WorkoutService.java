package com.fitmind.service;

import com.fitmind.dto.WorkoutRequest;
import com.fitmind.entity.User;
import com.fitmind.entity.Workout;
import com.fitmind.repository.UserRepository;
import com.fitmind.repository.WorkoutRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public WorkoutService(WorkoutRepository workoutRepository, UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    public Workout logWorkout(Long userId, WorkoutRequest req) {
        User user = userRepository.findById(userId).orElseThrow();
        Workout workout = Workout.builder()
                .user(user).type(req.getType()).name(req.getName())
                .durationMins(req.getDurationMins()).caloriesBurned(req.getCaloriesBurned())
                .intensity(req.getIntensity()).notes(req.getNotes()).workoutDate(req.getWorkoutDate())
                .build();
        return workoutRepository.save(workout);
    }

    public List<Workout> getWorkouts(Long userId) {
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(userId);
    }

    public void deleteWorkout(Long workoutId) {
        workoutRepository.deleteById(workoutId);
    }
}
