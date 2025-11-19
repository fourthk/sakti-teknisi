import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ArrowLeft, MoreVertical } from "lucide-react";
import { toast } from "sonner";

const CMDBCategory = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // Mock assets data
  const assets = [
    {
      id: "AST-SRV-001",
      nama: "Server Database",
      tipe: "Physical Server",
      lokasi: "Data Center Lt. 3",
      owner: "Diskominfo",
      status: "Operational",
      konfigurasi: "Dell PowerEdge R740, 64GB RAM",
      hubungan: "AST-NET-001, AST-NET-002",
      lastAudit: "2024-01-10",
      catatan: "Regular maintenance scheduled",
    },
    {
      id: "AST-SRV-002",
      nama: "Application Server",
      tipe: "Virtual Server",
      lokasi: "Data Center Lt. 3",
      owner: "Dinas Pendidikan",
      status: "Operational",
      konfigurasi: "VMware VM, 32GB RAM",
      hubungan: "AST-SRV-001",
      lastAudit: "2024-01-08",
      catatan: "-",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Operational: "bg-green-100 text-green-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Offline: "bg-red-100 text-red-800",
    };
    return <Badge className={`${variants[status]} border-0`}>{status}</Badge>;
  };

  const filteredAssets = assets.filter((asset) =>
    Object.values(asset).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUpdate = () => {
    setShowUpdateDialog(true);
  };

  const confirmUpdate = () => {
    setShowUpdateDialog(false);
    toast.success("Data CMDB berhasil diperbarui");
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/cmdb")}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          {category?.toUpperCase()} Assets
        </h1>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#384E66" }}>
          Update
        </Button>
      </div>

      <Card className="bg-white border-2 border-primary/20">
        <div className="p-4 border-b-2 border-primary/20">
          <div className="relative border-2 border-primary/30 rounded-md overflow-hidden">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari aset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Nama Asset</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Konfigurasi</TableHead>
                <TableHead>Hubungan</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>{asset.nama}</TableCell>
                  <TableCell>{asset.tipe}</TableCell>
                  <TableCell>{asset.lokasi}</TableCell>
                  <TableCell>{asset.owner}</TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell className="max-w-xs truncate">{asset.konfigurasi}</TableCell>
                  <TableCell className="max-w-xs truncate">{asset.hubungan}</TableCell>
                  <TableCell>{asset.lastAudit}</TableCell>
                  <TableCell>{asset.catatan}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-2 border-primary/30">
                        <DropdownMenuItem 
                          onClick={() => navigate(`/cmdb/${category}/${asset.id}/detail`)}
                          className="text-foreground cursor-pointer"
                        >
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => navigate(`/cmdb/${category}/${asset.id}/edit`)}
                          className="text-foreground cursor-pointer"
                        >
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => navigate(`/cmdb/${category}/${asset.id}/history`)}
                          className="text-foreground cursor-pointer"
                        >
                          Riwayat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Update Confirmation Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="bg-popover border-2 border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">Konfirmasi Update</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Tindakan ini akan memperbarui data seluruh pihak berwenang. Yakin ingin melakukan perubahan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)} className="border-2 border-primary/30">
              Tidak
            </Button>
            <Button onClick={confirmUpdate} className="bg-primary hover:bg-primary/90">
              Ya
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMDBCategory;
