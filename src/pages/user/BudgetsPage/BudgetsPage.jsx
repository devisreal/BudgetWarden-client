import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, PieChart, ShoppingBag } from "lucide-react";

export default function BudgetsPage() {
  return (
    <main className="sm:px-4 py-6">
      <section className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Budgets
          </h2>
          <p className="mt-1 text-md sm:text-base text-gray-500">
            Manage your monthly spending targets
          </p>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <div className="sm:ml-3"></div>
        </div>
      </section>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <Card>
          <CardContent className="p-6 py-1">
            <div className="flex items-center justify-between">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Banknote className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-500">Total Budget</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">£2,820</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">April 2025</span>
                <span className="text-xs text-gray-500">6 categories</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 py-1">
            <div className="flex items-center justify-between">
              <div className="bg-emerald-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-500">Spent So Far</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">£2,690</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">95% of budget</span>
                <span className="text-xs text-emerald-600">£130 remaining</span>
              </div>
              <Progress value={95} className="h-1.5 mt-2 bg-emerald-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 py-1">
            <div className="flex items-center justify-between">
              <div className="bg-red-100 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Over Budget</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">1</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">category</span>
                <span className="text-xs text-red-600">£50 over</span>
              </div>
              <div className="flex items-center gap-1 mt-2 p-1 bg-red-50 rounded text-xs text-red-700">
                <span>Entertainment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
