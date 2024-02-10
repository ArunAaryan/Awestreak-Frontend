import { QueryClient, QueryClientProvider } from "react-query";
import { userContext as UserContext } from "./routes/UserContext";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="container mx-auto p-8"></main>
      </QueryClientProvider>
    </>
  );
}

export default App;
