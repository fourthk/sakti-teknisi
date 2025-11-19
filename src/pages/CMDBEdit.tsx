import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CMDBEdit = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
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
  });

  const handleSave = () => {
    toast({
      title: "Perubahan Tersimpan",
      description: "Data aset berhasil diperbarui",
    });
    navigate(`/cmdb/${category}`);
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
        Ubah Data Aset
      </h1>

      <Card className="bg-white p-6 border-2 border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="id" className="text-foreground">ID</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="kategori" className="text-foreground">Kategori</Label>
            <Input
              id="kategori"
              value={formData.kategori}
              onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="parentId" className="text-foreground">Parent ID</Label>
            <Input
              id="parentId"
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="assetId" className="text-foreground">Asset ID</Label>
            <Input
              id="assetId"
              value={formData.assetId}
              onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="tipeAset" className="text-foreground">Tipe Aset</Label>
            <Input
              id="tipeAset"
              value={formData.tipeAset}
              onChange={(e) => setFormData({ ...formData, tipeAset: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="hostname" className="text-foreground">Hostname</Label>
            <Input
              id="hostname"
              value={formData.hostname}
              onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="ipAddress" className="text-foreground">IP Address</Label>
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="osName" className="text-foreground">OS Name</Label>
            <Input
              id="osName"
              value={formData.osName}
              onChange={(e) => setFormData({ ...formData, osName: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="osVersion" className="text-foreground">OS Version</Label>
            <Input
              id="osVersion"
              value={formData.osVersion}
              onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="vendor" className="text-foreground">Vendor</Label>
            <Input
              id="vendor"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="lokasi" className="text-foreground">Lokasi</Label>
            <Input
              id="lokasi"
              value={formData.lokasi}
              onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="departemen" className="text-foreground">Departemen</Label>
            <Input
              id="departemen"
              value={formData.departemen}
              onChange={(e) => setFormData({ ...formData, departemen: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="penanggungJawab" className="text-foreground">Penanggung Jawab</Label>
            <Input
              id="penanggungJawab"
              value={formData.penanggungJawab}
              onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-foreground">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-2 border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-2 border-primary/30">
                <SelectItem value="Aktif" className="text-foreground">Aktif</SelectItem>
                <SelectItem value="Maintenance" className="text-foreground">Maintenance</SelectItem>
                <SelectItem value="Nonaktif" className="text-foreground">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tanggalAkuisisi" className="text-foreground">Tanggal Akuisisi</Label>
            <Input
              id="tanggalAkuisisi"
              type="date"
              value={formData.tanggalAkuisisi}
              onChange={(e) => setFormData({ ...formData, tanggalAkuisisi: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
          <div>
            <Label htmlFor="masaGaransi" className="text-foreground">Masa Garansi</Label>
            <Input
              id="masaGaransi"
              type="date"
              value={formData.masaGaransi}
              onChange={(e) => setFormData({ ...formData, masaGaransi: e.target.value })}
              className="border-2 border-primary/30"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Simpan Perubahan
          </Button>
          <Button variant="outline" onClick={() => navigate(`/cmdb/${category}`)} className="border-2 border-primary/30">
            Batal
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CMDBEdit;
