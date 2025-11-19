import { useNavigate } from "react-router-dom";
import {
  HardDrive,
  FileCode,
  Network,
  Database,
  Building,
  Truck,
} from "lucide-react";

interface CategoryCardProps {
  icon: React.ElementType;
  count: number;
  label: string;
  iconColor: string;
  onClick: () => void;
}

const CategoryCard = ({ icon: Icon, count, label, iconColor, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-6 flex items-center gap-4 shadow-sm transition-all hover:shadow-md hover:scale-105 w-full text-left"
      style={{
        backgroundColor: "#FDFDFD",
        border: "1px solid #384E66",
      }}
    >
      <div
        className="p-3 rounded-lg"
        style={{ backgroundColor: iconColor + "20" }}
      >
        <Icon size={32} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-4xl font-bold" style={{ color: "#384E66" }}>
          {count}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </button>
  );
};

const CMDB = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: HardDrive, count: 35, label: "Perangkat Keras (Hardware)", iconColor: "#3B82F6" },
    { icon: FileCode, count: 12, label: "Perangkat Lunak (Software)", iconColor: "#10B981" },
    { icon: Network, count: 28, label: "Jaringan & Infrastruktur TI", iconColor: "#8B5CF6" },
    { icon: Database, count: 15, label: "Data & Informasi", iconColor: "#06B6D4" },
    { icon: Building, count: 22, label: "Bangunan & Fasilitas", iconColor: "#F59E0B" },
    { icon: Truck, count: 18, label: "Peralatan & Kendaraan", iconColor: "#EF4444" },
  ];

  const handleCategoryClick = (label: string) => {
    navigate(`/cmdb/${encodeURIComponent(label)}`);
  };

  return (
    <div>
      <h1
        className="text-5xl font-bold mb-8"
        style={{ color: "#253040" }}
      >
        CMDB
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            icon={category.icon}
            count={category.count}
            label={category.label}
            iconColor={category.iconColor}
            onClick={() => handleCategoryClick(category.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default CMDB;