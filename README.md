# アドベントカレンダー作成アプリ

エンジニアの情報発信イベントに使えそうなアドベントカレンダーを簡単に作成し、共有できるアプリです。

![動作の様子](https://user-images.githubusercontent.com/79039863/138237668-0a14f45f-ac39-4998-8e66-cff61e7804fb.gif)

## [アプリへのアクセスはこちら](https://adcale.herokuapp.com/)

# 便利な機能

- URLをコピーして作成したカレンダーを共有できます！閲覧専用URLと、編集権限付きのURLの2種類があります。
- 記事タイトルを入力していない状態で記事のURLを入力すると、ページタイトルが取得されて自動で入力されます。
- 著者の名前を入力していない状態で著者のURLにTwitterのプロフィールのURLを入力すると、名前が自動で入力され、アイコンが表示されます。(Twitter APIを利用)

# 主な使用技術

- React
- MUI(Material-UI v5)
- Java 11
- Spring Boot
- MyBatis
- MySQL

# インストール手順

## 動作環境

- MySQL 8.0.25
- Java 11.0.12
- Apache Maven 3.8.1
- node 14.16.1
- npm 7.16.0

schema.sqlのSQL文を実行して、テーブルを作成してください。

## 環境変数

### Spring Bootアプリ用

キー|説明
---|---
MYSQL_URL|mysql://**ホスト名**:**ポート**/**データベース名**
MYSQL_USERNAME|データベースに接続するユーザー名
MYSQL_PASSWORD|データベースに接続するユーザーのパスワード
TWITTER_BEARER_TOKEN|Twitter APIのBearer Token

<!-- ### Spring Bootテスト用

キー|説明
---|---
MYSQL_TEST_URL|mysql://**ホスト名**:**ポート**/**データベース名**
MYSQL_TEST_USERNAME|データベースに接続するユーザー名
MYSQL_TEST_PASSWORD|データベースに接続するユーザーのパスワード -->



## Spring Bootアプリケーションの起動

```
cd backend
```

```
mvn install
```

```
mvn spring-boot:run
```

## Reactアプリケーションの起動

```
cd frontend
```

```
npm install
```

```
npm start
```

# 作者

[ワタナベトシヒロ](https://github.com/ToshihiroWatanabe)
