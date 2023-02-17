import { Flex, Stack } from "@chakra-ui/react";
import { Page } from 'lib/layout/Page'
import { useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

import { SwapActions } from "./Swap/SwapActions";

const Home = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [wallet, setWallet] = useState({});
  // const [app, setApp] = useState({});

  const onStart = async function () {
    try {
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  return (
    <Page>
      <Flex maxWidth={{ base: "auto", "2xl": "1464px" }} mx="auto" px={16}>
        <Stack flex={1} spacing={4} justifyContent="center" alignItems="center">
          <SwapActions />
        </Stack>
      </Flex>
    </Page>
  );
};

export default Home;
