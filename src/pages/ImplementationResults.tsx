import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const ImplementationResults = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const results = [
    {
      id: "IMP-2024-001",
      requestId: "CR-2024-005",
      jenisPerubahan: "Maintenance Rutin",
      asetTerdampak: "Database Server",
      teknisi: "Tim C (Ahmad, Budi)",
      status: "Completed",
      tanggalImplementasi: "2024-01-11",
      durasi: "6 jam",
      catatan: "Maintenance selesai tanpa gangguan, sistem berjalan normal",
      foto: "4 foto",
    },
    {
      id: "IMP-2024-002",
      requestId: "CR-2024-006",
      jenisPerubahan: "Update Software",
      asetTerdampak: "Firewall",
      teknisi: "Tim A (Dedi, Eko)",
      status: "Failed",
      tanggalImplementasi: "2024-01-09",
      durasi: "3 jam",
      catatan: "Update gagal karena kompatibilitas, perlu rollback",
      foto: "2 foto",
    },
    {
      id: "IMP-2024-003",
      requestId: "CR-2024-007",
      jenisPerubahan: "Instalasi Hardware",
      asetTerdampak: "UPS Backup",
      teknisi: "Tim B (Fajar, Galih)",
      status: "Completed",
      tanggalImplementasi: "2024-01-08",
      durasi: "5 jam",
      catatan: "Instalasi berhasil, testing berjalan baik",
      foto: "6 foto",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Completed: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`${variants[status]} border-0`}>
        {status}
      </Badge>
    );
  };

  const filteredResults = results.filter((result) =>
    Object.values(result).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Hasil Implementasi
      </h1>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan ID, request, teknisi, atau aset..."
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
                <TableHead>Implementasi ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Jenis Perubahan</TableHead>
                <TableHead>Aset Terdampak</TableHead>
                <TableHead>Teknisi Bertugas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Implementasi</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Foto</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.id}</TableCell>
                  <TableCell>{result.requestId}</TableCell>
                  <TableCell>{result.jenisPerubahan}</TableCell>
                  <TableCell>{result.asetTerdampak}</TableCell>
                  <TableCell>{result.teknisi}</TableCell>
                  <TableCell>{getStatusBadge(result.status)}</TableCell>
                  <TableCell className="whitespace-nowrap">{result.tanggalImplementasi}</TableCell>
                  <TableCell>{result.durasi}</TableCell>
                  <TableCell className="max-w-xs truncate">{result.catatan}</TableCell>
                  <TableCell>{result.foto}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/implementation-results/${result.id}`)}
                    >
                      Detail
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

export default ImplementationResults;
