# アドベントカレンダー作成アプリ

エンジニアの情報発信イベントに使えそうなアドベントカレンダーを簡単に作成し、共有できるアプリです。

## [アプリへのアクセスはこちら](https://adcale.herokuapp.com/)

カレンダー作成画面↓

![カレンダー作成画面](https://user-images.githubusercontent.com/79039863/136520609-a1b8a22e-939d-4936-b87f-b28ed6c10667.png)

カレンダー閲覧・編集画面↓

![カレンダー閲覧・編集画面](https://user-images.githubusercontent.com/79039863/136538311-06e23e8c-da13-46ba-8bbd-cd30efa5f482.png)

予定編集フォームダイアログ↓

![予定作成・編集フォームダイアログ](https://user-images.githubusercontent.com/79039863/136538328-8495394b-2de1-4513-9d5a-fd5d884db8b6.png)



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

## 環境変数(バックエンド用)

キー|説明
---|---
MYSQL_URL|mysql://**ホスト名**:**ポート**/**データベース名**
MYSQL_USERNAME|データベースに接続するユーザー名
MYSQL_PASSWORD|データベースに接続するユーザーのパスワード

## 環境変数(フロントエンド用)

キー|説明
---|---
REACT_APP_TWITTER_BEARER_TOKEN|Twitter APIのBearer Token

## Spring Bootアプリケーションの起動
```cd backend```

```mvn spring-boot:run```

## Reactアプリケーションの起動
```cd frontend```

```npm install```

```npm start```

# 作者

[ワタナベトシヒロ](https://github.com/ToshihiroWatanabe)
