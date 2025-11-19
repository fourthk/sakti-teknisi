import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const ImplementationSchedule = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const schedules = [
    {
      id: "SCH-2024-001",
      requestId: "CR-2024-003",
      jenisPerubahan: "Penggantian Hardware",
      aset: "Switch Network",
      lokasi: "Ruang Server Diskominfo",
      tanggal: "2024-01-20",
      waktu: "09:00",
      status: "Waiting",
    },
    {
      id: "SCH-2024-002",
      requestId: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      aset: "Router Core",
      lokasi: "Gedung Dinas Perhubungan",
      tanggal: "2024-01-20",
      waktu: "14:00",
      status: "Accept",
    },
    {
      id: "SCH-2024-003",
      requestId: "CR-2024-005",
      jenisPerubahan: "Maintenance Rutin",
      aset: "Database Server",
      lokasi: "Data Center",
      tanggal: "2024-01-22",
      waktu: "20:00",
      status: "Waiting",
    },
  ];

  // Dates with schedules for calendar highlighting
  const scheduleDates = schedules.map((s) => new Date(s.tanggal));

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Waiting: "bg-blue-100 text-blue-800",
      Accept: "bg-green-100 text-green-800",
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Jadwal Implementasi
        </h1>
        <Button 
          onClick={() => navigate("/create-schedule")}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2" size={18} />
          Buat Jadwal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-white p-6 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#253040" }}>
            Kalender
          </h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              scheduled: scheduleDates,
            }}
            modifiersStyles={{
              scheduled: {
                position: "relative",
              },
            }}
            modifiersClassNames={{
              scheduled: "bg-primary text-primary-foreground rounded-full font-bold after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full",
            }}
          />
        </Card>

        {/* Schedule List */}
        <Card className="bg-white p-6 lg:col-span-2 border-2 border-primary/20">
          <div className="mb-4">
            <div className="relative border-2 border-primary/30 rounded-md overflow-hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Cari berdasarkan ID, jenis, lokasi, atau aset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredSchedules.map((schedule) => (
              <Card
                key={schedule.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/implementation-schedule/${schedule.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(schedule.status)}
                    <span className="text-sm text-muted-foreground">{schedule.id}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{schedule.tanggal}</p>
                    <p className="text-sm text-muted-foreground">{schedule.waktu}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{schedule.jenisPerubahan}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Aset</p>
                    <p className="font-semibold">{schedule.aset}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lokasi</p>
                    <p className="font-semibold">{schedule.lokasi}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImplementationSchedule;
