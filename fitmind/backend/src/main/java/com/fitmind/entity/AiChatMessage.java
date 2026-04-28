package com.fitmind.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_chat_messages")
public class AiChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String role;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public AiChatMessage() {}

    public static AiChatMessageBuilder builder() { return new AiChatMessageBuilder(); }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static class AiChatMessageBuilder {
        private User user; private String role, content;
        public AiChatMessageBuilder user(User u) { this.user = u; return this; }
        public AiChatMessageBuilder role(String r) { this.role = r; return this; }
        public AiChatMessageBuilder content(String c) { this.content = c; return this; }
        public AiChatMessage build() {
            AiChatMessage m = new AiChatMessage();
            m.user = user; m.role = role; m.content = content;
            return m;
        }
    }
}
