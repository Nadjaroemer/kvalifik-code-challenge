import _ from "lodash";
import { Box, Grid } from "@chakra-ui/react";
import type { FC } from "react";

export const getAllDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const calculateFirstDateOffset = (date: Date) => {
  const day = date.getDay();
  if (day === 0) {
    return 6;
  }
  return day - 1;
};

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  param?: string;
  startDay: number;
};

const Calendar: FC<Props> = (props) => {
  const currentDate = new Date();
  const dates = getAllDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDateOffset = calculateFirstDateOffset(dates[0]);

  return (
    <Box
      w="500px"
      bg="white"
      h="400px"
      borderRadius="13px"
      boxShadow="0 0 99px 0px rgba(0, 0, 0, 0.04)"
      mb="10"
    >
      <Box>May 2022</Box>
      <Grid gridTemplateColumns="repeat(7, 1fr)">
        <>
          {weekdays.map((weekday) => {
            return <Box key={weekday}>{weekday}</Box>;
          })}
          {_.times(firstDateOffset, (num) => {
            return <Box key={`offset-${num}`}></Box>;
          })}
          {dates.map((date) => {
            return <Box key={date.getDate()}>{date.getDate()}</Box>;
          })}
        </>
      </Grid>
    </Box>
  );
};

export default Calendar;
