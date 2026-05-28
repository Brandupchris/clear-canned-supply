import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, LogIn, UserPlus, LogOut, Package, Loader2 } from "lucide-react";
import { storefrontApiRequest } from "@/lib/shopify";

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email firstName lastName }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id email firstName lastName numberOfOrders createdAt
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface OrderInfo {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: Array<{ title: string; quantity: number }>;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  numberOfOrders: string;
  createdAt: string;
  orders: OrderInfo[];
}

const Account = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("shopify_customer_token")
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchCustomerInfo = async (token: string) => {
    try {
      const data = await storefrontApiRequest(CUSTOMER_QUERY, {
        customerAccessToken: token,
      });
      const c = data?.data?.customer;
      if (c) {
        setCustomer({
          email: c.email,
          firstName: c.firstName,
          lastName: c.lastName,
          numberOfOrders: c.numberOfOrders,
          createdAt: c.createdAt,
          orders: (c.orders?.edges || []).map((e: any) => ({
            ...e.node,
            lineItems: (e.node.lineItems?.edges || []).map((li: any) => li.node),
          })),
        });
      }
    } catch {
      handleLogout();
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCustomerInfo(accessToken);
    }
  }, [accessToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
        input: { email, password },
      });
      const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors || [];
      if (errors.length > 0) { toast.error(errors[0].message); return; }
      const token = data?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
      if (token) {
        localStorage.setItem("shopify_customer_token", token);
        setAccessToken(token);
        toast.success("Logged in successfully!");
        setEmail(""); setPassword("");
      }
    } catch { toast.error("Login failed. Please try again."); }
    finally { setLoading(false); }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, {
        input: { email, password, firstName, lastName },
      });
      const errors = data?.data?.customerCreate?.customerUserErrors || [];
      if (errors.length > 0) { toast.error(errors[0].message); return; }
      toast.success("Account created! Logging you in...");
      const loginData = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
        input: { email, password },
      });
      const token = loginData?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
      if (token) {
        localStorage.setItem("shopify_customer_token", token);
        setAccessToken(token);
      }
      setEmail(""); setPassword(""); setFirstName(""); setLastName("");
    } catch { toast.error("Signup failed. Please try again."); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("shopify_customer_token");
    setAccessToken(null);
    setCustomer(null);
    toast.success("Logged out.");
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          {customer && accessToken ? (
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="border border-border rounded-lg p-8 bg-card space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      {customer.firstName} {customer.lastName}
                    </h1>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Orders</span>
                    <span className="text-foreground font-bold">{customer.numberOfOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="text-foreground font-bold">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button onClick={handleLogout} variant="outline" className="w-full gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>

              {/* Order History */}
              <div className="border border-border rounded-lg p-8 bg-card">
                <h2 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Order History
                </h2>
                {customer.orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {customer.orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">{order.name}</span>
                          <span className="text-sm tabular-nums font-bold">
                            ${parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>{new Date(order.processedAt).toLocaleDateString()}</span>
                          <span>{formatStatus(order.financialStatus)}</span>
                          <span>{formatStatus(order.fulfillmentStatus)}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {order.lineItems.map((li, i) => (
                            <span key={i}>
                              {li.title} ×{li.quantity}
                              {i < order.lineItems.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto border border-border rounded-lg p-8 bg-card">
              <div className="text-center mb-8">
                <h1 className="type-display-sm text-2xl text-foreground">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "login" ? "Sign in to your account" : "Join us and start shopping"}
                </p>
              </div>

              <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
                {mode === "signup" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={5} placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</>
                  ) : mode === "login" ? (
                    <><LogIn className="w-4 h-4" /> Sign In</>
                  ) : (
                    <><UserPlus className="w-4 h-4" /> Create Account</>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
