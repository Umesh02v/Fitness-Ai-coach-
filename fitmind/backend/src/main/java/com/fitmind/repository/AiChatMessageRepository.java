package com.fitmind.repository;

import com.fitmind.entity.AiChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AiChatMessageRepository extends JpaRepository<AiChatMessage, Long> {
    List<AiChatMessage> findByUserIdOrderByCreatedAtAsc(Long userId);
    List<AiChatMessage> findTop20ByUserIdOrderByCreatedAtDesc(Long userId);
}
