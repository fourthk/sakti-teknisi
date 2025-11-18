import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const ImplementationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const implementation = {
    id: id || "IMP-2024-001",
    requestId: "CR-2024-005",
    jenisPerubahan: "Maintenance Rutin",
    asetTerdampak: "Database Server",
    teknisi: "Tim C (Ahmad, Budi)",
    status: "Completed",
    tanggalImplementasi: "2024-01-11",
    durasi: "6 jam",
    catatan: "Maintenance selesai tanpa gangguan, sistem berjalan normal. Backup database berhasil dibuat sebelum maintenance. Semua service restart dengan lancar.",
    foto: ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"],
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/implementation-results")}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Detail Implementasi
      </h1>

      <Card className="bg-white p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Implementasi ID</p>
            <p className="font-semibold text-lg">{implementation.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Request ID</p>
            <p className="font-semibold text-lg">{implementation.requestId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Jenis Perubahan</p>
            <p className="font-semibold">{implementation.jenisPerubahan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Aset Terdampak</p>
            <p className="font-semibold">{implementation.asetTerdampak}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Teknisi Bertugas</p>
            <p className="font-semibold">{implementation.teknisi}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className="bg-green-100 text-green-800 border-0 text-base px-3 py-1">
              {implementation.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tanggal Implementasi</p>
            <p className="font-semibold">{implementation.tanggalImplementasi}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Durasi Implementasi</p>
            <p className="font-semibold">{implementation.durasi}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Catatan</p>
          <p className="font-semibold leading-relaxed">{implementation.catatan}</p>
        </div>

        {implementation.foto.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Foto Dokumentasi</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {implementation.foto.map((foto, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-muted-foreground"
                >
                  Foto {index + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImplementationDetail;
