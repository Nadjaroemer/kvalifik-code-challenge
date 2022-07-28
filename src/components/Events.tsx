import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";

type Props = {
  param?: string;
  selectedDate: Date;
  events?: string[];
  addEvent: (event: string) => void;
};

const Events: FC<Props> = (props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Box
      w="500px"
      borderRadius="13px"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <h3>{`${props.selectedDate.toLocaleString("default", {
        month: "long",
      })} ${props.selectedDate.getDate()}`}</h3>
      <Box
        bg="white"
        borderRadius={4}
        display="flex"
        justifyContent="space-between"
      >
        <input
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          onClick={() => {
            props.addEvent(inputValue);
            setInputValue("");
          }}
        >
          +
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
