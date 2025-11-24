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
    },
    {
      id: "SCH-2024-002",
      requestId: "CR-2024-004",
      jenisPerubahan: "Konfigurasi Jaringan",
      aset: "Router Core",
      lokasi: "Gedung Dinas Perhubungan",
      tanggal: "2024-01-20",
      waktu: "14:00",
    },
    {
      id: "SCH-2024-003",
      requestId: "CR-2024-005",
      jenisPerubahan: "Maintenance Rutin",
      aset: "Database Server",
      lokasi: "Data Center",
      tanggal: "2024-01-22",
      waktu: "20:00",
    },
  ];

  // Dates with schedules for calendar highlighting
  const scheduleDates = schedules.map((s) => new Date(s.tanggal));

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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Calendar */}
        <Card className="bg-white p-6 lg:col-span-3 border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
            Kalender Jadwal
          </h2>
          <div className="w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full mx-auto border-2 border-gray-200 rounded-lg p-4"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-lg font-bold",
                nav: "space-x-1 flex items-center",
                nav_button: "h-10 w-10 bg-transparent hover:bg-primary/10 rounded-md transition-colors flex items-center justify-center border border-gray-300",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground rounded-md w-full font-semibold text-sm py-2 text-center",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full",
                day: "h-12 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 rounded-md transition-colors flex items-center justify-center",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground font-bold",
                day_today: "bg-accent text-accent-foreground font-bold",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
              }}
              modifiers={{
                scheduled: scheduleDates,
              }}
              modifiersClassNames={{
                scheduled: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-blue-500 after:rounded-full after:shadow-sm",
              }}
              onDayClick={(day) => {
                const dateStr = day.toISOString().split('T')[0];
                const schedule = schedules.find(s => s.tanggal === dateStr);
                if (schedule) {
                  navigate(`/implementation-schedule/${schedule.id}`);
                }
              }}
            />
          </div>
        </Card>

        {/* Schedule List */}
        <Card className="bg-white p-6 lg:col-span-2 border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#253040" }}>
            Daftar Jadwal
          </h2>
          <div className="mb-4">
            <div className="relative border-2 border-primary/30 rounded-lg overflow-hidden bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Cari jadwal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 focus-visible:ring-0 bg-white"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredSchedules.map((schedule) => (
              <Card
                key={schedule.id}
                className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-primary/30"
                onClick={() => navigate(`/implementation-schedule/${schedule.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-semibold text-primary">{schedule.id}</span>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{schedule.tanggal}</p>
                    <p className="text-sm text-muted-foreground">{schedule.waktu}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-base mb-3 text-foreground">{schedule.jenisPerubahan}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aset:</span>
                    <span className="font-semibold text-foreground text-right">{schedule.aset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lokasi:</span>
                    <span className="font-semibold text-foreground text-right">{schedule.lokasi}</span>
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
