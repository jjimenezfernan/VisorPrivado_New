import { ResponsiveCalendar } from "@nivo/calendar";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";

function MyCalendar({ data }) {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveCalendar
      data={data}
      from="2022-05-01"
      to="2023-05-01"
      emptyColor="#eeeeee"
      colors={["#FF4C4C", "#ffa3a3", "#7fe3b7", "#3D9970"]}
      margin={{ top: 25, right: 10, bottom: 0, left: 20 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      //   monthSpacing={5}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
}

export default MyCalendar;
