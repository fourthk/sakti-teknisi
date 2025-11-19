import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Server, Network, Monitor, HardDrive, Wifi, Database } from "lucide-react";

const CMDB = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Server", icon: Server, count: 12, color: "#3B82F6" },
    { name: "Network", icon: Network, count: 24, color: "#10B981" },
    { name: "Workstation", icon: Monitor, count: 156, color: "#F59E0B" },
    { name: "Storage", icon: HardDrive, count: 8, color: "#8B5CF6" },
    { name: "Wireless", icon: Wifi, count: 32, color: "#EC4899" },
    { name: "Database", icon: Database, count: 6, color: "#14B8A6" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          CMDB
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white p-6"
              onClick={() => navigate(`/cmdb/${category.name.toLowerCase()}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={48} style={{ color: category.color }} />
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: category.color }}>
                    {category.count}
                  </p>
                  <p className="text-sm text-muted-foreground">Assets</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold" style={{ color: "#253040" }}>
                {category.name}
              </h3>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CMDB;
