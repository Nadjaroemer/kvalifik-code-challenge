import { Box, Center } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Events from "./components/Events";

function App() {
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  return (
    <Box bg="#F4F4F4" w="100%" p="10">
      <Center>
        <Box>
          <Calendar
            selectDate={(date) => {
              setSelectedDate(date);
            }}
          />
          <Events
            events={events[selectedDate]}
            addEvent={(event) => {
              const updatedEvents = { ...events };
              const previousEvents = updatedEvents[selectedDate];
              if (previousEvents) {
                updatedEvents[selectedDate] = [...previousEvents, event];
              } else {
                updatedEvents[selectedDate] = [event];
              }
              setEvents(updatedEvents);
            }}
          />
        </Box>
      </Center>
    </Box>
  );
}

export default App;
