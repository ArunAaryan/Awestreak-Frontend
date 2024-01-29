import { QueryClient, QueryClientProvider } from "react-query";
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
