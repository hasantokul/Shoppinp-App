import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user.context";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";


const App = () => {

  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={ currentUser ? <Home /> : <Authentication/>}/>
        <Route path="shop/*" element={ currentUser ? <Shop /> : <Authentication/>}/>
        <Route path="checkout" element={ currentUser ? <Checkout/> : <Authentication/>} />
      </Route>
    </Routes>
  );
};

export default App;
