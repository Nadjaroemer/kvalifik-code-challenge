import _ from "lodash";
import { Box, Grid, Button } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { startOfMonth } from "date-fns";
import { primaryPurple } from "../App";

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
      p="8"
      bg="white"
      w="500px"
      borderRadius="13px"
      boxShadow="0 0 99px 0px rgba(0, 0, 0, 0.04)"
      mb="10"
    >
      <Box display="flex" justifyContent="space-between">
        <Box>{`${firstDateInMonth.toLocaleString("default", {
          month: "long",
        })} ${firstDateInMonth.getFullYear()}`}</Box>
        <Box>
          <Button
            size="xs"
            borderRadius="50%"
            backgroundColor={primaryPurple}
            _hover={{ bg: "#000" }}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const today = new Date();
              setFirstDateInMonth(startOfMonth(today));
              props.selectDate(today);
            }}
          >
            Today
          </Button>
          <Button
            size="xs"
            borderRadius="50%"
            backgroundColor={primaryPurple}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-25 w-25"
              fill="none"
              viewBox="0 0 20 20"
              stroke="white"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Box>
      </Box>
      <Grid
        gridTemplateColumns="repeat(7, 1fr)"
        h="250px"
        w="440px"
        justifyContent="center"
      >
        <>
          {weekdays.map((weekday) => {
            return (
              <Box color="#d6d6d6" key={weekday}>
                {weekday}
              </Box>
            );
          })}
          {_.times(firstDateOffset, (num) => {
            return <Box color="#707070" key={`offset-${num}`}></Box>;
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
                    ? primaryPurple
                    : undefined
                }
                color={
                  date.toDateString() === props.selectedDate.toDateString()
                    ? "white"
                    : "#707070"
                }
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                borderLeft="1px"
                borderLeftColor="#d6d6d6"
                borderTop="1px"
                borderTopColor="#d6d6d6"
                borderEnd="1px"
                borderInlineEnd="none"
              >
                {date.getDate()}.
              </Box>
            );
          })}
        </>
      </Grid>
    </Box>
  );
};

export default Calendar;
