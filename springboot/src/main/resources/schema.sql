-- ユーザーのテーブル
CREATE TABLE IF NOT EXISTS users(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- ユーザーID
    user_id VARCHAR(32) NOT NULL UNIQUE,
    -- パスワード
    password VARCHAR(100) NOT NULL,
    -- ユーザー名
    user_name VARCHAR(32),
    -- 日報ID
    report_id VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 日報のテーブル
CREATE TABLE IF NOT EXISTS reports(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- 日報ID
    report_id VARCHAR(255) NOT NULL UNIQUE,
    -- 日報
    report JSON,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (JSON_VALID(report)),
    FOREIGN KEY (report_id) REFERENCES users(report_id)
);
-- ポートフォリオのテーブル
CREATE TABLE IF NOT EXISTS portfolios(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- 日報ID
    report_id VARCHAR(255) NOT NULL UNIQUE,
    -- 名前
    user_name VARCHAR(32),
    -- 紹介文
    introduction VARCHAR(400),
    -- スキルセット
    skill_set JSON,
    CHECK (JSON_VALID(skill_set)),
    FOREIGN KEY (report_id) REFERENCES users(report_id)
)