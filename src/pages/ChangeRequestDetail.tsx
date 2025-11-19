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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ChangeRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authority, setAuthority] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  const handleSubmit = () => {
    if (!authority) {
      toast.error("Pilih kuasa wewenang terlebih dahulu");
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmSubmit = () => {
    setSubmitted(true);
    setShowConfirmDialog(false);
    toast.success("Pengajuan berhasil dikirim");
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
      <Card className="bg-white p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Informasi Laporan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">ID Request</p>
            <p className="font-semibold">{request.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tanggal Diterima</p>
            <p className="font-semibold">{request.tanggalDiterima}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Jenis Perubahan</p>
            <p className="font-semibold">{request.jenisPerubahan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Kategori Terdampak</p>
            <p className="font-semibold">{request.kategoriTerdampak}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Aset Terdampak</p>
            <p className="font-semibold">{request.asetTerdampak}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className="bg-yellow-100 text-yellow-800 border-0">
              {request.status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Inspection Results */}
      <Card className="bg-white p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Hasil Inspeksi
        </h2>
        {request.inspection ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">ID Inspeksi</p>
                <p className="font-semibold">{request.inspection.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Inspeksi</p>
                <p className="font-semibold">{request.inspection.tanggal}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hasil Inspeksi</p>
              <p className="font-semibold">{request.inspection.hasil}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Skor Dampak</p>
                <p className="font-semibold">{request.inspection.skorDampak}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skor Kemungkinan</p>
                <p className="font-semibold">{request.inspection.skorKemungkinan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skor Exposure</p>
                <p className="font-semibold">{request.inspection.skorExposure}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Skor Resiko</p>
                <p className="text-3xl font-bold text-red-600">{request.inspection.skorResiko}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimasi Biaya</p>
                <p className="font-semibold">{request.inspection.estimasiBiaya}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimasi Pengerjaan</p>
                <p className="font-semibold">{request.inspection.estimasiPengerjaan}</p>
              </div>
            </div>
            {request.inspection.foto && (
              <Button variant="outline">Lihat Foto</Button>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground italic">Menunggu Hasil Inspeksi</p>
        )}
      </Card>

      {/* Authority Selection */}
      {request.inspection && (
        <Card className="bg-white p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
            Kuasa Wewenang
          </h2>
          <div className="flex items-center gap-4">
            <Select value={authority} onValueChange={setAuthority} disabled={submitted}>
              <SelectTrigger className="w-[200px] border-2 border-primary/30">
                <SelectValue placeholder="Pilih wewenang" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-2 border-primary/30">
                <SelectItem value="Minor" className="text-foreground">Minor</SelectItem>
                <SelectItem value="Standar" className="text-foreground">Standar</SelectItem>
                <SelectItem value="Mayor" className="text-foreground">Mayor</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSubmit}
              disabled={!authority || submitted}
              className="bg-primary hover:bg-primary/90"
            >
              Kirim Pengajuan
            </Button>
          </div>
        </Card>
      )}

      {/* Approval Status */}
      <Card className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#253040" }}>
          Status Persetujuan dan Jadwal Implementasi
        </h2>
        {request.approval ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Hasil Persetujuan</p>
              <Badge className="bg-green-100 text-green-800 border-0">
                Disetujui
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Catatan Persetujuan</p>
              <p className="font-semibold">Approved dengan monitoring ketat</p>
            </div>
            {request.schedule && (
              <div>
                <p className="text-sm text-muted-foreground">Jadwal Implementasi</p>
                <p className="font-semibold">2024-01-20, 09:00 - Tim Teknisi A</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground italic">Menunggu Persetujuan</p>
        )}
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-popover border-2 border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">Konfirmasi Pengajuan</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Tindakan ini akan mengirim pengajuan ke pihak yang berwenang. Yakin ingin melakukan perubahan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="border-2 border-primary/30">
              Batal
            </Button>
            <Button onClick={confirmSubmit} className="bg-primary hover:bg-primary/90">
              Ya
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeRequestDetail;
