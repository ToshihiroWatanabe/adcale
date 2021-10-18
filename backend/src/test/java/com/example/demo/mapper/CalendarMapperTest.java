package com.example.demo.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import com.example.demo.model.Calendar;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

@MybatisTest
@TestPropertySource(locations = "classpath:test.properties")
@DisplayName("calendarsテーブルのマッパークラスのテスト")
public class CalendarMapperTest {

    @Autowired
    private CalendarMapper calendarMapper;

    @Nested
    @DisplayName("findByIdメソッド")
    public class FindById {

        @Test
        @DisplayName("認証キーを取得できる事")
        void getAuthKey() {
            Calendar calendar = calendarMapper.findById("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("80404c36-e848-4cc9-ad00-4bb6383de922", calendar.getAuthKey());
        }

        @Test
        @DisplayName("タイトルを取得できる事")
        void getTitle() {
            Calendar calendar = calendarMapper.findById("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("テストアドベントカレンダー", calendar.getTitle());
        }

        @Test
        @DisplayName("開始日を取得できる事")
        void getStartAt() {
            Calendar calendar = calendarMapper.findById("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("2021-10-15", calendar.getStartAt().toString());
        }

        @Test
        @DisplayName("終了日を取得できる事")
        void getEndAt() {
            Calendar calendar = calendarMapper.findById("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("2021-10-24", calendar.getEndAt().toString());
        }
    }

    @Nested
    @DisplayName("createメソッド")
    public class Create {

        @Test
        @DisplayName("空のオブジェクトを登録しようとすると例外が発生する事")
        void createEmpty() {
            Calendar calendar = new Calendar();
            try {
                calendarMapper.create(calendar);
            } catch (Exception exception) {
                assertEquals("class org.springframework.dao.DataIntegrityViolationException",
                        exception.getClass().toString());
            }
        }

        @Test
        @DisplayName("既に存在するIDで登録しようとすると例外が発生する事")
        void duplicatedId() {
            Calendar calendar = new Calendar();
            calendar.setId("18a3a021-076a-41cb-8be2-b0727c63863d");
            calendar.setAuthKey("00000000-0000-0000-0000-000000000000");
            calendar.setTitle("タイトル");
            calendar.setStartAt(LocalDate.of(2021, 12, 1));
            calendar.setEndAt(LocalDate.of(2021, 12, 25));
            try {
                calendarMapper.create(calendar);
            } catch (Exception exception) {
                assertEquals("class org.springframework.dao.DuplicateKeyException", exception.getClass().toString());
            }
        }

        @Test
        @DisplayName("タイトルが37文字だと例外が発生する事")
        void tooLongTitle() {
            Calendar calendar = new Calendar();
            calendar.setId("18a3a021-076a-41cb-8be2-b0727c63863d");
            calendar.setAuthKey("00000000-0000-0000-0000-000000000000");
            calendar.setTitle("1234567890123456789012345678901234567");
            calendar.setStartAt(LocalDate.of(2021, 12, 1));
            calendar.setEndAt(LocalDate.of(2021, 12, 25));
            try {
                calendarMapper.create(calendar);
            } catch (Exception exception) {
                assertEquals("class org.springframework.dao.DataIntegrityViolationException",
                        exception.getClass().toString());
            }
        }

        @Test
        @DisplayName("新規作成に成功してtrueを返す事")
        void succeed() {
            Calendar calendar = new Calendar();
            calendar.setId("00000000-0000-0000-0000-000000000000");
            calendar.setAuthKey("00000000-0000-0000-0000-000000000000");
            calendar.setTitle("12345678901234567890123456");
            calendar.setStartAt(LocalDate.of(2021, 12, 1));
            calendar.setEndAt(LocalDate.of(2021, 12, 25));
            assertTrue(calendarMapper.create(calendar));
        }
    }
}
