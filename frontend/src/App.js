import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: "bg-card border-border text-foreground",
                description: "text-muted-foreground"
              }
            }}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
