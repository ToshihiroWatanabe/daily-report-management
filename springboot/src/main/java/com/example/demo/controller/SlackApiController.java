package com.example.demo.controller;

import java.io.IOException;

import com.ullink.slack.simpleslackapi.SlackChannel;
import com.ullink.slack.simpleslackapi.SlackSession;
import com.ullink.slack.simpleslackapi.impl.SlackSessionFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/slack")
public class SlackApiController {

    @PostMapping("/postmessage")
    public boolean postMessage() {
        System.out.println("postMessage");
        return true;
    }

    @GetMapping("/get/{channel}/{text}/{token}")
    public boolean get(@PathVariable("channel") String channel, @PathVariable("text") String text,
            @PathVariable("token") String token) throws IOException {
        System.out.println(channel + " " + text + " " + token);
        // BotのAPI Tokenを設定
        SlackSession session = SlackSessionFactory.createWebSocketSlackSession(token);

        session.connect();

        SlackChannel slackChannel = session.findChannelByName(channel);
        String message = "Hello World!";
        session.sendMessage(slackChannel, message);

        session.disconnect();
        return true;
    }
}
