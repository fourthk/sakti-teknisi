import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ChangeRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authority, setAuthority] = useState<string>("");
  const [approvalData, setApprovalData] = useState<any>(null);

  // Mock data - in real app, fetch based on id
  const request = {
    id: id || "CR-2024-001",
    jenisPerubahan: "Update Server",
    kategoriTerdampak: "Hardware",
    asetTerdampak: "Server Aplikasi",
    status: "Reviewed",
    tanggalDiterima: "2024-01-15",
    inspection: {
      id: "INS-2024-001",
      tanggal: "2024-01-16",
      hasil: "Perlu dilakukan update sistem operasi dan patch keamanan",
      skorDampak: 7,
      skorKemungkinan: 6,
      skorExposure: 8,
      skorResiko: 42,
      estimasiBiaya: "Rp 5.000.000",
      estimasiPengerjaan: "4 jam",
      foto: true,
    },
    approval: null,
    schedule: null,
  };

  const handleAuthorityChange = (value: string) => {
    setAuthority(value);
    
    // Automatically approve and create schedule
    const scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + 3); // 3 days from now
    
    setApprovalData({
      status: "Disetujui",
      catatan: "Persetujuan otomatis berdasarkan tingkat wewenang " + value,
      jadwal: {
        tanggal: scheduleDate.toLocaleDateString('id-ID', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        waktu: "09:00 - 12:00",
        teknisi: "Tim Teknisi A"
      }
    });
    
    toast.success("Persetujuan berhasil dan jadwal implementasi telah dibuat");
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/change-request")}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Detail Laporan
      </h1>

      {/* Basic Info */}
      <Card className="bg-white p-6 mb-6 border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
          Informasi Laporan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">ID Request</p>
            <p className="font-semibold text-foreground">{request.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Jenis Perubahan</p>
            <p className="font-semibold text-foreground">{request.jenisPerubahan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Kategori Terdampak</p>
            <p className="font-semibold text-foreground">{request.kategoriTerdampak}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Aset Terdampak</p>
            <p className="font-semibold text-foreground">{request.asetTerdampak}</p>
          </div>
        </div>
      </Card>

      {/* Inspection Results */}
      <Card className="bg-white p-6 mb-6 border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
          Hasil Inspeksi
        </h2>
        {request.inspection ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">ID Inspeksi</p>
                <p className="font-semibold text-foreground">{request.inspection.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tanggal Inspeksi</p>
                <p className="font-semibold text-foreground">{request.inspection.tanggal}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hasil Inspeksi</p>
              <p className="font-semibold text-foreground">{request.inspection.hasil}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Skor Dampak</p>
                <p className="text-xl font-bold text-foreground">{request.inspection.skorDampak}</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Skor Kemungkinan</p>
                <p className="text-xl font-bold text-foreground">{request.inspection.skorKemungkinan}</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Skor Exposure</p>
                <p className="text-xl font-bold text-foreground">{request.inspection.skorExposure}</p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                <p className="text-sm text-red-700 font-medium mb-1">Skor Resiko (Exposure)</p>
                <p className="text-3xl font-bold text-red-600">{request.inspection.skorResiko}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimasi Biaya</p>
                <p className="font-semibold text-foreground">{request.inspection.estimasiBiaya}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimasi Pengerjaan</p>
                <p className="font-semibold text-foreground">{request.inspection.estimasiPengerjaan}</p>
              </div>
            </div>
            {request.inspection.foto && (
              <Button variant="outline" className="border-2 border-primary/30">Lihat Foto</Button>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground italic text-center py-4">Menunggu Hasil Inspeksi</p>
        )}
      </Card>

      {/* Authority Selection */}
      {request.inspection && (
        <Card className="bg-white p-6 mb-6 border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
            Kuasa Wewenang
          </h2>
          <div className="w-full sm:w-[300px]">
            <Select value={authority} onValueChange={handleAuthorityChange} disabled={!!authority}>
              <SelectTrigger className="w-full border-2 border-primary/30 bg-background">
                <SelectValue placeholder="Pilih wewenang" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-2 border-primary/30 z-50">
                <SelectItem value="Minor" className="text-foreground">Minor</SelectItem>
                <SelectItem value="Standar" className="text-foreground">Standar</SelectItem>
                <SelectItem value="Mayor" className="text-foreground">Mayor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Approval Status */}
      <Card className="bg-white p-6 border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
          Status Persetujuan & Jadwal Implementasi
        </h2>
        {approvalData ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Hasil Persetujuan</p>
              <Badge className="bg-green-100 text-green-800 border-0 text-sm px-3 py-1">
                {approvalData.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Catatan Persetujuan</p>
              <p className="font-semibold text-foreground">{approvalData.catatan}</p>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#253040" }}>
                Jadwal Implementasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tanggal</p>
                  <p className="font-semibold text-foreground">{approvalData.jadwal.tanggal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Waktu</p>
                  <p className="font-semibold text-foreground">{approvalData.jadwal.waktu}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teknisi</p>
                  <p className="font-semibold text-foreground">{approvalData.jadwal.teknisi}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground italic text-center py-4">Menunggu Persetujuan</p>
        )}
      </Card>

    </div>
  );
};

export default ChangeRequestDetail;
