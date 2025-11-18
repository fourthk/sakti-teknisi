import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ChangeRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const requests = [
    {
      id: "CR-2024-001",
      jenisPerubahan: "Update Server",
      kategoriTerdampak: "Hardware",
      asetTerdampak: "Server Aplikasi",
      status: "Submitted",
      resiko: "",
      jadwal: "",
      tanggalDiterima: "2024-01-15",
    },
    {
      id: "CR-2024-002",
      jenisPerubahan: "Instalasi Software",
      kategoriTerdampak: "Software",
      asetTerdampak: "PC Admin",
      status: "Reviewed",
      resiko: "Low",
      jadwal: "",
      tanggalDiterima: "2024-01-14",
    },
    {
      id: "CR-2024-003",
      jenisPerubahan: "Penggantian Hardware",
      kategoriTerdampak: "Network",
      asetTerdampak: "Switch Network",
      status: "Approved",
      resiko: "Medium",
      jadwal: "2024-01-20",
      tanggalDiterima: "2024-01-13",
    },
    {
      id: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      kategoriTerdampak: "Network",
      asetTerdampak: "Router Core",
      status: "Scheduled",
      resiko: "High",
      jadwal: "2024-01-18",
      tanggalDiterima: "2024-01-12",
    },
    {
      id: "CR-2024-005",
      jenisPerubahan: "Maintenance Rutin",
      kategoriTerdampak: "Hardware",
      asetTerdampak: "Database Server",
      status: "Implementing",
      resiko: "Low",
      jadwal: "2024-01-10",
      tanggalDiterima: "2024-01-08",
    },
    {
      id: "CR-2024-006",
      jenisPerubahan: "Update Firmware",
      kategoriTerdampak: "Network",
      asetTerdampak: "Firewall",
      status: "Completed",
      resiko: "Medium",
      jadwal: "2024-01-09",
      tanggalDiterima: "2024-01-07",
    },
    {
      id: "CR-2024-007",
      jenisPerubahan: "Instalasi Hardware",
      kategoriTerdampak: "Hardware",
      asetTerdampak: "UPS Backup",
      status: "Failed",
      resiko: "Low",
      jadwal: "2024-01-08",
      tanggalDiterima: "2024-01-06",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      Submitted: { color: "bg-blue-100 text-blue-800", label: "Submitted" },
      Inspected: { color: "bg-yellow-100 text-yellow-800", label: "Inspected" },
      Approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      Scheduled: { color: "bg-purple-100 text-purple-800", label: "Scheduled" },
      Implemented: { color: "bg-gray-100 text-gray-800", label: "Implemented" },
    };
    const variant = variants[status] || variants.Submitted;
    return (
      <Badge className={`${variant.color} border-0`}>
        {variant.label}
      </Badge>
    );
  };

  const getRiskBadge = (risk: string) => {
    if (!risk) return <span className="text-sm text-muted-foreground">-</span>;
    const variants: Record<string, string> = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`${variants[risk]} border-0`}>
        {risk}
      </Badge>
    );
  };

  const statusFilter = searchParams.get("status");
  
  let filteredRequests = requests.filter((req) =>
    Object.values(req).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (statusFilter) {
    filteredRequests = filteredRequests.filter((req) => req.status === statusFilter);
  }

  const handleStatusClick = (requestId: string) => {
    setSelectedRequest(requestId);
    setNewStatus("");
    setShowStatusDialog(true);
  };

  const handleStatusChange = () => {
    if (!newStatus) {
      toast.error("Pilih status terlebih dahulu");
      return;
    }
    setShowStatusDialog(false);
    setShowConfirmDialog(true);
  };

  const confirmStatusChange = () => {
    setShowConfirmDialog(false);
    toast.success("Status berhasil diubah");
    setSelectedRequest(null);
    setNewStatus("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Daftar Laporan
        </h1>
        <Button style={{ backgroundColor: "#384E66" }}>
          <Plus className="mr-2" size={18} />
          Buat Laporan Baru
        </Button>
      </div>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan ID, jenis perubahan, dinas, atau aset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Jenis Perubahan</TableHead>
                <TableHead>Kategori Terdampak</TableHead>
                <TableHead>Aset Terdampak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resiko</TableHead>
                <TableHead>Jadwal Implementasi</TableHead>
                <TableHead>Tanggal Diterima</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.jenisPerubahan}</TableCell>
                  <TableCell>{request.kategoriTerdampak}</TableCell>
                  <TableCell>{request.asetTerdampak}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{getRiskBadge(request.resiko)}</TableCell>
                  <TableCell>
                    {request.jadwal || <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell>{request.tanggalDiterima}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/change-request/${request.id}`)}>
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusClick(request.id)}>
                          Ubah Status
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

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Status</DialogTitle>
            <DialogDescription>
              Pilih status baru untuk request {selectedRequest}
            </DialogDescription>
          </DialogHeader>
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reviewed">Reviewed</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Implementing">Implementing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleStatusChange} style={{ backgroundColor: "#384E66" }}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan</DialogTitle>
            <DialogDescription>
              Tindakan ini akan mengubah status. Yakin ingin melakukan perubahan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Batal
            </Button>
            <Button onClick={confirmStatusChange} style={{ backgroundColor: "#384E66" }}>
              Ya
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeRequest;
