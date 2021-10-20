package com.example.demo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("TwitterControllerのテスト")
public class TwitterControllerTest {

    // private MockMvc mockMvc;

    // @BeforeEach
    // public void setup() {
    // this.mockMvc = MockMvcBuilders.standaloneSetup(new
    // IndexController()).build();
    // }

    // @Test
    // void fail() throws Exception {
    // mockMvc.perform(MockMvcRequestBuilders.get("/api/twitter/2/users/by/username/"))
    // .andExpect(status().isNotFound());
    // }
}
