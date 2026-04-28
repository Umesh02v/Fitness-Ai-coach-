package com.fitmind.service;

import com.fitmind.dto.ChatRequest;
import com.fitmind.dto.ChatResponse;
import com.fitmind.entity.AiChatMessage;
import com.fitmind.entity.User;
import com.fitmind.repository.AiChatMessageRepository;
import com.fitmind.repository.HealthMetricRepository;
import com.fitmind.repository.UserRepository;
import com.fitmind.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AiCoachService {

    private final AiChatMessageRepository chatRepo;
    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;
    private final HealthMetricRepository healthMetricRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${ai.provider}")
    private String aiProvider;

    @Value("${ai.gemini.api-key}")
    private String geminiApiKey;

    @Value("${ai.gemini.model}")
    private String geminiModel;

    @Value("${ai.anthropic.api-key}")
    private String anthropicApiKey;

    @Value("${ai.anthropic.model}")
    private String anthropicModel;

    public AiCoachService(AiChatMessageRepository chatRepo, UserRepository userRepository,
                          WorkoutRepository workoutRepository, HealthMetricRepository healthMetricRepository,
                          WebClient.Builder webClientBuilder) {
        this.chatRepo = chatRepo;
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
        this.healthMetricRepository = healthMetricRepository;
        this.webClientBuilder = webClientBuilder;
    }

    public ChatResponse chat(Long userId, ChatRequest req) {
        User user = userRepository.findById(userId).orElseThrow();

        chatRepo.save(AiChatMessage.builder().user(user).role("USER").content(req.getMessage()).build());

        String systemPrompt = buildSystemPrompt(user);
        List<AiChatMessage> history = chatRepo.findTop20ByUserIdOrderByCreatedAtDesc(userId);

        String aiReply = callAI(systemPrompt, req.getMessage(), history);

        chatRepo.save(AiChatMessage.builder().user(user).role("ASSISTANT").content(aiReply).build());

        return new ChatResponse(aiReply);
    }

    public List<AiChatMessage> getChatHistory(Long userId) {
        return chatRepo.findByUserIdOrderByCreatedAtAsc(userId);
    }

    private String buildSystemPrompt(User user) {
        var recentWorkouts = workoutRepository.findByUserIdAndWorkoutDateBetween(
                user.getId(), LocalDate.now().minusDays(7), LocalDate.now());
        var recentMetrics = healthMetricRepository.findByUserIdAndRecordDateBetween(
                user.getId(), LocalDate.now().minusDays(7), LocalDate.now());

        StringBuilder sb = new StringBuilder();
        sb.append("You are FitMind AI Coach, a friendly personal health and fitness assistant.\n");
        sb.append(String.format("User: %s, Age: %s, Height: %scm, Weight: %skg, Goal: %s\n",
                user.getName(), user.getAge(), user.getHeight(), user.getWeight(), user.getGoal()));

        if (!recentWorkouts.isEmpty()) {
            sb.append("Recent workouts (last 7 days):\n");
            recentWorkouts.forEach(w -> sb.append(String.format("- %s: %s, %d mins, %d cal burned\n",
                    w.getWorkoutDate(), w.getName(), w.getDurationMins(), w.getCaloriesBurned())));
        }
        if (!recentMetrics.isEmpty()) {
            sb.append("Recent health metrics:\n");
            recentMetrics.forEach(m -> sb.append(String.format("- %s: weight=%s, sleep=%sh, HR=%sbpm, mood=%s\n",
                    m.getRecordDate(), m.getWeight(), m.getSleepHours(), m.getHeartRate(), m.getMood())));
        }
        sb.append("\nProvide personalized, evidence-based advice. Be encouraging and specific.");
        return sb.toString();
    }

    private String callAI(String systemPrompt, String userMessage, List<AiChatMessage> history) {
        if ("gemini".equalsIgnoreCase(aiProvider)) {
            return callGemini(systemPrompt, userMessage);
        } else {
            return callAnthropic(systemPrompt, userMessage, history);
        }
    }

    @SuppressWarnings("unchecked")
    private String callGemini(String systemPrompt, String userMessage) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + geminiModel + ":generateContent?key=" + geminiApiKey;
        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", systemPrompt + "\n\nUser: " + userMessage)))),
                "generationConfig", Map.of("maxOutputTokens", 1024, "temperature", 0.7)
        );
        try {
            Map<String, Object> response = webClientBuilder.build()
                    .post().uri(url).contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body).retrieve().bodyToMono(Map.class).block();
            var candidates = (List<Map<String, Object>>) response.get("candidates");
            var content = (Map<String, Object>) candidates.get(0).get("content");
            var parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "I'm having trouble connecting right now. Please try again shortly.";
        }
    }

    @SuppressWarnings("unchecked")
    private String callAnthropic(String systemPrompt, String userMessage, List<AiChatMessage> history) {
        var messages = history.stream()
                .map(m -> Map.of("role", m.getRole().toLowerCase(), "content", m.getContent()))
                .toList();
        Map<String, Object> body = Map.of(
                "model", anthropicModel, "max_tokens", 1024,
                "system", systemPrompt, "messages", messages
        );
        try {
            Map<String, Object> response = webClientBuilder.build()
                    .post().uri("https://api.anthropic.com/v1/messages")
                    .header("x-api-key", anthropicApiKey)
                    .header("anthropic-version", "2023-06-01")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body).retrieve().bodyToMono(Map.class).block();
            var content = (List<Map<String, Object>>) response.get("content");
            return (String) content.get(0).get("text");
        } catch (Exception e) {
            return "I'm having trouble connecting right now. Please try again shortly.";
        }
    }
}
