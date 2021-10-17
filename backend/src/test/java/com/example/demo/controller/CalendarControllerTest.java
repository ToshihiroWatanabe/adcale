package com.example.demo.controller;

import com.example.demo.service.CalendarService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@DisplayName("CalendarControllerのテスト")
public class CalendarControllerTest {

    private MockMvc mockMvc;

    @MockBean
    CalendarService calendarService;

    @Autowired
    private CalendarController calendarController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(calendarController).build();
    }

    @Nested
    @DisplayName("findByIdのテスト")
    class FindById {
        @Test
        public void findById404() throws Exception {
            mockMvc.perform(get("/foo")).andExpect(status().isNotFound());
        }

    }

    @Nested
    @DisplayName("createのテスト")
    class Create {
        @Test
        public void create404() throws Exception {
            mockMvc.perform(post("/")).andExpect(status().isNotFound());
        }

    }

    @Nested
    @DisplayName("authのテスト")
    class Auth {
        @Test
        public void auth404() throws Exception {
            mockMvc.perform(post("/auth")).andExpect(status().isNotFound());
        }

    }
}
