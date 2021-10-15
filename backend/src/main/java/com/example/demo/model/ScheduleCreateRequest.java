package com.example.demo.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * 予定を作成・更新する際のリクエストのモデルクラスです。
 */
@Getter
@Setter
public class ScheduleCreateRequest {
    private String calendarId;
    private String authKey;
    private LocalDate date;
    private String articleTitle;
    private String articleUrl;
    private String authorName;
    private String authorUrl;
}
