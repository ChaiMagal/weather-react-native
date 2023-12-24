import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import Main from "./Main";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  );
}