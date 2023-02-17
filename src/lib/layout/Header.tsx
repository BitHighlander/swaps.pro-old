import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// import type { ReactNode } from "react";
// import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import KEEPKEY_ICON from "lib/assets/png/keepkey.png";
import PIONEER_ICON from "lib/assets/png/pioneer.png";
import Context from "lib/context";

import ThemeToggle from "./ThemeToggle";

// const Pioneer = new PioneerService();

const Header = () => {
  const user = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [keepkeyConnected, setKeepKeyConnected] = useState(false);
  // const [keepkeyError, setKeepKeyError] = useState(false);
  // const [features, setKeepKeyFeatures] = useState({});

  const navigate = useNavigate();
  const handleToHome = () => navigate("/");
  const handleToDashboard = () => navigate("/dashboard");

  const onStart = async function () {
    try {
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // Pioneer.init();
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // setPioneer(Pioneer);
      // eslint-disable-next-line no-console
      console.log("onStart", user);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setKeepKeyError("Bridge is offline!");
    }
  };

  // onStart()
  useEffect(() => {
    onStart();
  }, [user]); // once on startup

  const { context, username, totalValueUsd } = user;

  return (
    <Flex
      as="header"
      width="full"
      alignSelf="flex-start"
      gridGap={2}
      alignItems="center"
    >
      <IconButton
        size="md"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Open Menu"
        display={{ md: "none" }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack spacing={8}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={handleToHome}>
          <Box>Swaps.pro</Box>
        </Link>
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {/* <Link onClick={handleToDashboard}> */}
          {/*  <Text color="gray.500" fontSize="sm"> */}
          {/*    Dashboard */}
          {/*  </Text> */}
          {/* </Link> */}
        </HStack>
      </HStack>
      {/* <ThemeToggle /> */}
      <Spacer />
      <Menu>
        <MenuButton
          as={Button}
          rounded="full"
          variant="link"
          cursor="pointer"
          minW={0}
        >
          <Avatar size="lg" src={PIONEER_ICON}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem>{username}</MenuItem>
          <MenuItem>context: {context || "not Paired"}</MenuItem>
          <MenuDivider />
          <MenuItem>Total Vaule(usd): {totalValueUsd}</MenuItem>
          <MenuItem>Link 3</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
