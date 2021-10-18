package com.example.demo.controller;

import com.example.demo.model.ScheduleCreateRequest;
import com.example.demo.service.ScheduleService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@DisplayName("ScheduleControllerのテスト")
public class ScheduleControllerTest {

    private MockMvc mockMvc;

    @MockBean
    ScheduleService scheduleService;

    @Autowired
    private ScheduleController scheduleController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(scheduleController).build();
    }

    @Nested
    @DisplayName("findByCalendarIdのテスト")
    class FindByCalendarId {
        @Test
        void findByCalendarId404() throws Exception {
            mockMvc.perform(get("/foo")).andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("成功")
        void succeed() throws Exception {
            String calendarId = "00000000-0000-0000-0000-000000000000";
            Mockito.when(scheduleService.findByCalendarId("00000000-0000-0000-0000-000000000000"))
                    .thenReturn(List.of());
            MvcResult result = mockMvc.perform(get("/api/schedule/" + calendarId)).andExpect(status().isOk())
                    .andReturn();
            assertEquals(List.of().toString(), result.getResponse().getContentAsString());
        }
    }

    @Nested
    @DisplayName("createのテスト")
    class Create {
        @Test
        @DisplayName("404エラー")
        void return404() throws Exception {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            mockMvc.perform(post("/api/schedule/", request)).andExpect(status().isNotFound());
        }

        @Disabled
        @Test
        @DisplayName("成功")
        void succeed() throws Exception {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            request.setCalendarId("00000000-0000-0000-0000-000000000000");
            request.setArticleTitle("");
            request.setArticleUrl("");
            request.setAuthKey("10000000-1000-1000-1000-100000000000");
            request.setAuthorName("");
            request.setAuthorUrl("");
            request.setDate(LocalDate.of(2021, 10, 10));
            Mockito.when(scheduleService.create(request)).thenReturn(true);
            MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
                    MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
            assertEquals(true,
                    mockMvc.perform(post("/api/schedule/" + request.getCalendarId()).contentType(APPLICATION_JSON_UTF8)
                            .content(request.toString())).andExpect(status().isOk()).andReturn().getResponse()
                            .getContentAsString());
        }
    }

    @Nested
    @DisplayName("updateのテスト")
    class Update {
        @Disabled
        @Test
        @DisplayName("失敗")
        void fail() {

        }

        @Disabled
        @Test
        @DisplayName("成功")
        void succeed() {

        }
    }
}
