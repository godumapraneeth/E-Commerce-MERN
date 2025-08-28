// AdminPage.jsx
import React, { useState } from "react";
import { PlusCircle, ShoppingBasket, BarChart } from "lucide-react";
import CreateProduct from "../components/CreateProduct";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-emerald-400 text-center">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon size={20} className="h-5 w-5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on activeTab */}
        <div className="mt-10 p-6 bg-gray-800 rounded-2xl shadow-lg">
          {activeTab === "create" && <CreateProduct />}
          {activeTab === "products" && <ProductsList />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
