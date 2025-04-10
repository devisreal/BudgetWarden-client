import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardContext } from "@/contexts/DashboardContext";
import { useContext } from "react";

export default function SpendingByCategory() {
  const { isSpendByLoading, categorySpendBy } = useContext(DashboardContext);

  if (isSpendByLoading) {
    return <p>Loading...</p>;
  }

  const totalSpending = categorySpendBy.grandTotal;

  return (
    <Card className="w-full lg:w-4/6 p-4">
      <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Spending by category
      </h3>

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-gray-900">
            £{totalSpending.toLocaleString()}
          </h2>
        </div>

        <div className="space-y-4">
          {categorySpendBy.categories.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{item.name}</span>
                <span className="text-gray-800 font-medium">
                  £{item.amount}
                </span>
              </div>
              <Progress
                value={item.percentage}
                className="h-2 bg-emerald-100"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
