export const initialClaims = [
  {
    id: "CLM-1001",
    employeeName: "Alice Smith",
    date: "2024-03-10",
    amount: 120.00,
    currency: "USD",
    merchant: "The Grand Hotel",
    category: "Lodging",
    purpose: "Client meeting accommodation",
    status: "approved",
    extractedData: {
      date: "2024-03-10",
      total: 120.00,
      currency: "USD",
      merchant: "The Grand Hotel"
    },
    policySnippet: "Lodging limits are set at $150/night for domestic travel.",
    aiReason: "Approved: Expense is within the allowed lodging limit for the region.",
    receiptImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "CLM-1002",
    employeeName: "John Doe",
    date: "2024-03-12",
    amount: 85.50,
    currency: "GBP",
    merchant: "Steakhouse London",
    category: "Meals",
    purpose: "Dinner while traveling",
    status: "rejected",
    extractedData: {
      date: "2024-03-12",
      total: 85.50,
      currency: "GBP",
      merchant: "Steakhouse London"
    },
    policySnippet: "Dinner limit for London is £40.",
    aiReason: "Rejected: Dinner limit for London is £40; claim was for £85.50.",
    receiptImage: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "CLM-1003",
    employeeName: "Sarah Jenkins",
    date: "2024-03-15",
    amount: 45.00,
    currency: "USD",
    merchant: "Uber",
    category: "Transport",
    purpose: "Ride to airport",
    status: "flagged",
    extractedData: {
      date: "2024-03-14",
      total: 45.00,
      currency: "USD",
      merchant: "Uber"
    },
    policySnippet: "Receipt dates must match the claimed expense date.",
    aiReason: "Flagged: The receipt date (2024-03-14) does not match the claimed date (2024-03-15).",
    receiptImage: "https://images.unsplash.com/photo-1621501102148-cc12db6da585?auto=format&fit=crop&w=400&q=80"
  }
];
