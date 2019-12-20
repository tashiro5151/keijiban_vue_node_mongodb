# keijiban_vue_node_mongodb

# このリポジトリは何？

掲示板のソースです。<br />
vue node mongodbバージョン <br />
シングルページアプリケーション(SPA)です。

# 開発環境

- centos7
- docker <br/>
- docker-compose <br/>

# 使用ライブラリ周り

## フロントエンド

- typescript
- vue

## バックエンド

- nodejs
- mongodb
- nginx

# set up

```
git clone https://github.com/tashiro5151/keijiban_vue_node_mongodb.git keijiban_vue_node_mongodb
cd keijiban_vue_node_mongodb

.envを編集　※portの開放は各自で設定してください
SERVER_IP   →　サーバのIP
NGINX_PORT  →  フロントエンドサーバのポート番号 (お好きな番号を選んでください)
BACKEND_PORT →  バックエンドサーバのポート番号 (お好きな番号を選んでください)

# vue・バックエンドnodejsをビルド
sudo docker-compose -f docker-compose.build.yml up
sudo docker-compose -f docker-compose.build.yml down -v

# サーバを立ち上げる
sudo docker-compose up -d --build

# ブラウザでアクセスする
http://お使いのサーバのIP:NGINX_PORT

# chatサーバを落とす
sudo docker-compose down -v
```
