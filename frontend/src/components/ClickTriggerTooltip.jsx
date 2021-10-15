import { Fragment } from "react";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ClickTriggerTooltip = (props) => {
  const handleTooltipClose = () => {
    props.setOpen(false);
  };

  return (
    <Fragment>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={props.open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={props.title}
        >
          {props.children}
        </Tooltip>
      </ClickAwayListener>
    </Fragment>
  );
};

export default ClickTriggerTooltip;
