//components
import { SnackbarProvider } from "notistack";
import { FormContainer } from "./components/FormContainer";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <FormContainer />
    </SnackbarProvider>
  );
}

export default App;
