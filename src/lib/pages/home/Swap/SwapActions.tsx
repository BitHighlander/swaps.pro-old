import { SettingsIcon, ChevronDownIcon, ArrowDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tooltip,
  ModalFooter,
} from "@chakra-ui/react";

import etherLogo from "lib/assets/png/etherLogo.png";

const placeholderData = [
  {
    _id: "63a517575213610013d97186",
    name: "bitcoin",
    type: "coin",
    tags: [
      "bitcoin",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "bitcoin",
    symbol: "BTC",
    decimals: 8,
    image: "https://pioneers.dev/coins/bitcoin.png",
    facts: ['{payload: "{"name":"Bitcoin","website":"https://bit…}'],
    description:
      "Bitcoin is a cryptocurrency and worldwide payment system. It is the first decentralized digital currency, as the system works without a central bank or single administrator.",
    website: "https://bitcoin.org",
    explorer: "https://blockchain.info",
    price: 21882,
    rank: 1,
  },
  {
    _id: "63a3d1655213610013d97126",
    name: "tethertoken",
    type: "AVALANCHE",
    tags: [
      "avalanchec",
      "isAsset",
      "isToken",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
      "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    ],
    blockchain: "avalanchec",
    symbol: "USDt",
    decimals: 6,
    image: "https://pioneers.dev/coins/tethertoken.png",
    facts: ['{payload: "{"contract":"0x9702230A8Ea53601f5cD2dc00…}'],
    description:
      "Tether gives you the joint benefits of open blockchain technology and traditional currency by converting your cash into a stable digital currency equivalent.",
    website: "https://tether.to/",
    explorer:
      "https://snowtrace.io/address/0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    id: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    price: 0.995658,
    rank: 3,
  },
  {
    _id: "63a3d1625213610013d97116",
    name: "binance coin (portal)",
    type: "AVALANCHE",
    tags: [
      "avalanchec",
      "isAsset",
      "isToken",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
      "0x442F7f22b1EE2c842bEAFf52880d4573E9201158",
    ],
    blockchain: "avalanchec",
    symbol: "BNB",
    decimals: 18,
    image: "https://pioneers.dev/coins/binance-coin-(portal).png",
    facts: ['{payload: "{"contract":"0x442F7f22b1EE2c842bEAFf528…}'],
    description: "Cross Chain Portal Bridged Token",
    website: "https://www.binance.com/",
    explorer:
      "https://snowtrace.io/address/0x442F7f22b1EE2c842bEAFf52880d4573E9201158",
    id: "0x442F7f22b1EE2c842bEAFf52880d4573E9201158",
    price: 281,
    rank: 5,
  },
  {
    _id: "63a3d1695213610013d97139",
    name: "sol (portal)",
    type: "AVALANCHE",
    tags: [
      "avalanchec",
      "isAsset",
      "isToken",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
      "0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
    ],
    blockchain: "avalanchec",
    symbol: "SOL",
    decimals: 9,
    image: "https://pioneers.dev/coins/sol-(portal).png",
    facts: ['{payload: "{"contract":"0xFE6B19286885a4F7F55AdAD09…}'],
    description: "Cross Chain Portal Bridged Token",
    website: "https://solana.com/",
    explorer:
      "https://snowtrace.io/address/0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
    id: "0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
    price: 35.78,
    rank: 9,
  },
  {
    _id: "63a517595213610013d97195",
    name: "dogecoin",
    type: "coin",
    tags: [
      "doge",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "doge",
    symbol: "DOGE",
    decimals: 8,
    image: "https://pioneers.dev/coins/dogecoin.png",
    facts: ['{payload: "{"name":"Dogecoin","website":"http://dog…}'],
    description:
      "Dogecoin is an open source peer-to-peer digital currency, favored by Shiba Inus worldwide. Introduced as a joke currency on 6 December 2013, Dogecoin quickly developed its own online community.",
    website: "http://dogecoin.com",
    explorer: "https://blockchair.com/dogecoin",
    price: 0.069887,
    rank: 10,
  },
  {
    _id: "63a517565213610013d97181",
    name: "avalanche c-chain",
    type: "coin",
    tags: [
      "avalanchec",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "avalanchec",
    symbol: "AVAX",
    decimals: 18,
    image: "https://pioneers.dev/coins/avalanche-c-chain.png",
    facts: ['{payload: "{"name":"Avalanche C-Chain","website":"h…}'],
    description:
      "Avalanche is an open-source platform for launching highly decentralized applications, new financial primitives, and new interoperable blockchains. This is the C-Chain, the default smart contract blockchain on Avalanche that enables the creation of any Ethereum-compatible smart contracts.",
    website: "http://avax.network",
    explorer: "https://explorer.avax.network",
    price: 21.68,
    rank: 15,
  },
  {
    _id: "63a517585213610013d9718e",
    name: "ethereum classic",
    type: "coin",
    tags: [
      "classic",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "classic",
    symbol: "ETC",
    decimals: 18,
    image: "https://pioneers.dev/coins/ethereum-classic.png",
    facts: ['{payload: "{"name":"Ethereum Classic","website":"ht…}'],
    description:
      "Ethereum Classic is an open-source, public, blockchain-based distributed computing platform featuring smart contract functionality.It is a continuation of the original Ethereum blockchain.",
    website: "https://ethereumclassic.org/",
    explorer: "https://blockscout.com/etc/mainnet/",
    price: 36.69,
    rank: 19,
  },
  {
    _id: "63a517595213610013d9718f",
    name: "cosmos",
    type: "coin",
    tags: [
      "cosmos",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "cosmos",
    symbol: "ATOM",
    decimals: 6,
    image: "https://pioneers.dev/coins/cosmos.png",
    facts: ['{payload: "{"name":"Cosmos","website":"https://cosm…}'],
    description:
      "Cosmos is a secure & scalable blockchain ecosystem where thousands of dApps interoperate to create the foundation for a new token economy.",
    website: "https://cosmos.network/",
    explorer: "https://www.mintscan.io/",
    price: 10.35,
    rank: 28,
  },
  {
    _id: "63a517575213610013d97187",
    name: "bitcoin cash",
    type: "coin",
    tags: [
      "bitcoincash",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "bitcoincash",
    symbol: "BCH",
    decimals: 8,
    image: "https://pioneers.dev/coins/bitcoin-cash.png",
    facts: ['{payload: "{"name":"Bitcoin Cash","website":"https:…}'],
    description:
      "Bitcoin ABC is an electronic cash platform that allows peer-to-peer online cash payments. It is a fork (a copy in a way) of Bitcoin (BTC).",
    website: "https://bitcoincash.org/",
    explorer: "https://blockchair.com/bitcoin-cash",
    price: 120.93,
    rank: 32,
  },
  {
    _id: "63a3d1685213610013d97135",
    name: "frax",
    type: "AVALANCHE",
    tags: [
      "avalanchec",
      "isAsset",
      "isToken",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
      "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    ],
    blockchain: "avalanchec",
    symbol: "FRAX",
    decimals: 18,
    image: "https://pioneers.dev/coins/frax.png",
    facts: ['{payload: "{"contract":"0xD24C2Ad096400B6FBcd2ad8B2…}'],
    description:
      "Frax is a fractional-algorithmic stablecoin protocol. It aims to provide a highly scalable, decentralized, algorithmic money in place of fixed-supply assets like BTC. Additionally, FXS is the value accrual and governance token of the entire Frax ecosystem.",
    website: "https://frax.finance/",
    explorer:
      "https://snowtrace.io/address/0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    id: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    price: 0.960858,
    rank: 43,
  },
  {
    _id: "63a5175a5213610013d9719a",
    name: "eos",
    type: "coin",
    tags: [
      "eos",
      "isAsset",
      "isNative",
      "KeepKeySupport",
      "DappSupport",
      "WalletConnectSupport",
    ],
    blockchain: "eos",
    symbol: "EOS",
    decimals: 4,
    image: "https://pioneers.dev/coins/eos.png",
    facts: ['{payload: "{"name":"EOS","website":"https://eos.io"…}'],
    description:
      "EOS is a cryptocurrency token and blockchain that operates as a smart contract platform for the deployment of decentralized applications and decentralized autonomous corporations.",
    website: "https://eos.io",
    explorer: "https://bloks.io/",
    price: 1.31,
    rank: 45,
  },
];

export const SwapActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSelectInput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectInput: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectOutput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectOutput: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSubmitSelect = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitSelect: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectPrimary = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitPrimary: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <Box
      w="30.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem"
    >
      <Modal isOpen={isOpen} onClose={onClose} size="80px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coin Select</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" gap="3" flexWrap="wrap" w="100%">
              {placeholderData.map((coin) => (
                <Tooltip
                  placement="top"
                  label={coin.blockchain}
                  bg="gray.900"
                  borderRadius={4}
                  textTransform="capitalize"
                >
                  <Button
                    variant="outline"
                    py={7}
                    minW="75px"
                    maxW="120px"
                    flex="1"
                  >
                    <Image
                      src={coin.image}
                      alt="keepkey api"
                      objectFit="contain"
                      height="40px"
                      width="40px"
                      objectPosition="center"
                    />
                  </Button>
                </Tooltip>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onSubmitSelect} variant="green">
              Select Coin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        bg="white"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0"
      >
        <Text color="black" fontWeight="500">
          Swap
        </Text>
        <SettingsIcon
          fontSize="1.25rem"
          cursor="pointer"
          _hover={{ color: "rgb(128,128,128)" }}
        />
      </Flex>

      <Box p="0.5rem" bg="white" borderRadius="0 0 1.37rem 1.37rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          p="1rem 1rem 1.7rem"
          borderRadius="1.25rem"
          border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
        >
          <Box>
            <Button
              bg="white"
              borderRadius="1.12rem"
              boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
              fontWeight="500"
              mr="0.5rem"
              rightIcon={
                <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
              }
              onClick={onSelectInput}
            >
              <Image
                boxSize="1.5rem"
                src={etherLogo}
                alt="Ether Logo"
                mr="0.5rem"
              />
              ETH
            </Button>
          </Box>
          <Box>
            <Input
              placeholder="0.0"
              fontWeight="500"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number"
            />
          </Box>
        </Flex>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          pos="relative"
          p="1rem 1rem 1.7rem"
          borderRadius="1.25rem"
          mt="0.25rem"
          border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
        >
          <Box>
            <Button
              bg="rgb(232, 0, 111)"
              color="white"
              p="0rem 1rem"
              borderRadius="1.12rem"
              boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
              _hover={{ bg: "rgb(207, 0, 99)" }}
              rightIcon={
                <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
              }
              onClick={onSelectOutput}
            >
              Select a token
            </Button>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="white"
            p="0.18rem"
            borderRadius="0.75rem"
            pos="relative"
            top="-2.37rem"
            left="2.5rem"
          >
            <ArrowDownIcon
              bg="rgb(247, 248, 250)"
              color="rgb(128,128,128)"
              h="1.5rem"
              width="1.62rem"
              borderRadius="0.75rem"
            />
          </Flex>
          <Box>
            <Input
              placeholder="0.0"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number"
            />
          </Box>
        </Flex>

        <Box mt="0.5rem">
          <Button
            color="rgb(213, 0, 102)"
            bg="rgb(253, 234, 241)"
            width="100%"
            p="1.62rem"
            borderRadius="1.25rem"
            _hover={{ bg: "rgb(251, 211, 225)" }}
            onClick={onSelectPrimary}
          >
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
