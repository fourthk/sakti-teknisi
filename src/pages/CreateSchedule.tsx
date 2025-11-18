import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CreateSchedule = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState("");
  const [formData, setFormData] = useState({
    tanggalMulai: "",
    estimasiWaktu: "",
    lokasi: "",
    catatan: "",
  });

  // Mock approved requests
  const approvedRequests = [
    {
      id: "CR-2024-003",
      jenisPerubahan: "Penggantian Hardware",
      kategoriTerdampak: "Network",
      asetTerdampak: "Switch Network",
      skorResiko: 42,
      estimasiBiaya: "Rp 8.000.000",
      estimasiPengerjaan: "6 jam",
    },
    {
      id: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      kategoriTerdampak: "Network",
      asetTerdampak: "Router Core",
      skorResiko: 56,
      estimasiBiaya: "Rp 3.000.000",
      estimasiPengerjaan: "8 jam",
    },
  ];

  const selectedRequestData = approvedRequests.find((r) => r.id === selectedRequest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !formData.tanggalMulai || !formData.estimasiWaktu || !formData.lokasi) {
      toast.error("Lengkapi semua field yang wajib diisi");
      return;
    }
    toast.success("Jadwal berhasil dibuat");
    navigate("/implementation-schedule");
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Buat Jadwal
      </h1>

      <Card className="bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Request */}
          <div>
            <Label>Pilih Request ID *</Label>
            <Select value={selectedRequest} onValueChange={setSelectedRequest}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih request yang sudah disetujui" />
              </SelectTrigger>
              <SelectContent>
                {approvedRequests.map((req) => (
                  <SelectItem key={req.id} value={req.id}>
                    {req.id} - {req.jenisPerubahan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Request Details (Read-only) */}
          {selectedRequestData && (
            <Card className="bg-gray-50 p-4">
              <h3 className="font-semibold mb-3">Detail Request</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Jenis Perubahan</p>
                  <p className="font-semibold">{selectedRequestData.jenisPerubahan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kategori Terdampak</p>
                  <p className="font-semibold">{selectedRequestData.kategoriTerdampak}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Aset Terdampak</p>
                  <p className="font-semibold">{selectedRequestData.asetTerdampak}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Skor Resiko</p>
                  <p className="font-semibold text-red-600">{selectedRequestData.skorResiko}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimasi Biaya</p>
                  <p className="font-semibold">{selectedRequestData.estimasiBiaya}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimasi Pengerjaan</p>
                  <p className="font-semibold">{selectedRequestData.estimasiPengerjaan}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Schedule Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tanggalMulai">Tanggal Mulai *</Label>
              <Input
                id="tanggalMulai"
                type="date"
                value={formData.tanggalMulai}
                onChange={(e) =>
                  setFormData({ ...formData, tanggalMulai: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="estimasiWaktu">Estimasi Waktu *</Label>
              <Input
                id="estimasiWaktu"
                type="time"
                value={formData.estimasiWaktu}
                onChange={(e) =>
                  setFormData({ ...formData, estimasiWaktu: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="lokasi">Lokasi *</Label>
            <Input
              id="lokasi"
              value={formData.lokasi}
              onChange={(e) =>
                setFormData({ ...formData, lokasi: e.target.value })
              }
              placeholder="Masukkan lokasi implementasi"
            />
          </div>

          <div>
            <Label htmlFor="catatan">Catatan</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) =>
                setFormData({ ...formData, catatan: e.target.value })
              }
              placeholder="Catatan tambahan (opsional)"
              rows={4}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/change-request")}
            >
              Batal
            </Button>
            <Button type="submit" style={{ backgroundColor: "#384E66" }}>
              Simpan Jadwal
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateSchedule;
