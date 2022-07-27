import { Box } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  param?: string;
  events: string[];
};

const Events: FC<Props> = (props) => {
  return (
    <Box
      w="500px"
      borderRadius="13px"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {props.events.map((event, index) => {
        return (
          <Box
            bg="white"
            padding={4}
            borderRadius={4}
            key={`${index}-${event}`}
          >
            {event}
          </Box>
        );
      })}
    </Box>
  );
};

export default Events;
