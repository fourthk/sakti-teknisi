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
import { Search, MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChangeRequest = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const requests = [
    {
      id: "CR-2024-001",
      jenisPerubahan: "Update Server",
      dinas: "Dinas Pendidikan",
      asetTerdampak: "Server Aplikasi",
      status: "Submitted",
      resiko: "",
      jadwal: "",
      tanggalDiterima: "2024-01-15",
    },
    {
      id: "CR-2024-002",
      jenisPerubahan: "Instalasi Software",
      dinas: "Dinas Kesehatan",
      asetTerdampak: "PC Admin",
      status: "Inspected",
      resiko: "Low",
      jadwal: "",
      tanggalDiterima: "2024-01-14",
    },
    {
      id: "CR-2024-003",
      jenisPerubahan: "Penggantian Hardware",
      dinas: "Diskominfo",
      asetTerdampak: "Switch Network",
      status: "Approved",
      resiko: "Medium",
      jadwal: "2024-01-20",
      tanggalDiterima: "2024-01-13",
    },
    {
      id: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      dinas: "Dinas Perhubungan",
      asetTerdampak: "Router Core",
      status: "Scheduled",
      resiko: "High",
      jadwal: "2024-01-18",
      tanggalDiterima: "2024-01-12",
    },
    {
      id: "CR-2024-005",
      jenisPerubahan: "Maintenance Rutin",
      dinas: "Dinas Keuangan",
      asetTerdampak: "Database Server",
      status: "Implemented",
      resiko: "Low",
      jadwal: "2024-01-10",
      tanggalDiterima: "2024-01-08",
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

  const filteredRequests = requests.filter((req) =>
    Object.values(req).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                <TableHead>Dinas</TableHead>
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
                  <TableCell>{request.dinas}</TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-muted/80 transition-all duration-200 hover:scale-105"
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end"
                        className="w-48 bg-white shadow-lg border border-border/50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                      >
                        <DropdownMenuItem className="hover:bg-muted/80 cursor-pointer transition-colors duration-150 focus:bg-muted/80">
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted/80 cursor-pointer transition-colors duration-150 focus:bg-muted/80">
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted/80 cursor-pointer transition-colors duration-150 focus:bg-muted/80">
                          Inspeksi
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
    </div>
  );
};

export default ChangeRequest;
