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
import { Search, MoreVertical, Plus, Calendar as CalendarIcon } from "lucide-react";

const ImplementationSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules = [
    {
      id: "SCH-2024-001",
      requestId: "CR-2024-003",
      tanggalMulai: "2024-01-20",
      waktuMulai: "09:00",
      tanggalSelesai: "2024-01-20",
      waktuSelesai: "13:00",
      lokasi: "Ruang Server Diskominfo",
      aset: "Switch Network",
      teknisi: "Team A (3 orang)",
      status: "Scheduled",
      catatan: "Backup sistem sebelum pergantian",
      foto: "2 foto",
    },
    {
      id: "SCH-2024-002",
      requestId: "CR-2024-004",
      tanggalMulai: "2024-01-18",
      waktuMulai: "08:00",
      tanggalSelesai: "2024-01-18",
      waktuSelesai: "16:00",
      lokasi: "Gedung Dinas Perhubungan",
      aset: "Router Core",
      teknisi: "Team B (4 orang)",
      status: "In Progress",
      catatan: "Koordinasi dengan vendor ISP",
      foto: "5 foto",
    },
    {
      id: "SCH-2024-003",
      requestId: "CR-2024-005",
      tanggalMulai: "2024-01-10",
      waktuMulai: "20:00",
      tanggalSelesai: "2024-01-11",
      waktuSelesai: "02:00",
      lokasi: "Data Center",
      aset: "Database Server",
      teknisi: "Team C (2 orang)",
      status: "Completed",
      catatan: "Maintenance selesai tanpa gangguan",
      foto: "8 foto",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Scheduled: "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`${variants[status]} border-0`}>
        {status}
      </Badge>
    );
  };

  const filteredSchedules = schedules.filter((sch) =>
    Object.values(sch).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Jadwal Implementasi
        </h1>
        <Button style={{ backgroundColor: "#384E66" }} size="lg">
          <Plus className="mr-2" size={20} />
          Buat Jadwal
        </Button>
      </div>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan schedule ID, request ID, lokasi, atau aset..."
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
                <TableHead>Schedule ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Waktu Mulai</TableHead>
                <TableHead>Waktu Selesai</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Aset</TableHead>
                <TableHead>Teknisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Foto</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.id}</TableCell>
                  <TableCell>{schedule.requestId}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm">
                      <CalendarIcon size={14} />
                      <span>{schedule.tanggalMulai} {schedule.waktuMulai}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm">
                      <CalendarIcon size={14} />
                      <span>{schedule.tanggalSelesai} {schedule.waktuSelesai}</span>
                    </div>
                  </TableCell>
                  <TableCell>{schedule.lokasi}</TableCell>
                  <TableCell>{schedule.aset}</TableCell>
                  <TableCell>{schedule.teknisi}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell className="max-w-xs truncate">{schedule.catatan}</TableCell>
                  <TableCell>{schedule.foto}</TableCell>
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
                          Edit Jadwal
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted/80 cursor-pointer transition-colors duration-150 focus:bg-muted/80">
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted/80 cursor-pointer transition-colors duration-150 focus:bg-muted/80">
                          Cetak
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

export default ImplementationSchedule;
