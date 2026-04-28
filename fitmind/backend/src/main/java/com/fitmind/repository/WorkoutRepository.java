package com.fitmind.repository;

import com.fitmind.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserIdOrderByWorkoutDateDesc(Long userId);

    List<Workout> findByUserIdAndWorkoutDateBetween(Long userId, LocalDate start, LocalDate end);

    @Query("SELECT SUM(w.caloriesBurned) FROM Workout w WHERE w.user.id = :userId AND w.workoutDate >= :since")
    Integer sumCaloriesBurnedSince(Long userId, LocalDate since);
}
