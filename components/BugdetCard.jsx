"use client";

export default function BudgetCard({ budget }) {
  if (!budget?.total) return null;

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Estimated Budget</h2>

      <div className="space-y-2">
        <p>Hotel: ₹{budget.hotel}</p>

        <p>Food: ₹{budget.food}</p>

        <p>Transport: ₹{budget.transport}</p>

        <p>Activities: ₹{budget.activities}</p>

        <hr />

        <p className="font-bold">Total: ₹{budget.total}</p>
      </div>
    </div>
  );
}
