package com.example.demo.controller;

import java.util.Map;

import com.example.demo.client.SlackApiClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/slack")
public class SlackApiController {

    private final SlackApiClient slackApiClient;

    @Autowired
    public SlackApiController(SlackApiClient slackApiClient) {
        this.slackApiClient = slackApiClient;
    }

    @PostMapping("/postmessage")
    public boolean postMessage() {
        System.out.println("postMessage");
        return true;
    }

    @GetMapping("/get/{channel}/{text}/{token}")
    public boolean get(@PathVariable("channel") String channel, @PathVariable("text") String text,
            @PathVariable("token") String token) {
        System.out.println(channel + " " + text + " " + token);
        slackApiClient.sendMessage(channel, text);
        return true;
    }
}
