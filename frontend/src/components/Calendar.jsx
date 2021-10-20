import React, { Fragment, useEffect, useState } from "react";
import {
  format,
  getDate,
  getDay,
  eachDayOfInterval,
  endOfWeek,
  eachWeekOfInterval,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue, red, pink } from "@mui/material/colors";
import { YOUBI } from "utils/constants";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";
import { byteSlice } from "utils/string";
import { ReactComponent as QiitaIcon } from "images/qiita.svg";
import { ReactComponent as ZennIcon } from "images/zenn.svg";
import { ReactComponent as HatenaBlogIcon } from "images/hatenablog.svg";
import { ReactComponent as NoteIcon } from "images/note.svg";
import { ReactComponent as NotionIcon } from "images/notion.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0.5, 0),
    display: "inline-block",
    width: "9.5rem",
  },
}));

const getCalendarArray = (date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
  return sundays.map((sunday) =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
};

const useCalendarCellStyles = makeStyles((theme) => ({
  calendarCell: {
    backgroundColor: ({ isToday, isInRange }) =>
      !isInRange ? "#dfdfdf" : isToday ? pink[50] : "transparent",
    padding: "0",
    border: "1px solid #d3d3d3",
    display: "inline-block",
    width: "9.5rem",
  },
  dateCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    paddingLeft: "0.25rem",
    height: "2rem",
    borderBottom: "1px solid #d8d8d8",
    color: ({ wday, isTargetMonth }) => {
      if (isTargetMonth) {
        switch (wday) {
          case 0: // 日曜日
            return red[500];
          case 6: // 土曜日
            return blue[500];
          default:
            return theme.palette.text.primary;
        }
      } else {
        // 前月または翌月
        switch (wday) {
          case 0: // 日曜日
            return red[200];
          case 6: // 土曜日
            return blue[200];
          default:
            return theme.palette.text.primary;
        }
      }
    },
  },
  contentCell: {
    width: "9.5rem",
    height: "4.5rem",
  },
}));

/**
 * カレンダーのテーブルのセルのコンポーネントです。
 * @param {*} props
 */
const CalendarTableCell = (props) => {
  const {
    wday,
    isTargetMonth,
    isToday,
    children,
    isInRange,
    schedules,
    date,
    ...other
  } = props;
  const classes = useCalendarCellStyles(props);
  return (
    <TableCell className={classes.calendarCell} {...other}>
      <div className={classes.dateCell}>{children}</div>
      <div className={classes.contentCell}>
        {props.schedules.map((schedule) => {
          if (schedule.date === format(props.date, "yyyy-MM-dd")) {
            return (
              <Fragment key={date}>
                {schedule.articleUrl === "" && (
                  <div
                    className="ellipsis2"
                    style={{
                      height: "3rem",
                      width: "9.5rem",
                    }}
                  >
                    <Tooltip
                      title={schedule.articleTitle}
                      placement="top"
                      disableInteractive
                    >
                      <Typography>
                        {byteSlice(schedule.articleTitle, 34)}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                {schedule.articleUrl !== "" && (
                  <div
                    className="ellipsis2"
                    style={{
                      height: "3rem",
                      width: "9.5rem",
                    }}
                  >
                    <Tooltip
                      title={schedule.articleTitle}
                      placement="top"
                      disableInteractive
                    >
                      <a
                        href={
                          schedule.articleUrl.match(/https?:\/\/.*/)
                            ? schedule.articleUrl
                            : "http://" + schedule.articleUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Typography>
                          {byteSlice(schedule.articleTitle, 34)}
                        </Typography>
                      </a>
                    </Tooltip>
                  </div>
                )}
                <div
                  style={{
                    wordBreak: "break-all",
                    padding: "0 0.5rem",
                  }}
                >
                  {schedule.authorUrl === "" && (
                    <Tooltip title={schedule.authorName} disableInteractive>
                      <Typography style={{ fontSize: "0.9rem" }}>
                        {byteSlice(schedule.authorName, 16)}
                      </Typography>
                    </Tooltip>
                  )}
                  {schedule.authorUrl !== "" && (
                    <Tooltip title={schedule.authorName} disableInteractive>
                      <a
                        href={
                          schedule.authorUrl.match(/https?:\/\/.*/)
                            ? schedule.authorUrl
                            : "http://" + schedule.authorUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Typography style={{ fontSize: "0.9rem" }}>
                          {byteSlice(schedule.authorName, 16)}
                        </Typography>
                      </a>
                    </Tooltip>
                  )}
                </div>
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
    </TableCell>
  );
};

/**
 * 閲覧・編集用カレンダーのコンポーネントです。
 */
const Calendar = (props) => {
  const [targetDate, setTargetDate] = useState(new Date());
  const classes = useStyles();
  const calendar = getCalendarArray(targetDate);
  const today = new Date();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editDate, setEditDate] = useState(new Date());

  useEffect(() => {
    if (props.calendarData.startAt.match(/\d{4}-\d{2}-\d{2}/)) {
      setTargetDate(new Date(props.calendarData.startAt));
    }
  }, [props.calendarData.startAt]);

  /**
   * 渡された日付が範囲内にあるかどうか返します。
   * @param {*} date
   * @returns 範囲内ならtrue
   */
  const getIsInRange = (date) => {
    return (
      date.getTime() + 9 * 3600 * 1000 >=
        new Date(props.calendarData.startAt).getTime() &&
      date.getTime() <= new Date(props.calendarData.endAt).getTime()
    );
  };

  /**
   * 予定を編集するボタンが押されたときの処理です。
   */
  const onEditButtonClick = (date) => {
    setEditDate(date);
    setIsEditDialogOpen(true);
  };

  return (
    <Fragment>
      <div style={{ padding: "20px 0 0 0" }}>
        <Grid
          container
          justifyContent="center"
          style={{ paddingRight: "0.5rem" }}
        >
          <Grid item style={{ margin: "0 8px" }}>
            <Button
              variant="outlined"
              onClick={() => setTargetDate(subMonths(targetDate, 1))}
              disabled={new Date(props.calendarData.startAt) >= targetDate}
            >
              前の月
            </Button>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Typography
              variant="h4"
              align="center"
              style={{ margin: "0 0 4px 0" }}
            >
              {format(targetDate, "y年M月")}
            </Typography>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Button
              variant="outlined"
              onClick={() => setTargetDate(addMonths(targetDate, 1))}
              disabled={new Date(props.calendarData.endAt) <= targetDate}
            >
              次の月
            </Button>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              {/* 曜日列 */}
              {YOUBI.map((y, index) => {
                return (
                  <TableCell
                    align="center"
                    classes={{ head: classes.tableHead }}
                    key={index}
                    style={{
                      color: "white",
                    }}
                  >
                    {y}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendar.map((weekRow, rowNum) => (
              <TableRow key={rowNum}>
                {weekRow.map((date) => (
                  <CalendarTableCell
                    key={getDay(date)}
                    wday={getDay(date)}
                    isTargetMonth={isSameMonth(date, targetDate)}
                    isToday={isSameDay(date, today)}
                    isInRange={getIsInRange(date)}
                    schedules={props.schedules}
                    date={date}
                  >
                    <Typography style={{ fontSize: "1.2rem" }}>
                      {getDate(date)}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    {props.schedules.map((schedule) => {
                      if (schedule.date === format(date, "yyyy-MM-dd")) {
                        return (
                          <Fragment>
                            {schedule.articleUrl.match(/.*qiita.com\/.+/) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <QiitaIcon
                                    style={{
                                      height: "1.3rem",
                                      width: "1.3rem",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </a>
                              </IconButton>
                            )}
                            {schedule.articleUrl.match(/.*zenn.dev\/.+/) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <ZennIcon
                                    style={{
                                      height: "1.3rem",
                                      width: "1.3rem",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </a>
                              </IconButton>
                            )}
                            {schedule.articleUrl.match(
                              /.*\.hatenablog.\/.+/
                            ) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <HatenaBlogIcon
                                    style={{
                                      height: "2rem",
                                      width: "2rem",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </a>
                              </IconButton>
                            )}
                            {schedule.articleUrl.match(/.*note.com\/.+/) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <NoteIcon
                                    style={{
                                      height: "1.3rem",
                                      width: "1.3rem",
                                      objectFit: "cover",
                                      objectPosition: "70% 70%",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </a>
                              </IconButton>
                            )}
                            {schedule.articleUrl.match(/.*notion.so\/.+/) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <NotionIcon
                                    style={{
                                      height: "1.3rem",
                                      width: "1.3rem",
                                      objectFit: "cover",
                                      objectPosition: "70% 70%",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </a>
                              </IconButton>
                            )}
                            {schedule.articleUrl.match(/.*github.com\/.+/) && (
                              <IconButton size="small">
                                <a
                                  href={
                                    schedule.articleUrl.match(/https?:\/\/.*/)
                                      ? schedule.articleUrl
                                      : "http://" + schedule.articleUrl
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: "black" }}
                                >
                                  <GitHubIcon style={{ marginTop: "0.2rem" }} />
                                </a>
                              </IconButton>
                            )}
                            {/* 著者URL */}
                            {schedule.authorUrl.match(/.*twitter.com\/.+/) &&
                              schedule.profileImageUrl === "" && (
                                <IconButton size="small">
                                  <a
                                    href={
                                      schedule.authorUrl.match(/https?:\/\/.*/)
                                        ? schedule.authorUrl
                                        : "http://" + schedule.authorUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "#1da1f2" }}
                                  >
                                    <TwitterIcon
                                      style={{ marginTop: "0.2rem" }}
                                    />
                                  </a>
                                </IconButton>
                              )}
                            {/* プロフィール画像 */}
                            {schedule.authorUrl.match(/.*twitter.com\/.+/) &&
                              schedule.profileImageUrl !== "" && (
                                <IconButton size="small">
                                  <a
                                    href={
                                      schedule.authorUrl.match(/https?:\/\/.*/)
                                        ? schedule.authorUrl
                                        : "http://" + schedule.authorUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={schedule.profileImageUrl}
                                      alt="Twitterプロフィール画像"
                                      style={{
                                        display:
                                          schedule.profileImageUrl === ""
                                            ? "none"
                                            : "",
                                        width: "1.75rem",
                                        height: "1.75rem",
                                        marginTop: "0.2rem",
                                      }}
                                    />
                                  </a>
                                </IconButton>
                              )}
                          </Fragment>
                        );
                      }
                    })}
                    {props.authKey !== "" && getIsInRange(date) && (
                      <Fragment>
                        <Tooltip title="編集" placement="top">
                          <IconButton
                            size="small"
                            onClick={() => {
                              onEditButtonClick(date);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Fragment>
                    )}
                  </CalendarTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FormDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        date={editDate}
        schedules={props.schedules}
        authKey={props.authKey}
        fetchSchedule={props.fetchSchedule}
      />
    </Fragment>
  );
};

export default Calendar;
