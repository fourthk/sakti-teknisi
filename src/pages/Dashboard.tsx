import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const weeklyData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Diajukan',
        data: [5, 6, 4, 7, 8, 3, 2],
        backgroundColor: '#384E66',
        borderRadius: 4,
      },
      {
        label: 'Disetujui',
        data: [3, 4, 3, 5, 6, 2, 1],
        backgroundColor: '#5A7A9F',
        borderRadius: 4,
      },
      {
        label: 'Diimplementasi',
        data: [2, 3, 2, 4, 4, 1, 0],
        backgroundColor: '#8FA5C1',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const kpiData = [
    { label: "Total Laporan Hari Ini", value: "12", icon: FileText, color: "#253040" },
    { label: "Pending Inspeksi", value: "5", icon: Clock, color: "#253040" },
    { label: "Disetujui (Menunggu Jadwal)", value: "8", icon: CheckCircle, color: "#253040" },
    { label: "Jadwal Hari Ini", value: "3", icon: CalendarIcon, color: "#253040" },
  ];

  const recentActivities = [
    { time: "10:30", text: "Laporan baru dari Dinas Pendidikan - Server down" },
    { time: "09:15", text: "Inspeksi selesai untuk Request #CR-2024-045" },
    { time: "08:45", text: "Jadwal implementasi dibuat untuk Request #CR-2024-042" },
    { time: "08:00", text: "Persetujuan diterima dari Kabid untuk Request #CR-2024-041" },
  ];

  return (
    <div>
      <h1 
        className="text-5xl font-bold mb-8"
        style={{ color: "#253040" }}
      >
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="p-6 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
                  <p className="text-4xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </div>
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${kpi.color}20` }}
                >
                  <Icon size={24} style={{ color: kpi.color }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly Trend Chart */}
      <Card className="p-6 bg-white mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#253040" }}>
          Tren Mingguan
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Laporan yang Diajukan / Disetujui / Diimplementasi
        </p>
        <div style={{ height: '300px' }}>
          <Bar data={weeklyData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
