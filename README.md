# daily-report-management
![dairy-report-management 2021-07-25](https://user-images.githubusercontent.com/79039863/126899855-e21c4b4c-8141-48e3-b3a7-2072d7f0f10a.gif)

## Overview 概要

日々の取り組みを可視化する日報アプリ『[BuildUp](https://build-up.info/)』のクローンアプリです。

フロントエンドはReact、バックエンドはSpring Bootで制作しています。

## Description 説明

「日報管理」ページでは、カレンダーで日付を選択して日報を作成したり、月ごとの日報一覧を表示できます。

「分析レポート」ページでは、日報投稿日数、総合学習時間、カテゴリー別学習比率のグラフが表示されます。

日報はローカルストレージに保存されますが、ログインしているとサーバーと同期されます。

BuildUpからデータを移行する場合は、[BuildUpの日報データをファイル出力する.js](/BuildUpの日報データをファイル出力する.js)を使ってJSONファイルをエクスポートし、この日報管理アプリにインポートしてください。

## Features 機能

- ツイートボタンから日報をTwitterで投稿できます。
- Slackと連携して日報をボットとして投稿できます。
- ログインすると、プロフィールや分析レポートをポートフォリオとして公開できます。
- (独自機能)JSONファイルから日報をインポートしたり、JSONやテキスト形式でエクスポートできます。

## Requirement 動作環境

- Java 11.0.10
- Apache Maven 3.8.1
- npm 7.16.0
- MySQL 8.0.25

## Install インストール

### 環境変数
キー|説明
---|---
MYSQL_URL|mysql://**ホスト名**:**ポート**/**データベース名**
MYSQL_USERNAME|データベースに接続するユーザー名
MYSQL_PASSWORD|データベースに接続するユーザーのパスワード


[springboot/src/main/resources/schema.sql](/springboot/src/main/resources/schema.sql)にあるSQL文を実行して、テーブルを作成してください。

### Spring Bootアプリケーションの起動
```cd springboot```
```mvn spring-boot:run```

### Reactアプリケーションの起動
```cd react```
```npm install```
```npm start```

## Author 作者

ワタナベトシヒロ
