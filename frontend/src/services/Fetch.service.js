import http from "http-common";

/**
 * 他サイトの情報の取得に関するサービスクラスです。
 */
class FetchService {
  fetch(url) {
    return http.get("/fetch/?url=" + url);
  }
}

export default new FetchService();
