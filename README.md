# daily-report-management
![image](https://user-images.githubusercontent.com/79039863/122550211-5ec6d100-d06e-11eb-9ffe-2e3e183313a6.png)


日報管理アプリ  
バックエンドはSpring Boot、フロントエンドはReact

## Install
### 環境変数
キー|説明
---|---
MYSQL_URL|mysql://ホスト名:ポート/データベース名
MYSQL_USERNAME|データベースに接続するユーザー名
MYSQL_PASSWORD|データベースに接続するユーザーのパスワード

  
springboot\src\main\resources\schema.sqlにあるSQLを実行して、テーブルを作成してください。
  
### Spring Bootアプリケーションの起動
`cd springboot`  
`mvn spring-boot:run`  
  
### Reactアプリケーションの起動
`cd react`  
`npm install`  
`npm start`  
