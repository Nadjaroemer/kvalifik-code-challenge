import _ from "lodash";
import { Box, Grid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { startOfMonth } from "date-fns";

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
  selectedDate: Date;
  selectDate: (date: Date) => void;
};

const Calendar: FC<Props> = (props) => {
  const [firstDateInMonth, setFirstDateInMonth] = useState(
    startOfMonth(new Date())
  );
  const [dates, setDates] = useState<Date[]>([]);
  const [firstDateOffset, setFirstDateOffset] = useState(0);

  useEffect(() => {
    const newDates = getAllDaysInMonth(
      firstDateInMonth.getFullYear(),
      firstDateInMonth.getMonth()
    );
    setDates(newDates);
    const newFirstDateOffset = calculateFirstDateOffset(newDates[0]);
    setFirstDateOffset(newFirstDateOffset);
  }, [firstDateInMonth]);

  return (
    <Box
      w="500px"
      bg="white"
      borderRadius="13px"
      boxShadow="0 0 99px 0px rgba(0, 0, 0, 0.04)"
      mb="10"
    >
      <Box display="flex" justifyContent="space-between">
        <Box>{`${firstDateInMonth.toLocaleString("default", {
          month: "long",
        })} ${firstDateInMonth.getFullYear()}`}</Box>
        <Box>
          <button
            onClick={() => {
              setFirstDateInMonth(
                new Date(
                  firstDateInMonth.getFullYear(),
                  firstDateInMonth.getMonth() - 1,
                  firstDateInMonth.getDate()
                )
              );
            }}
          >
            {"<"}
          </button>
          <button>Today</button>
          <button
            onClick={() => {
              setFirstDateInMonth(
                new Date(
                  firstDateInMonth.getFullYear(),
                  firstDateInMonth.getMonth() + 1,
                  firstDateInMonth.getDate()
                )
              );
            }}
          >
            {">"}
          </button>
        </Box>
      </Box>
      <Grid gridTemplateColumns="repeat(7, 1fr)">
        <>
          {weekdays.map((weekday) => {
            return <Box key={weekday}>{weekday}</Box>;
          })}
          {_.times(firstDateOffset, (num) => {
            return <Box key={`offset-${num}`}></Box>;
          })}
          {dates.map((date) => {
            return (
              <Box
                key={date.getDate()}
                onClick={() => {
                  props.selectDate(date);
                }}
                backgroundColor={
                  date.toDateString() === props.selectedDate.toDateString()
                    ? "purple"
                    : undefined
                }
              >
                {date.getDate()}
              </Box>
            );
          })}
        </>
      </Grid>
    </Box>
  );
};

export default Calendar;
