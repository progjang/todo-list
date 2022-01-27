import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleTheme: () => void;
  isDark: boolean;
}
function Router({ toggleTheme, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Coins toggleTheme={toggleTheme} />
        </Route>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
