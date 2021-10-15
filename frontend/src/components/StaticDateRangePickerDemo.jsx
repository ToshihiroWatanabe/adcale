import { Fragment, useEffect } from "react";
import { TextField, Box, useMediaQuery, useTheme } from "@mui/material";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ja from "date-fns/locale/ja";

/**
 * 日付の範囲を選択するカレンダーのコンポーネントです。
 * @param {*} props
 */
const StaticDateRangePickerDemo = (props) => {
  const theme = useTheme();
  const isBreakPointsDownMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    formatYearMonth();
  }, []);

  /**
   * カレンダーの年と月の表示のフォーマットを変更します。
   */
  const formatYearMonth = () => {
    if (!isBreakPointsDownMd) {
      let text = "";
      text = document.getElementsByClassName("MuiTypography-subtitle1")[0]
        .textContent;
      document.getElementsByClassName(
        "MuiTypography-subtitle1"
      )[0].textContent = text.split(" ")[1] + "年" + text.split(" ")[0];
      text = document.getElementsByClassName("MuiTypography-subtitle1")[1]
        .textContent;
      document.getElementsByClassName(
        "MuiTypography-subtitle1"
      )[1].textContent = text.split(" ")[1] + "年" + text.split(" ")[0];
    } else {
      // const elem = document.getElementById("staticDateRangePicker").children[0]
      //   .children[0].children[0].children[0];
      // elem.classList.add("displayFlex");
      // elem.children[1].innerHTML =
      //   elem.children[1].innerHTML.split("年")[0] + "年";
      // elem.children[0].classList.add("order2");
      // elem.children[1].classList.add("order1");
    }
  };

  /**
   * 選択された日が変わったときの処理です。
   * @param {*} newValue
   */
  const onChange = (newValue) => {
    props.setDateRange(newValue);
    props.setDateRangeHelperText("");
  };

  /**
   * 月が切り替わったときの処理です。
   */
  const onMonthChange = () => {
    if (!isBreakPointsDownMd) {
      document
        .getElementsByClassName("MuiTypography-subtitle1")[0]
        .classList.add("hidden");
      document
        .getElementsByClassName("MuiTypography-subtitle1")[1]
        .classList.add("hidden");
      setTimeout(() => {
        formatYearMonth();
        document
          .getElementsByClassName("MuiTypography-subtitle1")[0]
          .classList.remove("hidden");
        document
          .getElementsByClassName("MuiTypography-subtitle1")[1]
          .classList.remove("hidden");
      }, 1);
    } else {
      formatYearMonth();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
      <div id="staticDateRangePicker">
        <StaticDateRangePicker
          displayStaticWrapperAs={isBreakPointsDownMd ? "mobile" : "desktop"}
          value={props.dateRange}
          onChange={onChange}
          onMonthChange={onMonthChange}
          renderInput={(startProps, endProps) => (
            <Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </Fragment>
          )}
          minDate={new Date().setMonth(new Date().getMonth() - 1)}
          showToolbar={false}
        />
      </div>
    </LocalizationProvider>
  );
};

export default StaticDateRangePickerDemo;
