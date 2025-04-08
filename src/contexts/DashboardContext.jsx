import { getCategories, getUserBills, getUserSubscriptions } from "@/utils/api";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardContext = createContext();
const today = new Date();

const currencies = [
  { id: "currency-1", value: "GBP", display: "British Pound", symbol: "£" },
  { id: "currency-2", value: "NGN", display: "Nigerian Naira", symbol: "₦" },
  { id: "currency-3", value: "USD", display: "US Dollar", symbol: "$" },
  { id: "currency-4", value: "EUR", display: "Euro", symbol: "€" },
  { id: "currency-5", value: "JPY", display: "Japanese Yen", symbol: "¥" },
  {
    id: "currency-6",
    value: "AUD",
    display: "Australian Dollar",
    symbol: "A$",
  },
  { id: "currency-7", value: "CAD", display: "Canadian Dollar", symbol: "C$" },
  { id: "currency-8", value: "CHF", display: "Swiss Franc", symbol: "CHF" },
  { id: "currency-9", value: "CNY", display: "Chinese Yuan", symbol: "¥" },
  { id: "currency-10", value: "SEK", display: "Swedish Krona", symbol: "kr" },
  {
    id: "currency-11",
    value: "NZD",
    display: "New Zealand Dollar",
    symbol: "NZ$",
  },
  { id: "currency-12", value: "MXN", display: "Mexican Peso", symbol: "MX$" },
  {
    id: "currency-13",
    value: "SGD",
    display: "Singapore Dollar",
    symbol: "S$",
  },
  {
    id: "currency-14",
    value: "HKD",
    display: "Hong Kong Dollar",
    symbol: "HK$",
  },
  { id: "currency-15", value: "NOK", display: "Norwegian Krone", symbol: "kr" },
  { id: "currency-16", value: "KRW", display: "South Korean Won", symbol: "₩" },
  { id: "currency-17", value: "INR", display: "Indian Rupee", symbol: "₹" },
  { id: "currency-18", value: "BRL", display: "Brazilian Real", symbol: "R$" },
  {
    id: "currency-19",
    value: "ZAR",
    display: "South African Rand",
    symbol: "R",
  },
  { id: "currency-20", value: "RUB", display: "Russian Ruble", symbol: "₽" },
  { id: "currency-21", value: "AED", display: "UAE Dirham", symbol: "د.إ" },
];

const billingCycles = [
  { id: 1, value: "weekly", displayName: "Weekly" },
  { id: 2, value: "biweekly", displayName: "Bi-Weekly (Every 2 Weeks)" },
  { id: 3, value: "monthly", displayName: "Monthly" },
  { id: 4, value: "quarterly", displayName: "Quarterly (Every 3 Months)" },
  { id: 5, value: "semiannual", displayName: "Semi-Annual (Every 6 Months)" },
  { id: 6, value: "annual", displayName: "Annual (Yearly)" },
  { id: 7, value: "bimonthly", displayName: "Bi-Monthly (Twice a Month)" },
];

function DashboardProvider(props) {
  const [categories, setCategories] = useState(false);

  const [bills, setBills] = useState(null);
  const [upcomingBills, setUpcomingBills] = useState(null);
  const [isBillsLoading, setIsBillsLoading] = useState(true);

  const [subscriptions, setSubscriptions] = useState(null);
  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(true);

  const getAllCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const getBills = async () => {
    try {
      const response = await getUserBills();
      setIsBillsLoading(false);
      setBills(response);

      const upcomingBills = response.filter((bill) => {
        if (bill.is_paid) return false;

        const dueDate = new Date(bill.due_date);
        const sevenDaysFromNow = new Date(
          today.getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        return dueDate >= today && dueDate <= sevenDaysFromNow;
      });

      setUpcomingBills(upcomingBills);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const response = await getUserSubscriptions();
      setIsSubscriptionsLoading(false);
      setSubscriptions(response);

      // const upcomingBills = response.filter((bill) => {
      //   if (bill.is_paid) return false;

      //   const dueDate = new Date(bill.due_date);
      //   const sevenDaysFromNow = new Date(
      //     today.getTime() + 7 * 24 * 60 * 60 * 1000,
      //   );

      //   return dueDate >= today && dueDate <= sevenDaysFromNow;
      // });

      // setSubscriptions(response);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getBills();
    getSubscriptions();
  }, []);

  const findTotalBills = () => {
    let sum = 0.0;
    if (isBillsLoading || !bills) return 0;
    bills.forEach((bill) => {
      sum += Number(bill.amount);
    });

    if (sum === 0) {
      return "0.00";
    }
    return sum;
  };

  const findTotalSubscriptions = () => {
    let sum = 0.0;
    if (isSubscriptionsLoading || !subscriptions) return 0;
    subscriptions.forEach((sub) => {
      sum += Number(sub.cost);
    });

    if (sum === 0) {
      return "0.00";
    }
    return sum;
  };

  function populateBills() {
    if (isBillsLoading || !bills || !categories) return [];

    const enriched = bills.map((bill) => {
      const category = categories.find((cat) => cat.id == bill.category_id);
      return {
        ...bill,
        category_name: category ? category.name : "Uncategorized",
      };
    });
    return enriched;
  }

  function populateSubscriptions() {
    if (isSubscriptionsLoading || !subscriptions || !categories) return [];

    const enriched = subscriptions.map((sub) => {
      const category = categories.find((cat) => cat.id == sub.category_id);
      return {
        ...sub,
        category_name: category ? category.name : "Uncategorized",
      };
    });
    const sorted = enriched.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }

  const getUserCurrency = (isoCode) => {
    return (
      currencies.find((currency) => currency.value === isoCode) || {
        symbol: "$",
        display: "USD",
      }
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        categories,
        setCategories,
        userBills: {
          totalBills: findTotalBills(),
          bills: populateBills(),
          upcomingBills,
          getBills,
          isBillsLoading,
        },
        userSubscriptions: {
          totalSubscriptions: findTotalSubscriptions(),
          subscriptions: populateSubscriptions(),
          getSubscriptions,
          isSubscriptionsLoading,
        },
        currencies,
        getUserCurrency,
        billingCycles,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
