import _ from "lodash";
import { Box, Grid, Button, IconButton, Heading, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { startOfMonth } from "date-fns";
import { primaryPurple, secondaryPurple } from "../App";

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
      bg="white"
      w="500px"
      borderRadius="13px"
      boxShadow="0 0 99px 0px rgba(0, 0, 0, 0.04)"
      mb="10"
      overflow="hidden"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="12px"
      >
        <Box marginLeft="24px" display="flex" gap="4px">
          <Heading size="md" color="#707070" fontWeight="bold">
            {`${firstDateInMonth.toLocaleString("default", {
              month: "long",
            })}`}
          </Heading>
          <Heading size="md" color="#707070" fontWeight="light">
            {`${firstDateInMonth.getFullYear()}`}
          </Heading>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginRight="24px"
        >
          <IconButton
            size="xs"
            borderRadius="50%"
            backgroundColor={primaryPurple}
            _hover={{ bg: secondaryPurple }}
            aria-label="Go to previous month"
            onClick={() => {
              setFirstDateInMonth(
                new Date(
                  firstDateInMonth.getFullYear(),
                  firstDateInMonth.getMonth() - 1,
                  firstDateInMonth.getDate()
                )
              );
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="12px"
                width="12px"
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
            }
          />
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: "#ededed" }}
            onClick={() => {
              const today = new Date();
              setFirstDateInMonth(startOfMonth(today));
              props.selectDate(today);
            }}
          >
            <Text color={primaryPurple} fontSize="xl" fontWeight="light">
              Today
            </Text>
          </Button>
          <IconButton
            size="xs"
            borderRadius="50%"
            backgroundColor={primaryPurple}
            aria-label="Go to next month"
            _hover={{ bg: secondaryPurple }}
            onClick={() => {
              setFirstDateInMonth(
                new Date(
                  firstDateInMonth.getFullYear(),
                  firstDateInMonth.getMonth() + 1,
                  firstDateInMonth.getDate()
                )
              );
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12px"
                width="12px"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          />
        </Box>
      </Box>
      <Grid
        gridTemplateColumns="repeat(7, 1fr)"
        h="360px"
        w="100%"
        justifyContent="center"
        gridGap="1px"
      >
        <>
          {weekdays.map((weekday) => {
            return (
              <Box
                color="#d6d6d6"
                key={weekday}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {weekday}
              </Box>
            );
          })}
          {_.times(firstDateOffset, (num) => {
            return (
              <Box
                color="#707070"
                key={`offset-${num}`}
                boxShadow="0 0 0 1px #ededed"
              ></Box>
            );
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
                _hover={{
                  bg:
                    date.toDateString() === props.selectedDate.toDateString()
                      ? secondaryPurple
                      : "#d9d7d7",
                }}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                padding="4px"
                cursor="pointer"
                fontSize="larger"
                boxShadow="0 0 0 1px #ededed"
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
