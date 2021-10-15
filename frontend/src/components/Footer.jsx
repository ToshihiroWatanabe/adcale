import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    bottom: 0,
  },
  footerContent: {
    textAlign: "center",
    width: "100vw",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 0.5),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <Link to="/" className={classes.link}>
          アドベントカレンダー作成アプリ
        </Link>{" "}
        by{" "}
        <a href="https://github.com/ToshihiroWatanabe" className={classes.link}>
          ワタナベトシヒロ
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;
