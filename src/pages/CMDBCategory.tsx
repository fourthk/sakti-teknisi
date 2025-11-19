import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Monitor, Server, Printer, Network as NetworkIcon, Laptop, HardDrive, FileCode, Shield, Globe, Database as DatabaseIcon, Building2, File } from "lucide-react";

interface SubCategoryCardProps {
  icon: React.ElementType;
  count: number;
  label: string;
  iconColor: string;
  onClick: () => void;
}

const SubCategoryCard = ({ icon: Icon, count, label, iconColor, onClick }: SubCategoryCardProps) => {
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
        <Icon size={28} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-3xl font-bold" style={{ color: "#384E66" }}>
          {count}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </button>
  );
};

const CMDBCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Define subcategories for each main category
  const subcategoriesMap: Record<string, Array<{icon: React.ElementType, count: number, label: string, iconColor: string}>> = {
    "Perangkat Keras (Hardware)": [
      { icon: Monitor, count: 15, label: "Komputer dan Perangkat Personal", iconColor: "#3B82F6" },
      { icon: Server, count: 8, label: "Server & Penyimpanan", iconColor: "#8B5CF6" },
      { icon: Printer, count: 7, label: "Perangkat Cetak dan Input", iconColor: "#10B981" },
      { icon: NetworkIcon, count: 12, label: "Perangkat Jaringan", iconColor: "#06B6D4" },
      { icon: HardDrive, count: 5, label: "Perangkat Pendukung", iconColor: "#F59E0B" },
    ],
    "Perangkat Lunak (Software)": [
      { icon: FileCode, count: 5, label: "Sistem Operasi", iconColor: "#3B82F6" },
      { icon: FileCode, count: 7, label: "Aplikasi Perkantoran", iconColor: "#10B981" },
    ],
    "Jaringan & Infrastruktur TI": [
      { icon: NetworkIcon, count: 8, label: "Kabel & Perangkat Fisik", iconColor: "#06B6D4" },
      { icon: Shield, count: 6, label: "Keamanan Jaringan", iconColor: "#EF4444" },
      { icon: Globe, count: 9, label: "Perangkat Komunikasi Data", iconColor: "#8B5CF6" },
      { icon: Server, count: 5, label: "Perangkat Pendukung Infrastruktur", iconColor: "#F59E0B" },
    ],
    "Data & Informasi": [
      { icon: DatabaseIcon, count: 6, label: "Database", iconColor: "#06B6D4" },
      { icon: File, count: 9, label: "Dokumen Digital", iconColor: "#3B82F6" },
    ],
    "Bangunan & Fasilitas": [
      { icon: Building2, count: 12, label: "Gedung & Ruangan", iconColor: "#F59E0B" },
      { icon: Building2, count: 5, label: "Fasilitas Umum", iconColor: "#10B981" },
      { icon: Building2, count: 5, label: "Area Luar", iconColor: "#8B5CF6" },
    ],
    "Peralatan & Kendaraan": [
      { icon: Monitor, count: 8, label: "Furnitur Kantor", iconColor: "#64748B" },
      { icon: Laptop, count: 5, label: "Alat Presentasi & Administrasi", iconColor: "#3B82F6" },
      { icon: NetworkIcon, count: 5, label: "Kendaraan Dinas & Operasional", iconColor: "#EF4444" },
    ],
  };

  const subcategories = subcategoriesMap[category || ""] || [];

  const handleSubCategoryClick = (subLabel: string) => {
    navigate(`/cmdb/${encodeURIComponent(category || "")}/${encodeURIComponent(subLabel)}`);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/cmdb")}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Kembali ke CMDB"
        >
          <ArrowLeft size={24} />
        </button>
        <h1
          className="text-5xl font-bold"
          style={{ color: "#253040" }}
        >
          {category}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.map((subcat) => (
          <SubCategoryCard
            key={subcat.label}
            icon={subcat.icon}
            count={subcat.count}
            label={subcat.label}
            iconColor={subcat.iconColor}
            onClick={() => handleSubCategoryClick(subcat.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default CMDBCategory;
