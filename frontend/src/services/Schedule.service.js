import http from "http-common";

/**
 * 予定に関するサービスクラスです。
 */
class ScheduleService {
  findByCalendarId(calendarId) {
    return http.get("/schedule/" + calendarId);
  }

  create(calendarId, schedule) {
    return http.post("/schedule/" + calendarId, schedule);
  }

  update(calendarId, schedule) {
    return http.put("/schedule/" + calendarId, schedule);
  }
}

export default new ScheduleService();
