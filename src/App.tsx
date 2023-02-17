import { ChakraProvider } from "@chakra-ui/react";
import { PioneerService } from "lib/context/pioneer";
import { BrowserRouter as Router } from "react-router-dom";

import Context from "lib/context";
import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { theme } from "lib/styles/theme";

const user = new PioneerService();
user.init();

const App = () => (
  <ChakraProvider theme={theme}>
    <Context.Provider value={user}>
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </Context.Provider>
  </ChakraProvider>
);

export default App;
