import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const CMDBDetail = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();

  // Mock data
  const asset = {
    id: id || "HW001",
    kategori: "Perangkat Keras",
    parentId: "AST-HW-001",
    assetId: "AST-HW-001",
    tipeAset: "Laptop",
    hostname: "LT-IT-001",
    ipAddress: "192.168.1.50",
    osName: "Windows",
    osVersion: "11 Pro",
    vendor: "Dell",
    lokasi: "Ruang IT Lantai 2",
    departemen: "Divisi TI",
    penanggungJawab: "Ahmad Rizki",
    status: "Aktif",
    tanggalAkuisisi: "2023-06-15",
    masaGaransi: "2026-06-15",
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Aktif: "bg-green-100 text-green-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Nonaktif: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge className={`${variants[status]} border-0`}>
        {status}
      </Badge>
    );
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/cmdb/${category}`)}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Detail Aset
      </h1>

      <Card className="bg-white p-6 border-2 border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">ID</p>
            <p className="font-semibold text-foreground">{asset.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Kategori</p>
            <p className="font-semibold text-foreground">{asset.kategori}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Parent ID</p>
            <p className="font-semibold text-foreground">{asset.parentId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Asset ID</p>
            <p className="font-semibold text-foreground">{asset.assetId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Tipe Aset</p>
            <p className="font-semibold text-foreground">{asset.tipeAset}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Hostname</p>
            <p className="font-semibold text-foreground">{asset.hostname}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">IP Address</p>
            <p className="font-semibold text-foreground">{asset.ipAddress}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">OS Name</p>
            <p className="font-semibold text-foreground">{asset.osName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">OS Version</p>
            <p className="font-semibold text-foreground">{asset.osVersion}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Vendor</p>
            <p className="font-semibold text-foreground">{asset.vendor}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Lokasi</p>
            <p className="font-semibold text-foreground">{asset.lokasi}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Departemen</p>
            <p className="font-semibold text-foreground">{asset.departemen}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Penanggung Jawab</p>
            <p className="font-semibold text-foreground">{asset.penanggungJawab}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            {getStatusBadge(asset.status)}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Tanggal Akuisisi</p>
            <p className="font-semibold text-foreground">{asset.tanggalAkuisisi}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Masa Garansi</p>
            <p className="font-semibold text-foreground">{asset.masaGaransi}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CMDBDetail;
