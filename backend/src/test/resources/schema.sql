-- カレンダーテーブル
CREATE TABLE IF NOT EXISTS calendars(
  -- カレンダーID
  id VARCHAR(36) PRIMARY KEY,
  -- 認証キー
  auth_key VARCHAR(36) NOT NULL UNIQUE,
  -- カレンダータイトル
  title VARCHAR(36) NOT NULL,
  -- 開始日
  start_at DATE NOT NULL,
  -- 終了日
  end_at DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME
);
-- 予定テーブル
CREATE TABLE IF NOT EXISTS schedules(
  -- 予定ID
  id VARCHAR(36) PRIMARY KEY,
  -- カレンダーID
  calendar_id VARCHAR(36) NOT NULL,
  -- 日付
  date DATE NOT NULL,
  -- 記事タイトル
  article_title VARCHAR(255) NOT NULL,
  -- 記事URL
  article_url VARCHAR(255) NOT NULL,
  -- 著者の名前
  author_name VARCHAR(255) NOT NULL,
  -- 著者のURL
  author_url VARCHAR(255) NOT NULL,
  -- 著者のプロフィール画像のURL
  profile_image_url VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (calendar_id) REFERENCES calendars(id),
  UNIQUE (calendar_id, date)
);