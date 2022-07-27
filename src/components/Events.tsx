import { Box } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  param?: string;
  events?: string[];
  addEvent: (event: string) => void;
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
      <Box bg="white" borderRadius={4}>
        <button
          onClick={() => {
            props.addEvent("event");
          }}
        >
          Add event
        </button>
      </Box>
      {props.events
        ? props.events.map((event, index) => {
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
          })
        : undefined}
    </Box>
  );
};

export default Events;
