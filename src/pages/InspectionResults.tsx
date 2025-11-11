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
import { Search, MoreVertical, FileText } from "lucide-react";

const InspectionResults = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inspections = [
    {
      id: "INS-2024-001",
      requestId: "CR-2024-002",
      jenisPerubahan: "Instalasi Software",
      dinas: "Dinas Kesehatan",
      hasilPemeriksaan: "Disetujui dengan catatan",
      skorDampak: 3,
      skorKemungkinan: 2,
      skorExposure: 6,
      skorRisiko: 11,
      levelRisiko: "Low",
      estimasiBiaya: "Rp 2.500.000",
      estimasiWaktu: "2 jam",
      fotoInspeksi: "3 foto",
      tanggalInspeksi: "2024-01-14 14:30",
    },
    {
      id: "INS-2024-002",
      requestId: "CR-2024-003",
      jenisPerubahan: "Penggantian Hardware",
      dinas: "Diskominfo",
      hasilPemeriksaan: "Perlu persetujuan Kabid",
      skorDampak: 5,
      skorKemungkinan: 3,
      skorExposure: 8,
      skorRisiko: 23,
      levelRisiko: "Medium",
      estimasiBiaya: "Rp 15.000.000",
      estimasiWaktu: "4 jam",
      fotoInspeksi: "5 foto",
      tanggalInspeksi: "2024-01-13 10:15",
    },
    {
      id: "INS-2024-003",
      requestId: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      dinas: "Dinas Perhubungan",
      hasilPemeriksaan: "Perlu eskalasi Diskominfo",
      skorDampak: 8,
      skorKemungkinan: 6,
      skorExposure: 10,
      skorRisiko: 48,
      levelRisiko: "High",
      estimasiBiaya: "Rp 25.000.000",
      estimasiWaktu: "8 jam",
      fotoInspeksi: "7 foto",
      tanggalInspeksi: "2024-01-12 09:00",
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

  const filteredInspections = inspections.filter((insp) =>
    Object.values(insp).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Hasil Inspeksi
      </h1>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan ID inspeksi, request ID, atau dinas..."
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
                <TableHead>Inspection ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Jenis Perubahan</TableHead>
                <TableHead>Dinas</TableHead>
                <TableHead>Hasil Pemeriksaan</TableHead>
                <TableHead className="text-center">Skor Risiko</TableHead>
                <TableHead>Level Risiko</TableHead>
                <TableHead>Estimasi Biaya</TableHead>
                <TableHead>Estimasi Waktu</TableHead>
                <TableHead>Foto</TableHead>
                <TableHead>Tanggal Inspeksi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.requestId}</TableCell>
                  <TableCell>{inspection.jenisPerubahan}</TableCell>
                  <TableCell>{inspection.dinas}</TableCell>
                  <TableCell>{inspection.hasilPemeriksaan}</TableCell>
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-lg">{inspection.skorRisiko}</div>
                      <div className="text-xs text-muted-foreground">
                        D:{inspection.skorDampak} K:{inspection.skorKemungkinan} E:{inspection.skorExposure}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskBadge(inspection.levelRisiko)}</TableCell>
                  <TableCell>{inspection.estimasiBiaya}</TableCell>
                  <TableCell>{inspection.estimasiWaktu}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText size={16} className="mr-1" />
                      {inspection.fotoInspeksi}
                    </Button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{inspection.tanggalInspeksi}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                        <DropdownMenuItem>Cetak PDF</DropdownMenuItem>
                        <DropdownMenuItem>Kirim untuk Persetujuan</DropdownMenuItem>
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

export default InspectionResults;
