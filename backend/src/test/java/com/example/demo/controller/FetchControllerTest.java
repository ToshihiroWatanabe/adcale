package com.example.demo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@DisplayName("FetchControllerのテスト")
public class FetchControllerTest {
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(new IndexController()).build();
    }

    @Nested
    @DisplayName("fetchメソッドのテスト")
    class Fetch {
        @Test
        @DisplayName("リクエストパラメータにURLを含めないと404エラーが出る事")
        void error404() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/fetch/")).andExpect(status().isNotFound());
        }

        @Disabled
        @Test
        @DisplayName("example.comのタイトルを取得できる事")
        void exampleComTitle() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/fetch?url=example.com")).andExpect(status().isOk());
        }
    }
}
