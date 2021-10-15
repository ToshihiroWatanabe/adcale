package com.example.demo.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * カレンダーモデルクラスから認証キーを除いたクラスです。
 */
@Getter
@Setter
public class CalendarResponse {
    private String id;
    private String title;
    private LocalDate startAt;
    private LocalDate endAt;
}
