import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const ScheduleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const schedule = {
    id: id || "SCH-2024-001",
    requestId: "CR-2024-003",
    jenisPerubahan: "Penggantian Hardware",
    asetTerdampak: "Switch Network",
    statusImplementasi: "Waiting",
    resiko: "Medium",
    jadwal: "2024-01-20 09:00",
    lokasi: "Ruang Server Diskominfo",
    teknisi: null,
    inspection: {
      hasil: "Perlu dilakukan penggantian switch yang sudah berumur 8 tahun",
      skorDampak: 7,
      skorKemungkinan: 6,
      skorExposure: 8,
      skorResiko: 42,
      estimasiBiaya: "Rp 8.000.000",
      estimasiPengerjaan: "6 jam",
      foto: true,
    },
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/implementation-schedule")}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Detail Jadwal
      </h1>

      {/* Basic Info */}
      <Card className="bg-white p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Informasi Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">ID Request</p>
            <p className="font-semibold">{schedule.requestId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Jenis Perubahan</p>
            <p className="font-semibold">{schedule.jenisPerubahan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Aset Terdampak</p>
            <p className="font-semibold">{schedule.asetTerdampak}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status Implementasi</p>
            <Badge className="bg-blue-100 text-blue-800 border-0">
              {schedule.statusImplementasi}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Resiko</p>
            <Badge className="bg-yellow-100 text-yellow-800 border-0">
              {schedule.resiko}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Jadwal Implementasi</p>
            <p className="font-semibold">{schedule.jadwal}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lokasi</p>
            <p className="font-semibold">{schedule.lokasi}</p>
          </div>
        </div>
      </Card>

      {/* Inspection Results */}
      <Card className="bg-white p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Hasil Inspeksi
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Hasil Inspeksi</p>
            <p className="font-semibold">{schedule.inspection.hasil}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Skor Dampak</p>
              <p className="font-semibold">{schedule.inspection.skorDampak}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skor Kemungkinan</p>
              <p className="font-semibold">{schedule.inspection.skorKemungkinan}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skor Exposure</p>
              <p className="font-semibold">{schedule.inspection.skorExposure}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Skor Resiko</p>
              <p className="text-3xl font-bold text-red-600">{schedule.inspection.skorResiko}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Estimasi Biaya</p>
              <p className="font-semibold">{schedule.inspection.estimasiBiaya}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimasi Pengerjaan</p>
              <p className="font-semibold">{schedule.inspection.estimasiPengerjaan}</p>
            </div>
          </div>
          {schedule.inspection.foto && (
            <Button variant="outline">Lihat Foto</Button>
          )}
        </div>
      </Card>

      {/* Technician Assignment */}
      <Card className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Teknisi yang Bertugas
        </h2>
        {schedule.teknisi ? (
          <div>
            <p className="font-semibold text-lg">{schedule.teknisi}</p>
            <Badge className="bg-green-100 text-green-800 border-0 mt-2">Accept</Badge>
          </div>
        ) : (
          <p className="text-muted-foreground italic">Teknisi belum mengambil tugas</p>
        )}
      </Card>
    </div>
  );
};

export default ScheduleDetail;
