import { Box, Center } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Events from "./components/Events";

export const primaryPurple = "#A170DB";

function App() {
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box bg="#F4F4F4" w="100%" p="10">
      <Center>
        <Box>
          <Calendar
            selectedDate={selectedDate}
            selectDate={(date) => {
              setSelectedDate(date);
            }}
          />
          <Events
            selectedDate={selectedDate}
            events={events[selectedDate.toDateString()]}
            addEvent={(event) => {
              const updatedEvents = { ...events };
              const previousEvents = updatedEvents[selectedDate.toDateString()];
              if (previousEvents) {
                updatedEvents[selectedDate.toDateString()] = [
                  ...previousEvents,
                  event,
                ];
              } else {
                updatedEvents[selectedDate.toDateString()] = [event];
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
