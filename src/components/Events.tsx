import { Box, IconButton, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { primaryPurple, secondaryPurple } from "../App";

const rowHeight = "74px";

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
        h={rowHeight}
        p="16px"
        bg="white"
        borderRadius={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
          placeholder="Add new event"
          variant="unstyled"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <IconButton
          size="xs"
          borderRadius="50%"
          backgroundColor={primaryPurple}
          variant="solid"
          _hover={{ bg: secondaryPurple }}
          onClick={() => {
            props.addEvent(inputValue);
            setInputValue("");
          }}
          disabled={inputValue === ""}
          aria-label="Add new event"
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          }
        />
      </Box>
      {props.events
        ? props.events.map((event, index) => {
            return (
              <Box
                h={rowHeight}
                bg="white"
                padding="12px"
                borderRadius={13}
                display="flex"
                alignItems="center"
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
