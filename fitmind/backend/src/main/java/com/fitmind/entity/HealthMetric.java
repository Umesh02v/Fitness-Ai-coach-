package com.fitmind.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_metrics")
public class HealthMetric {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double weight;
    private Integer heartRate;
    private Integer sleepHours;
    private Integer waterIntakeMl;
    private Integer stepsCount;
    private Integer caloriesConsumed;
    private String mood;
    private LocalDate recordDate;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public HealthMetric() {}

    public static HealthMetricBuilder builder() { return new HealthMetricBuilder(); }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    public Integer getSleepHours() { return sleepHours; }
    public void setSleepHours(Integer sleepHours) { this.sleepHours = sleepHours; }
    public Integer getWaterIntakeMl() { return waterIntakeMl; }
    public void setWaterIntakeMl(Integer waterIntakeMl) { this.waterIntakeMl = waterIntakeMl; }
    public Integer getStepsCount() { return stepsCount; }
    public void setStepsCount(Integer stepsCount) { this.stepsCount = stepsCount; }
    public Integer getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Integer caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static class HealthMetricBuilder {
        private User user; private Double weight; private Integer heartRate, sleepHours, waterIntakeMl, stepsCount, caloriesConsumed;
        private String mood; private LocalDate recordDate;
        public HealthMetricBuilder user(User u) { this.user = u; return this; }
        public HealthMetricBuilder weight(Double w) { this.weight = w; return this; }
        public HealthMetricBuilder heartRate(Integer h) { this.heartRate = h; return this; }
        public HealthMetricBuilder sleepHours(Integer s) { this.sleepHours = s; return this; }
        public HealthMetricBuilder waterIntakeMl(Integer w) { this.waterIntakeMl = w; return this; }
        public HealthMetricBuilder stepsCount(Integer s) { this.stepsCount = s; return this; }
        public HealthMetricBuilder caloriesConsumed(Integer c) { this.caloriesConsumed = c; return this; }
        public HealthMetricBuilder mood(String m) { this.mood = m; return this; }
        public HealthMetricBuilder recordDate(LocalDate d) { this.recordDate = d; return this; }
        public HealthMetric build() {
            HealthMetric h = new HealthMetric();
            h.user = user; h.weight = weight; h.heartRate = heartRate; h.sleepHours = sleepHours;
            h.waterIntakeMl = waterIntakeMl; h.stepsCount = stepsCount; h.caloriesConsumed = caloriesConsumed;
            h.mood = mood; h.recordDate = recordDate;
            return h;
        }
    }
}
