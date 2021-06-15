INSERT IGNORE INTO users(user_id, password, user_name, report_id)
VALUES('userId', 'password', 'userName', 'reportId');
INSERT IGNORE INTO reports(report_id, report)
VALUES(
        'reportId',
        '[
{"date":"2021-06-04","report_items":[{"category":"JavaScript","content":"アプリケーション制作","hour":3,"minute":45},{"category":"その他","content":"アプリケーション設計・構想","hour":0,"minute":30},{"category":"JavaScript","content":"ドキュメントの整備","hour":5,"minute":15},{"category":"Java","content":"講座の予習","hour":0,"minute":15},{"category":"Java","content":"他の人のポートフォリオを見る","hour":0,"minute":30}],"content":"<React.StrictMode>を付けると様々な不具合が起こるが、なぜなのかは分かっていない。"}
,{"date":"2021-06-03","report_items":[{"category":"JavaScript","content":"BuildUpでいろいろやる","hour":2,"minute":15},{"category":"JavaScript","content":"アプリケーション制作","hour":4,"minute":15},{"category":"その他","content":"アプリケーション設計・構想","hour":2,"minute":30},{"category":"JavaScript","content":"Qiita記事作成","hour":2,"minute":15}],"content":"普段使っているアプリの動作を再現していき、できることを増やしていきたい。"}]'
    );