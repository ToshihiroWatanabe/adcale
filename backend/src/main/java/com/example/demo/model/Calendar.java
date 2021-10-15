package com.example.demo.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * カレンダーのモデルクラスです。
 */
@Getter
@Setter
public class Calendar {
    private String id;
    private String authKey;
    private String title;
    private LocalDate startAt;
    private LocalDate endAt;
}
