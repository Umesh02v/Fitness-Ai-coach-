package com.fitmind.service;

import com.fitmind.dto.HealthMetricRequest;
import com.fitmind.entity.HealthMetric;
import com.fitmind.entity.User;
import com.fitmind.repository.HealthMetricRepository;
import com.fitmind.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HealthMetricService {

    private final HealthMetricRepository healthMetricRepository;
    private final UserRepository userRepository;

    public HealthMetricService(HealthMetricRepository healthMetricRepository, UserRepository userRepository) {
        this.healthMetricRepository = healthMetricRepository;
        this.userRepository = userRepository;
    }

    public HealthMetric saveMetric(Long userId, HealthMetricRequest req) {
        User user = userRepository.findById(userId).orElseThrow();
        HealthMetric metric = HealthMetric.builder()
                .user(user).weight(req.getWeight()).heartRate(req.getHeartRate())
                .sleepHours(req.getSleepHours()).waterIntakeMl(req.getWaterIntakeMl())
                .stepsCount(req.getStepsCount()).caloriesConsumed(req.getCaloriesConsumed())
                .mood(req.getMood()).recordDate(req.getRecordDate())
                .build();
        return healthMetricRepository.save(metric);
    }

    public List<HealthMetric> getMetrics(Long userId) {
        return healthMetricRepository.findByUserIdOrderByRecordDateDesc(userId);
    }
}
