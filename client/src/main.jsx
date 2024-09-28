import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";  // Import PersistGate
import { store, persistor } from "./store/store.js";  // Ensure persistor is imported as well
import { Toaster } from "./components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* PersistGate delays rendering until the persisted state is rehydrated */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
