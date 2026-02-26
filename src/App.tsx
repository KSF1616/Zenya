
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import WorkoutPage from "./pages/WorkoutPage";
import CardsPage from "./pages/CardsPage";
import LibraryPage from "./pages/LibraryPage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import LoginPage from "./pages/LoginPage";
import SavedCardsPage from "./pages/SavedCardsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/workout" element={<WorkoutPage />} />
                  <Route path="/cards" element={<CardsPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/collections/:handle" element={<CollectionPage />} />
                  <Route path="/product/:handle" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/saved-cards" element={<SavedCardsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
