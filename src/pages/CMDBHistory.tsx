import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock } from "lucide-react";

const CMDBHistory = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();

  const history = [
    {
      id: 1,
      timestamp: "2024-01-18 14:30:00",
      user: "Ahmad Rizki",
      action: "Update",
      field: "Lokasi",
      oldValue: "Ruang IT Lantai 1",
      newValue: "Ruang IT Lantai 2",
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:15:00",
      user: "Siti Nurhaliza",
      action: "Update",
      field: "Status",
      oldValue: "Maintenance",
      newValue: "Aktif",
    },
    {
      id: 3,
      timestamp: "2024-01-10 16:45:00",
      user: "Budi Santoso",
      action: "Update",
      field: "OS Version",
      oldValue: "10 Pro",
      newValue: "11 Pro",
    },
    {
      id: 4,
      timestamp: "2023-12-20 11:20:00",
      user: "Ahmad Rizki",
      action: "Update",
      field: "IP Address",
      oldValue: "192.168.1.45",
      newValue: "192.168.1.50",
    },
    {
      id: 5,
      timestamp: "2023-06-15 08:00:00",
      user: "System",
      action: "Create",
      field: "Initial Entry",
      oldValue: "-",
      newValue: "Asset Created",
    },
  ];

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/cmdb/${category}`)}
      >
        <ArrowLeft className="mr-2" size={18} />
        Kembali
      </Button>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Riwayat Perubahan
        </h1>
        <Badge className="bg-primary/10 text-primary border-primary/30 border text-sm px-3 py-1">
          {id}
        </Badge>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <Card key={entry.id} className="bg-white p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-primary" size={18} />
                  <span className="font-semibold text-foreground">{entry.timestamp}</span>
                  <Badge className={`${
                    entry.action === "Create" 
                      ? "bg-blue-100 text-blue-800" 
                      : entry.action === "Update"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  } border-0`}>
                    {entry.action}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-9">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pengguna</p>
                    <p className="font-semibold text-foreground">{entry.user}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Field</p>
                    <p className="font-semibold text-foreground">{entry.field}</p>
                  </div>
                  {entry.action !== "Create" && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Nilai Lama</p>
                        <p className="font-medium text-red-600">{entry.oldValue}</p>
                      </div>
                      <div className="md:col-start-3">
                        <p className="text-sm text-muted-foreground mb-1">Nilai Baru</p>
                        <p className="font-medium text-green-600">{entry.newValue}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CMDBHistory;
