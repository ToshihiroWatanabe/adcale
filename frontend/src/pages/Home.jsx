import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "calc(100vh - 3rem)",
    backgroundColor: theme.palette.primary.light,
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  link: { textDecoration: "none" },
}));

/**
 * ホームページ(トップページ)のコンポーネントです。
 */
const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <Typography component="h1" variant="h2">
          アドベントカレンダー作成アプリ
        </Typography>
        <Typography variant="h6">
          エンジニアの情報発信イベントに使えそうなアドベントカレンダーを簡単に作成し、共有できるアプリです。
        </Typography>
        <Link to="/new" className={classes.link} style={{ color: "white" }}>
          <Button variant="outlined" color="inherit">
            <Typography component="p" variant="h4" style={{ color: "white" }}>
              カレンダーを作る
            </Typography>
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
