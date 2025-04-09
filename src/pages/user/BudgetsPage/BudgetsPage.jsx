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
    </main>
  );
}
