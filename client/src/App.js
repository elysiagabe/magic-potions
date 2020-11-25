import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// Components
import OrderForm from './pages/OrderForm';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  const [orderInfo, setOrderInfo] = useState({})
  const [orderId, setOrderId] = useState("")

  return (
    <Router>
      <Box bg="gray.50" h="100vh">
      <Switch>
        <Route path="/success">
          <OrderConfirmation orderInfo={orderInfo} orderId={orderId} />
        </Route>
        <Route path="/">
          <OrderForm setOrderInfo={setOrderInfo} setOrderId={setOrderId} />
        </Route>
      </Switch>
    </Box>
    </Router>
  );
}

export default App;
