import { Box, Grid } from "@chakra-ui/react";
import type { FC } from "react";
import _ from "lodash";

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  param?: string;
  startDay: number;
  numberOfDaysInMonth: number;
};

const Calendar: FC<Props> = (props) => {
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
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
        <>
          {weekdays.map((weekday) => {
            return <Box key={weekday}>{weekday}</Box>;
          })}
          {_.times(props.numberOfDaysInMonth, (n) => {
            const date = n + 1;
            return <Box key={date}>{date}</Box>;
          })}
        </>
      </Box>
    </Box>
  );
};

export default Calendar;
