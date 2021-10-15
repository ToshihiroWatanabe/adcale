import {
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Calendar from "components/Calendar";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import CalendarService from "services/Calendar.service";
import ScheduleService from "services/Schedule.service";
import { YOUBI } from "utils/constants";
import ShareIcon from "@mui/icons-material/Share";
import { copyToClipboard } from "utils/export";
import ClickTriggerTooltip from "components/ClickTriggerTooltip";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

/**
 * カレンダー閲覧・編集画面のコンポーネントです。
 */
const View = () => {
  const theme = useTheme();
  const isBreakPointsDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [calendarData, setCalendarData] = useState({
    id: "",
    authKey: "",
    title: "読込中...",
    startAt: "",
    endAt: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [authKey, setAuthKey] = useState("");
  const [readOnlyShareButtonTooltipOpen, setReadOnlyShareButtonTooltipOpen] =
    useState(false);
  const [editableShareButtonTooltipOpen, setEditableShareButtonTooltipOpen] =
    useState(false);

  useEffect(() => {
    CalendarService.findById(window.location.pathname.split("/view/")[1])
      .then((res) => {
        if (res.status === 200) {
          setCalendarData(res.data);
          fetchSchedule(res.data.id);
          // ページタイトル変更
          document.title = res.data.title + " - " + document.title;
        }
      })
      .catch((res) => {
        setCalendarData({
          ...calendarData,
          title: "カレンダーの取得に失敗しました",
        });
      });
    if (window.location.href.match(/.*?authkey=.*/)) {
      // 認証
      CalendarService.auth({
        id: window.location.pathname.split("/view/")[1],
        // authKey: window.location.href.split("?authkey=")[1],
        authKey: window.location.search.split("?authkey=")[1],
      }).then((res) => {
        if (res.data) {
          // 認証成功
          setAuthKey(window.location.search.split("?authkey=")[1]);
        }
      });
    }
  }, []);

  /**
   * 予定を取得します。
   * @param {*} calendarId
   */
  const fetchSchedule = (calendarId) => {
    ScheduleService.findByCalendarId(calendarId).then((res) => {
      setSchedules(res.data);
    });
  };

  /**
   * 閲覧専用URLをコピーするボタンがクリックされたときの処理です。
   */
  const onReadOnlyShareButtonClick = () => {
    copyToClipboard(window.location.href.split("?")[0]);
    setReadOnlyShareButtonTooltipOpen(true);
  };

  /**
   * 編集権限付きURLをコピーするボタンがクリックされたときの処理です。
   */
  const onEditableShareButtonClick = () => {
    copyToClipboard(window.location.href);
    setEditableShareButtonTooltipOpen(true);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isBreakPointsDownLg ? "" : "center",
          overflowX: "auto",
        }}
      >
        <Paper
          style={{
            width: "72rem",
            margin: "40px 0px 0px 0px",
            padding: "40px",
          }}
        >
          <Typography component="h2" variant="h4">
            {calendarData.title}
          </Typography>
          {calendarData.startAt !== "" && calendarData.endAt !== "" && (
            <Typography>
              期間:{" "}
              {format(new Date(calendarData.startAt), "yyyy年MM月dd日") +
                "(" +
                YOUBI[new Date(calendarData.startAt).getDay()] +
                ") ~ " +
                format(new Date(calendarData.endAt), "yyyy年MM月dd日") +
                "(" +
                YOUBI[new Date(calendarData.endAt).getDay()] +
                ")"}
            </Typography>
          )}
          <ClickTriggerTooltip
            title="コピーしました！"
            open={readOnlyShareButtonTooltipOpen}
            setOpen={setReadOnlyShareButtonTooltipOpen}
          >
            <Button onClick={onReadOnlyShareButtonClick}>
              <ShareIcon />
              {authKey !== "" ? "閲覧専用" : "共有"}URLをコピー
            </Button>
          </ClickTriggerTooltip>
          {authKey !== "" && (
            <ClickTriggerTooltip
              title="コピーしました！"
              open={editableShareButtonTooltipOpen}
              setOpen={setEditableShareButtonTooltipOpen}
            >
              <Button onClick={onEditableShareButtonClick}>
                <ShareIcon />
                <VpnKeyIcon />
                編集権限付きURLをコピー
              </Button>
            </ClickTriggerTooltip>
          )}

          <Calendar
            calendarData={calendarData}
            schedules={schedules}
            authKey={authKey}
            fetchSchedule={fetchSchedule}
          />
        </Paper>
      </div>
    </Fragment>
  );
};

export default View;
