INSERT INTO
  calendars (id, auth_key, title, start_at, end_at)
VALUES
  (
    '18a3a021-076a-41cb-8be2-b0727c63863d',
    '80404c36-e848-4cc9-ad00-4bb6383de922',
    'テストアドベントカレンダー',
    '2021-10-15',
    '2021-10-24'
  );
INSERT INTO
  calendars (id, auth_key, title, start_at, end_at)
VALUES
  (
    '88e6e1b9-5f42-4362-88a3-72fe85c7c483',
    '8417061d-8e74-495b-9476-0826aa0a273c',
    'テストアドベントカレンダー11月',
    '2021-11-01',
    '2021-11-30'
  );
INSERT INTO
  schedules(
    id,
    calendar_id,
    date,
    article_title,
    article_url,
    author_name,
    author_url,
    profile_image_url
  )
VALUES(
    'abf09a97-58fa-bf51-2975-4544f4a5d770',
    '18a3a021-076a-41cb-8be2-b0727c63863d',
    '2021-10-15',
    '記事タイトル1',
    'https://example.com',
    '著者A',
    'https://example.net',
    ''
  );
INSERT INTO
  schedules(
    id,
    calendar_id,
    date,
    article_title,
    article_url,
    author_name,
    author_url,
    profile_image_url
  )
VALUES(
    '36328ff9-a84e-d1f7-5887-45a79cbb856a',
    '18a3a021-076a-41cb-8be2-b0727c63863d',
    '2021-10-16',
    '記事タイトル2',
    'https://example.com',
    '著者B',
    'https://example.net',
    ''
  );