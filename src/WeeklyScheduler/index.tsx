import { useState, ChangeEvent, useEffect } from "react";
import moment from "moment-timezone";
import "moment/locale/en-gb";
import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  convertHourStateToTargetTimezone,
  firstThreeLater,
  hourFrom12PMTo5PM,
  hourFrom7PMTo11PM,
  hourFrom8AMTo11AM,
  weekdays,
} from "../utils";

// styles for the WeeklyScheduler component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  day: {
    fontWeight: "bold",
  },
}));

const WeeklySchedule = () => {
  const classes = useStyles();
  //   Stats for WeeklyScheduler component
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
    moment().startOf("week")
  );
  const [targetTimezone, setTargetTimezone] = useState("UTC");
  const [hourStateFrom8AMTo11AM, setHourStateFrom8AMTo11AM] =
    useState<string[]>(hourFrom8AMTo11AM);
  const [hourStateFrom12PMTo5PM, setHourStateFrom12PMTo5PM] =
    useState<string[]>(hourFrom12PMTo5PM);
  const [hourStateFrom7PMTo11PM, setHourStateFrom7PMTo11PM] =
    useState<string[]>(hourFrom7PMTo11PM);

  //  useEffect hook to update the hourStateFrom8AMTo11AM, hourStateFrom12PMTo5PM, hourStateFrom7PMTo11PM
  useEffect(() => {
    setHourStateFrom8AMTo11AM(
      convertHourStateToTargetTimezone(hourFrom8AMTo11AM, targetTimezone)
    );
    setHourStateFrom12PMTo5PM(
      convertHourStateToTargetTimezone(hourFrom12PMTo5PM, targetTimezone)
    );
    setHourStateFrom7PMTo11PM(
      convertHourStateToTargetTimezone(hourFrom7PMTo11PM, targetTimezone)
    );
  }, [targetTimezone]);

  //  handlePrevWeek function to update the currentWeekStartDate
  const handlePrevWeek = () => {
    setCurrentWeekStartDate(currentWeekStartDate.clone().subtract(1, "week"));
  };

  //  handleNextWeek function to update the currentWeekStartDate
  const handleNextWeek = () => {
    setCurrentWeekStartDate(currentWeekStartDate.clone().add(1, "week"));
  };

  //   handleTimezoneChange function to update the targetTimezone
  const handleTimezoneChange = (
    event: ChangeEvent<{ name?: string | undefined; value: any }>
  ) => {
    setTargetTimezone(event.target.value);
  };

  //   return the WeeklyScheduler component
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Button variant="contained" color="primary" onClick={handlePrevWeek}>
            Previous Week
          </Button>
          <Box fontWeight="fontWeightBold">
            <DatePicker
              selected={currentWeekStartDate.toDate()}
              onChange={(date) => {
                setCurrentWeekStartDate(moment(date));
              }}
              dateFormat="dd/MM/yyyy"
              customInput={
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                />
              }
            />
          </Box>
        </div>
        <Button variant="contained" color="primary" onClick={handleNextWeek}>
          Next Week
        </Button>
      </div>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="timezone-select-label">Select Timezone</InputLabel>
          <Select
            labelId="timezone-select-label"
            id="timezone-select"
            value={targetTimezone}
            onChange={handleTimezoneChange}
          >
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="America/New_York">America/New_York</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {weekdays.map((day) => (
        <div className="card">
          <div>
            <Typography variant="subtitle1" className={classes.day}>
              {firstThreeLater(day)}
            </Typography>
            <Typography variant="subtitle1">
              {currentWeekStartDate.clone().day(day).format("DD/MM")}
            </Typography>
          </div>

          <div>
            {" "}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {hourStateFrom8AMTo11AM.map((hour) => (
                <FormControlLabel
                  key={hour}
                  control={<Checkbox />}
                  label={hour}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {hourStateFrom12PMTo5PM.map((hour) => (
                <FormControlLabel
                  key={hour}
                  control={<Checkbox />}
                  label={hour}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {hourStateFrom7PMTo11PM.map((hour) => (
                <FormControlLabel
                  key={hour}
                  control={<Checkbox />}
                  label={hour}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WeeklySchedule;
