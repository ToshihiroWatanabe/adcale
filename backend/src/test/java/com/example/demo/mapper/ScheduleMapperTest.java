package com.example.demo.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.example.demo.model.Schedule;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

@MybatisTest
@TestPropertySource(locations = "classpath:test.properties")
@DisplayName("schedulesテーブルのマッパークラスのテスト")
public class ScheduleMapperTest {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Nested
    @DisplayName("findByCalendarIdメソッド")
    public class FindByCalendarId {

        @Test
        @DisplayName("カレンダーIDが間違っていると空のオブジェクトが返される事")
        void invalidCalendarId() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("-");
            assertEquals(List.of(), schedules);
        }

        @Test
        @DisplayName("1件目の日付を取得できる事")
        void getDate() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("2021-10-15", schedules.get(0).getDate().toString());
        }

        @Test
        @DisplayName("1件目の記事タイトルを取得できる事")
        void getArticleTitle() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("記事タイトル1", schedules.get(0).getArticleTitle());
        }

        @Test
        @DisplayName("1件目の記事URLを取得できる事")
        void getArticleUrl() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("https://example.com", schedules.get(0).getArticleUrl());
        }

        @Test
        @DisplayName("1件目の著者名を取得できる事")
        void getAuthorName() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("著者A", schedules.get(0).getAuthorName());
        }

        @Test
        @DisplayName("1件目の著者URLを取得できる事")
        void getAuthorUrl() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("https://example.net", schedules.get(0).getAuthorUrl());
        }

        @Test
        @DisplayName("2件目の日付を取得できる事")
        void get1Date() {
            List<Schedule> schedules = scheduleMapper.findByCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("2021-10-16", schedules.get(1).getDate().toString());
        }
    }

    @Nested
    @DisplayName("findByIdメソッド")
    public class FindById {
        @Test
        @DisplayName("IDが間違っているとnullが返される事")
        void invalidId() {
            Schedule schedule = scheduleMapper.findById("-");
            assertEquals(null, schedule);
        }

        @Test
        @DisplayName("記事タイトルが取得できる事")
        void getArticleTitle() {
            Schedule schedule = scheduleMapper.findById("abf09a97-58fa-bf51-2975-4544f4a5d770");
            assertEquals("記事タイトル1", schedule.getArticleTitle());
        }

        @Test
        @DisplayName("記事URLが取得できる事")
        void getArticleUrl() {
            Schedule schedule = scheduleMapper.findById("abf09a97-58fa-bf51-2975-4544f4a5d770");
            assertEquals("https://example.com", schedule.getArticleUrl());
        }

        @Test
        @DisplayName("著者名が取得できる事")
        void getAuthorName() {
            Schedule schedule = scheduleMapper.findById("abf09a97-58fa-bf51-2975-4544f4a5d770");
            assertEquals("著者A", schedule.getAuthorName());
        }

        @Test
        @DisplayName("著者URLが取得できる事")
        void getAuthorUrl() {
            Schedule schedule = scheduleMapper.findById("abf09a97-58fa-bf51-2975-4544f4a5d770");
            assertEquals("https://example.net", schedule.getAuthorUrl());
        }
    }

    @Nested
    @DisplayName("createメソッド")
    public class Create {
        @Test
        @DisplayName("空の予定を登録しようとすると例外が発生する事")
        void fail() {
            Schedule schedule = new Schedule();
            try {
                scheduleMapper.create(schedule);
            } catch (Exception exception) {
                assertEquals("class org.springframework.dao.DataIntegrityViolationException",
                        exception.getClass().toString());
            }
        }

        @Test
        @DisplayName("成功するとtrueが返される事")
        void succeed() {
            Schedule schedule = new Schedule();
            schedule.setId(UUID.randomUUID().toString());
            schedule.setCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            schedule.setDate(LocalDate.of(2021, 10, 17));
            schedule.setArticleTitle("");
            schedule.setArticleUrl("");
            schedule.setAuthorName("");
            schedule.setAuthorUrl("");
            schedule.setProfileImageUrl("");
            assertTrue(scheduleMapper.create(schedule));
        }
    }

    @Nested
    @DisplayName("updateメソッド")
    public class Update {
        @Test
        @DisplayName("空の予定で更新しようとすると例外が発生する事")
        void fail() {
            Schedule schedule = new Schedule();
            try {
                scheduleMapper.update(schedule);
            } catch (Exception exception) {
                assertEquals("class org.springframework.dao.DataIntegrityViolationException",
                        exception.getClass().toString());
            }
        }

        @Test
        @DisplayName("成功するとtrueが返される事")
        void succeed() {
            Schedule schedule = new Schedule();
            schedule.setId("abf09a97-58fa-bf51-2975-4544f4a5d770");
            schedule.setCalendarId("18a3a021-076a-41cb-8be2-b0727c63863d");
            schedule.setDate(LocalDate.of(2021, 10, 15));
            schedule.setArticleTitle("");
            schedule.setArticleUrl("");
            schedule.setAuthorName("");
            schedule.setAuthorUrl("");
            schedule.setProfileImageUrl("");
            assertTrue(scheduleMapper.update(schedule));
        }
    }
}
