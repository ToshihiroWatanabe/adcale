import { Fragment, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { format, getDay } from "date-fns";
import {
  ARTICLE_TITLE_MAX,
  ARTICLE_URL_MAX,
  AUTHOR_NAME_MAX,
  AUTHOR_URL_MAX,
  YOUBI,
} from "utils/constants";
import ScheduleService from "services/Schedule.service";
import FetchService from "services/Fetch.service";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@emotion/react";
import axios from "axios";

/** デフォルトの予定 */
const defaultSchedule = {
  id: "",
  articleTitle: "",
  articleUrl: "",
  authorName: "",
  authorUrl: "",
};

/**
 * フォームダイアログのコンポーネントです。
 * @param {*} props
 */
const FormDialog = (props) => {
  const date = format(props.date, "yyyy-MM-dd");
  const calendarId = window.location.pathname.split("/view/")[1];
  const [articleTitle, setArticleTitle] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const filteredSchedules = props.schedules.filter((schedule) => {
    if (schedule.date === date) {
      return true;
    } else {
      return false;
    }
  });
  const schedule =
    filteredSchedules.length > 0 ? filteredSchedules[0] : defaultSchedule;
  let isControlPressed = false;
  const [isProceedButtonDisabled, setIsProceedButtonDisabled] = useState(false);
  const [proceedButtonHelperText, setProceedButtonHelperText] = useState("");
  const [isInProceeding, setIsInProceeding] = useState(false);
  const [isArticleTitleInFetching, setIsArticleTitleInFetching] =
    useState(false);
  const [isAuthorNameInFetching, setIsAuthorNameInFetching] = useState(false);
  const theme = useTheme();
  const isBreakPointsDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [articleTitleHelperText, setArticleTitleHelperText] = useState("");
  const [articleUrlHelperText, setArticleUrlHelperText] = useState("");
  const [authorNameHelperText, setAuthorNameHelperText] = useState("");
  const [authorUrlHelperText, setAuthorUrlHelperText] = useState("");

  useEffect(() => {
    setArticleTitle(schedule.articleTitle);
    setArticleUrl(schedule.articleUrl);
    setAuthorName(schedule.authorName);
    setAuthorUrl(schedule.authorUrl);
  }, [props]);

  const handleClose = () => {
    setProceedButtonHelperText("");
    props.setOpen(false);
  };

  /**
   * 入力された値を検証します。
   */
  const validate = () => {
    if (articleTitle.length > ARTICLE_TITLE_MAX) {
      setArticleTitleHelperText(ARTICLE_TITLE_MAX + "文字以内にしてください");
      return false;
    }
    if (articleUrl.length > ARTICLE_URL_MAX) {
      setArticleUrlHelperText(ARTICLE_URL_MAX + "文字以内にしてください");
      return false;
    }
    if (authorName.length > AUTHOR_NAME_MAX) {
      setAuthorNameHelperText(AUTHOR_NAME_MAX + "文字以内にしてください");
      return false;
    }
    if (authorUrl.length > AUTHOR_URL_MAX) {
      setAuthorUrlHelperText(AUTHOR_URL_MAX + "文字以内にしてください");
      return false;
    }
    return true;
  };

  /**
   * 登録または更新ボタンが押されたときの処理です。
   */
  const onProceedButtonClick = () => {
    if (!validate()) {
      return;
    }
    setIsProceedButtonDisabled(true);
    setProceedButtonHelperText("");
    setIsInProceeding(true);
    // 新規作成
    if (schedule.id === "") {
      ScheduleService.create(calendarId, {
        authKey: props.authKey,
        date: date,
        articleTitle: articleTitle,
        articleUrl: articleUrl,
        authorName: authorName,
        authorUrl: authorUrl,
      })
        .then((res) => {
          setIsInProceeding(false);
          setIsProceedButtonDisabled(false);
          if (res.status === 200) {
            props.fetchSchedule(calendarId);
            props.setOpen(false);
          } else {
            setProceedButtonHelperText("予定の作成に失敗しました。");
          }
        })
        .catch(() => {
          setIsInProceeding(false);
          setIsProceedButtonDisabled(false);
          setProceedButtonHelperText("予定の作成に失敗しました。");
        });
    } else {
      // 更新
      ScheduleService.update(calendarId, {
        authKey: props.authKey,
        date: date,
        articleTitle: articleTitle,
        articleUrl: articleUrl,
        authorName: authorName,
        authorUrl: authorUrl,
      })
        .then((res) => {
          setIsInProceeding(false);
          setIsProceedButtonDisabled(false);
          if (res.status === 200) {
            props.fetchSchedule(calendarId);
            props.setOpen(false);
          } else {
            setProceedButtonHelperText("予定の更新に失敗しました。");
          }
        })
        .catch(() => {
          setIsInProceeding(false);
          setIsProceedButtonDisabled(false);
          setProceedButtonHelperText("予定の更新に失敗しました。");
        });
    }
  };

  /**
   * キーが押されたときの処理です。
   */
  const onKeyDown = (event) => {
    if (event.key === "Control") {
      isControlPressed = true;
    }
    if (event.key === "Enter" && isControlPressed) {
      document.activeElement.blur();
      isControlPressed = false;
      onProceedButtonClick();
    }
  };

  /**
   * 記事URLの入力値が変わったときの処理です。
   */
  const onArticleUrlChange = (e) => {
    setArticleUrlHelperText("");
    setArticleUrl(e.target.value);
    if (articleTitle === "" && e.target.value.match(/.+\..{2,}/)) {
      // ページタイトルを取得する
      setIsArticleTitleInFetching(true);
      const url = e.target.value.match(/https?:\/\/.*/)
        ? e.target.value.split("//")[1]
        : e.target.value;
      FetchService.fetch(url)
        .then((res) => {
          setIsArticleTitleInFetching(false);
          if (res.status === 200 && res.data !== "") {
            setArticleTitle(res.data);
          }
        })
        .catch(() => {
          setIsArticleTitleInFetching(false);
        });
    }
  };

  /**
   * 著者のURLの入力値が変わったときの処理です。
   */
  const onAuthorUrlChange = (e) => {
    setAuthorUrlHelperText("");
    setAuthorUrl(e.target.value);
    // TwitterのユーザーのURLの場合
    if (authorName === "" && e.target.value.match(/.*twitter.com\//)) {
      // CORSで弾かれる
      axios
        .get(
          "https://api.twitter.com/2/users/by/username/WataToshihiro?user.fields=profile_image_url",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAuthorName(res.data.name);
          }
        });
    } else if (authorName === "" && e.target.value.match(/.+\..{2,}/)) {
      // ページタイトルを取得する
      setIsAuthorNameInFetching(true);
      const url = e.target.value.match(/https?:\/\/.*/)
        ? e.target.value.split("//")[1]
        : e.target.value;
      FetchService.fetch(url)
        .then((res) => {
          setIsAuthorNameInFetching(false);
          if (res.status === 200 && res.data !== "") {
            setAuthorName(res.data);
          }
        })
        .catch(() => {
          setIsAuthorNameInFetching(false);
        });
    }
  };

  return (
    <Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullScreen={isBreakPointsDownSm}
      >
        <DialogTitle>
          {format(props.date, "M月d日") + "(" + YOUBI[getDay(props.date)] + ")"}
        </DialogTitle>
        <DialogContent onKeyDown={onKeyDown}>
          <TextField
            autoFocus
            margin="dense"
            label={
              isArticleTitleInFetching
                ? "記事タイトルを取得中..."
                : "記事タイトル"
            }
            type="text"
            fullWidth
            variant="standard"
            value={articleTitle}
            error={articleTitleHelperText !== ""}
            helperText={articleTitleHelperText}
            onChange={(e) => {
              setArticleTitleHelperText("");
              setArticleTitle(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="削除"
                  style={{ display: articleTitle === "" ? "none" : "" }}
                >
                  <IconButton
                    onClick={() => {
                      setArticleTitleHelperText("");
                      setArticleTitle("");
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="記事URL"
            type="url"
            fullWidth
            variant="standard"
            value={articleUrl}
            error={articleUrlHelperText !== ""}
            helperText={articleUrlHelperText}
            onChange={onArticleUrlChange}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="削除"
                  style={{ display: articleUrl === "" ? "none" : "" }}
                >
                  <IconButton
                    onClick={() => {
                      setArticleUrlHelperText("");
                      setArticleUrl("");
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <TextField
            margin="dense"
            label={
              isAuthorNameInFetching ? "著者の名前を取得中..." : "著者の名前"
            }
            type="text"
            fullWidth
            variant="standard"
            value={authorName}
            error={authorNameHelperText !== ""}
            helperText={authorNameHelperText}
            onChange={(e) => {
              setAuthorNameHelperText("");
              setAuthorName(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="削除"
                  style={{ display: authorName === "" ? "none" : "" }}
                >
                  <IconButton
                    onClick={() => {
                      setAuthorNameHelperText("");
                      setAuthorName("");
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="著者URL"
            type="url"
            fullWidth
            variant="standard"
            value={authorUrl}
            error={authorUrlHelperText !== ""}
            helperText={authorUrlHelperText}
            onChange={onAuthorUrlChange}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="削除"
                  style={{ display: authorUrl === "" ? "none" : "" }}
                >
                  <IconButton
                    onClick={() => {
                      setAuthorUrlHelperText("");
                      setAuthorUrl("");
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <span style={{ marginLeft: "1rem" }}>
            <Button
              onClick={() => {
                onProceedButtonClick();
              }}
              variant="contained"
              style={{ color: "white" }}
              disabled={isProceedButtonDisabled}
            >
              {schedule.id === "" ? "登録" : "更新"}
            </Button>
            {isInProceeding && (
              <CircularProgress
                style={{
                  position: "absolute",
                  right: "1.25rem",
                  bottom: "1rem",
                }}
              />
            )}
          </span>
        </DialogActions>
        <DialogContentText style={{ textAlign: "right", color: "red" }}>
          {proceedButtonHelperText}
        </DialogContentText>
      </Dialog>
    </Fragment>
  );
};

export default FormDialog;
