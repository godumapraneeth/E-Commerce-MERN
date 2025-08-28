import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    // 🔄 Auto-refresh every 10s
    const interval = setInterval(fetchAnalytics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-700 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{analytics.totalOrders}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded shadow">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl">₹{analytics.totalRevenue}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mb-4">🛒 Recent Orders</h2>
      <table className="w-full border mb-10">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Products</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {analytics.recentOrders.map(order => (
            <tr key={order._id} className="border">
              <td className="p-2 border">
                {order.user?.name} ({order.user?.email})
              </td>
              <td className="p-2 border">
                {order.products.map((p, i) => (
                  <div key={i}>
                    {p.product?.name} × {p.quantity}
                  </div>
                ))}
              </td>
              <td className="p-2 border">₹{order.totalAmount}</td>
              <td className="p-2 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Category Breakdown */}
      <h2 className="text-xl font-semibold mb-4">📂 Category Breakdown</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Total Sales</th>
            <th className="p-2 border">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {analytics.categoryStats.map((cat, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{cat._id || "Uncategorized"}</td>
              <td className="p-2 border">{cat.totalSales}</td>
              <td className="p-2 border">₹{cat.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
