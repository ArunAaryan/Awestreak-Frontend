import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./ErrorBoundary";
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
