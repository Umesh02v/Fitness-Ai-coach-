package com.fitmind.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
public class Workout {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type;
    private String name;
    private Integer durationMins;
    private Integer caloriesBurned;
    private String intensity;
    private String notes;
    private LocalDate workoutDate;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Workout() {}

    public static WorkoutBuilder builder() { return new WorkoutBuilder(); }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getDurationMins() { return durationMins; }
    public void setDurationMins(Integer durationMins) { this.durationMins = durationMins; }
    public Integer getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Integer caloriesBurned) { this.caloriesBurned = caloriesBurned; }
    public String getIntensity() { return intensity; }
    public void setIntensity(String intensity) { this.intensity = intensity; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDate getWorkoutDate() { return workoutDate; }
    public void setWorkoutDate(LocalDate workoutDate) { this.workoutDate = workoutDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static class WorkoutBuilder {
        private User user; private String type, name, intensity, notes;
        private Integer durationMins, caloriesBurned; private LocalDate workoutDate;
        public WorkoutBuilder user(User user) { this.user = user; return this; }
        public WorkoutBuilder type(String type) { this.type = type; return this; }
        public WorkoutBuilder name(String name) { this.name = name; return this; }
        public WorkoutBuilder durationMins(Integer d) { this.durationMins = d; return this; }
        public WorkoutBuilder caloriesBurned(Integer c) { this.caloriesBurned = c; return this; }
        public WorkoutBuilder intensity(String i) { this.intensity = i; return this; }
        public WorkoutBuilder notes(String n) { this.notes = n; return this; }
        public WorkoutBuilder workoutDate(LocalDate d) { this.workoutDate = d; return this; }
        public Workout build() {
            Workout w = new Workout();
            w.user = user; w.type = type; w.name = name; w.durationMins = durationMins;
            w.caloriesBurned = caloriesBurned; w.intensity = intensity; w.notes = notes; w.workoutDate = workoutDate;
            return w;
        }
    }
}
