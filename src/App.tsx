import { QueryClient, QueryClientProvider } from "react-query";
import { userContext as UserContext } from "./routes/UserContext";
import ErrorBoundary from "./ErrorBoundar";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <main className="container mx-auto p-8"></main>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
