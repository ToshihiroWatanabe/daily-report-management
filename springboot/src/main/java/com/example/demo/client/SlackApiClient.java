package com.example.demo.client;

import com.ullink.slack.simpleslackapi.SlackChannel;
import com.ullink.slack.simpleslackapi.SlackMessageHandle;
import com.ullink.slack.simpleslackapi.SlackSession;
import com.ullink.slack.simpleslackapi.impl.SlackSessionFactory;
import com.ullink.slack.simpleslackapi.replies.SlackMessageReply;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SlackApiClient {
    private SlackSession session;

    public SlackApiClient() throws Exception {
        System.out.println(System.getenv("SLACK_BOT_TOKEN"));
        this.session = SlackSessionFactory.createWebSocketSlackSession(System.getenv("SLACK_BOT_TOKEN"));
        session.connect();
    }

    // メッセージ送信
    public SlackMessageHandle<SlackMessageReply> sendMessage(String channel, String message) {
        SlackChannel slackChannel = session.findChannelByName(channel);
        return session.sendMessage(slackChannel, message);
    }
}