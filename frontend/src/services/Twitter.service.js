import http from "http-common";

/**
 * Twitter APIに関するサービスクラスです。
 */
class TwitterService {
  getUsersByUserName(userName) {
    return http.get("/twitter/2/users/by/username/" + userName);
  }
}

export default new TwitterService();
