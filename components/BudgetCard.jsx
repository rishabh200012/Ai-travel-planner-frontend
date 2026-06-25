"use client";

export default function BudgetCard({ budget }) {
  if (!budget?.total) return null;

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[3px] text-blue-600 font-semibold">
            Budget Overview
          </p>

          <h2 className="mt-2 text-3xl font-bold">Estimated Budget</h2>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 text-3xl text-white shadow-lg">
          💰
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-slate-50 p-5">
          <p className="text-sm text-gray-500">Hotel</p>

          <h3 className="mt-3 text-3xl font-bold text-slate-800">
            ₹{budget.hotel}
          </h3>
        </div>

        <div className="rounded-2xl border bg-orange-50 p-5">
          <p className="text-sm text-gray-500">Food</p>

          <h3 className="mt-3 text-3xl font-bold text-orange-600">
            ₹{budget.food}
          </h3>
        </div>

        <div className="rounded-2xl border bg-sky-50 p-5">
          <p className="text-sm text-gray-500">Transport</p>

          <h3 className="mt-3 text-3xl font-bold text-sky-600">
            ₹{budget.transport}
          </h3>
        </div>

        <div className="rounded-2xl border bg-violet-50 p-5">
          <p className="text-sm text-gray-500">Activities</p>

          <h3 className="mt-3 text-3xl font-bold text-violet-600">
            ₹{budget.activities}
          </h3>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-linear-to-r from-blue-700 via-indigo-600 to-violet-700 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Estimated Total Cost</p>

            <h2 className="mt-2 text-4xl font-bold">₹{budget.total}</h2>
          </div>

          <div className="text-6xl">💳</div>
        </div>
      </div>
    </section>
  );
}
