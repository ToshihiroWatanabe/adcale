import http from "http-common";

/**
 * カレンダーに関するサービスクラスです。
 */
class CalendarService {
  findById(id) {
    return http.get("/calendar/" + id);
  }

  create(calendar) {
    return http.post("/calendar", calendar);
  }

  auth(calendar) {
    return http.post("/calendar/auth", calendar);
  }
}

export default new CalendarService();
