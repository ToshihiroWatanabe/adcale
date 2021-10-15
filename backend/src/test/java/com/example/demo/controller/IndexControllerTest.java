package com.example.demo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@DisplayName("IndexControllerのテスト")
public class IndexControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(new IndexController()).build();
    }

    @Nested
    @DisplayName("returnIndexのテスト")
    class ReturnIndex {

        @Test
        @DisplayName("ルートURLへのGETリクエストでindex.htmlを返す事")
        public void getRoot() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/")).andExpect(status().isOk())
                    .andExpect(view().name("/index.html"));
        }

        @Test
        @DisplayName("/newへのGETリクエストでindex.htmlを返す事")
        public void getNew() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/new")).andExpect(status().isOk())
                    .andExpect(view().name("/index.html"));
        }

        @Test
        @DisplayName("/api/fooへのGETリクエストで404エラーが返される事")
        public void getApi() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/foo")).andExpect(status().isNotFound());
        }
    }
}
