import { Box, Button, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { primaryPurple } from "../App";

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
        <Input
          placeholder="Add new event"
          variant="unstyled"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          size="xs"
          borderRadius="50%"
          backgroundColor={primaryPurple}
          variant="solid"
          onClick={() => {
            props.addEvent(inputValue);
            setInputValue("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Button>
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
