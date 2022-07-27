import { Box, Center } from "@chakra-ui/react";
import Calendar from "./components/Calendar";
import Events from "./components/Events";

function App() {
  return (
    <Box bg="#F4F4F4" w="100%" p="10">
      <Center>
        <Box>
          <Calendar startDay={3} />
          <Events events={["foo", "baa"]} />
        </Box>
      </Center>
    </Box>
  );
}

export default App;
