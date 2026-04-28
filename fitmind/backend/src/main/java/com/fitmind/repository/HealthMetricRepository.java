package com.fitmind.repository;

import com.fitmind.entity.HealthMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HealthMetricRepository extends JpaRepository<HealthMetric, Long> {
    List<HealthMetric> findByUserIdOrderByRecordDateDesc(Long userId);
    Optional<HealthMetric> findByUserIdAndRecordDate(Long userId, LocalDate date);
    List<HealthMetric> findByUserIdAndRecordDateBetween(Long userId, LocalDate start, LocalDate end);
}
