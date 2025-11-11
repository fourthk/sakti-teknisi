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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileDown, Eye } from "lucide-react";

const WorkHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLokasi, setFilterLokasi] = useState("all");
  const [filterJenis, setFilterJenis] = useState("all");
  const [filterRisiko, setFilterRisiko] = useState("all");

  const history = [
    {
      id: "CR-2024-005",
      namaAset: "Database Server",
      tanggalSelesai: "2024-01-11",
      levelRisiko: "Low",
      status: "Completed",
      lokasi: "Data Center",
      jenisPerubahan: "Maintenance Rutin",
      teknisi: "Team C",
    },
    {
      id: "CR-2023-189",
      namaAset: "Firewall UTM",
      tanggalSelesai: "2024-01-08",
      levelRisiko: "High",
      status: "Completed",
      lokasi: "Ruang Server Diskominfo",
      jenisPerubahan: "Update Firmware",
      teknisi: "Team A",
    },
    {
      id: "CR-2023-175",
      namaAset: "Web Server",
      tanggalSelesai: "2024-01-05",
      levelRisiko: "Medium",
      status: "Completed",
      lokasi: "Data Center",
      jenisPerubahan: "Patching Security",
      teknisi: "Team B",
    },
    {
      id: "CR-2023-163",
      namaAset: "Switch Core",
      tanggalSelesai: "2023-12-28",
      levelRisiko: "High",
      status: "Completed",
      lokasi: "Gedung Utama",
      jenisPerubahan: "Penggantian Hardware",
      teknisi: "Team A",
    },
    {
      id: "CR-2023-150",
      namaAset: "Email Server",
      tanggalSelesai: "2023-12-20",
      levelRisiko: "Low",
      status: "Completed",
      lokasi: "Data Center",
      jenisPerubahan: "Konfigurasi",
      teknisi: "Team C",
    },
  ];

  const getRiskBadge = (risk: string) => {
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

  const getStatusBadge = (status: string) => {
    return (
      <Badge className="bg-gray-100 text-gray-800 border-0">
        {status}
      </Badge>
    );
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesLokasi = filterLokasi === "all" || item.lokasi === filterLokasi;
    const matchesJenis = filterJenis === "all" || item.jenisPerubahan === filterJenis;
    const matchesRisiko = filterRisiko === "all" || item.levelRisiko === filterRisiko;
    
    return matchesSearch && matchesLokasi && matchesJenis && matchesRisiko;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Riwayat Pekerjaan
        </h1>
        <Button variant="outline">
          <FileDown className="mr-2" size={18} />
          Export Report
        </Button>
      </div>

      <Card className="bg-white p-6">
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan ID tiket, nama aset, atau teknisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filterLokasi} onValueChange={setFilterLokasi}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                <SelectItem value="Data Center">Data Center</SelectItem>
                <SelectItem value="Ruang Server Diskominfo">Ruang Server Diskominfo</SelectItem>
                <SelectItem value="Gedung Utama">Gedung Utama</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterJenis} onValueChange={setFilterJenis}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Jenis Perubahan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="Maintenance Rutin">Maintenance Rutin</SelectItem>
                <SelectItem value="Update Firmware">Update Firmware</SelectItem>
                <SelectItem value="Patching Security">Patching Security</SelectItem>
                <SelectItem value="Penggantian Hardware">Penggantian Hardware</SelectItem>
                <SelectItem value="Konfigurasi">Konfigurasi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRisiko} onValueChange={setFilterRisiko}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Level Risiko" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setFilterLokasi("all");
                setFilterJenis("all");
                setFilterRisiko("all");
                setSearchTerm("");
              }}
            >
              Reset Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Tiket</TableHead>
                <TableHead>Nama Aset</TableHead>
                <TableHead>Jenis Perubahan</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Teknisi</TableHead>
                <TableHead>Tanggal Selesai</TableHead>
                <TableHead>Level Risiko</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.namaAset}</TableCell>
                  <TableCell>{item.jenisPerubahan}</TableCell>
                  <TableCell>{item.lokasi}</TableCell>
                  <TableCell>{item.teknisi}</TableCell>
                  <TableCell>{item.tanggalSelesai}</TableCell>
                  <TableCell>{getRiskBadge(item.levelRisiko)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} className="mr-1" />
                      Lihat Laporan
                    </Button>
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

export default WorkHistory;
