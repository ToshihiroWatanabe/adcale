import { Fragment, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StaticDateRangePickerDemo from "components/StaticDateRangePickerDemo";
import { CALENDAR_TITLE_MAX } from "utils/constants";
import CalendarService from "services/Calendar.service";
import { format } from "date-fns";
import { Redirect } from "react-router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: theme.spacing(4),
  },
}));

/**
 * カレンダー新規作成ページのコンポーネントです。
 */
const New = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [titleHelperText, setTitleHelperText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateRangeHelperText, setDateRangeHelperText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [calendarId, setCalendarId] = useState("");
  const [calendarAuthKey, setCalendarAuthKey] = useState("");
  const theme = useTheme();
  const isBreakPointsDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isInCreating, setIsInCreating] = useState(false);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);
  const [createButtonHelperText, setCreateButtonHelperText] = useState("");

  /**
   * タイトルの入力値が変わったときの処理です。
   * @param {*} newValue
   */
  const onTitleChange = (newValue) => {
    setTitle(newValue.target.value);
    setTitleHelperText("");
  };

  /**
   * 作成ボタンがクリックされたときの処理です。
   */
  const onCreateButtonClick = () => {
    if (validate(title, dateRange)) {
      setIsInCreating(true);
      setIsCreateButtonDisabled(true);
      setCreateButtonHelperText("");
      CalendarService.create({
        title: title,
        startAt: format(dateRange[0], "yyyy-MM-dd"),
        endAt: format(dateRange[1], "yyyy-MM-dd"),
      })
        .then((res) => {
          if (res.status === 200) {
            setCalendarId(res.data.id);
            setCalendarAuthKey(res.data.authKey);
            setIsCreated(true);
          }
        })
        .catch((res) => {
          setIsInCreating(false);
          setIsCreateButtonDisabled(false);
          setCreateButtonHelperText("作成に失敗しました。");
        });
    }
  };

  /**
   * 入力された値を検証します。
   * @param {*} title
   * @param {*} dateRange
   * @returns
   */
  const validate = (title, dateRange) => {
    let isInvalid = false;
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setTitleHelperText("タイトルを入力してください");
      isInvalid = true;
    } else if (trimmedTitle.length > CALENDAR_TITLE_MAX) {
      setTitleHelperText(
        "タイトルは" + CALENDAR_TITLE_MAX + "文字以内にしてください"
      );
      isInvalid = true;
    }
    if (dateRange[0] === null || dateRange[1] === null) {
      setDateRangeHelperText("期間を選択してください");
      isInvalid = true;
    }
    return !isInvalid;
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Container>
          <Typography component="h1" variant="h3">
            カレンダーを作る
          </Typography>
          <Box mt={3} />
          <Typography component="h2" variant="h5">
            1. タイトルを入力
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={title}
            onChange={onTitleChange}
            helperText={titleHelperText}
            error={titleHelperText !== ""}
            style={{ width: isBreakPointsDownMd ? "16rem" : "32rem" }}
            placeholder={"カレンダーのタイトルを入力"}
          />
          <Box mt={3} />
          <Typography component="h2" variant="h5">
            2. 期間を選択
          </Typography>
          <Typography color="red">{dateRangeHelperText}</Typography>
          <StaticDateRangePickerDemo
            dateRange={dateRange}
            setDateRange={setDateRange}
            setDateRangeHelperText={setDateRangeHelperText}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={onCreateButtonClick}
              style={{ color: "white" }}
              disabled={isCreateButtonDisabled}
            >
              カレンダーを作成
            </Button>
            {isInCreating && <CircularProgress />}
          </div>
          <Typography color="red">{createButtonHelperText}</Typography>
          {isCreated ? (
            <Redirect
              to={"/view/" + calendarId + "?authkey=" + calendarAuthKey}
            />
          ) : null}
        </Container>
      </div>
    </Fragment>
  );
};

export default New;
