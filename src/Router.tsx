import { HashRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleTheme: () => void;
  isDark: boolean;
}
function Router({ toggleTheme, isDark }: IRouterProps) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Coins toggleTheme={toggleTheme} />
        </Route>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
