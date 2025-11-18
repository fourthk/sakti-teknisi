import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Server, Network, Monitor, HardDrive, Wifi, Database } from "lucide-react";

const CMDB = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Server", icon: Server, count: 12, color: "#3B82F6" },
    { name: "Network", icon: Network, count: 24, color: "#10B981" },
    { name: "Workstation", icon: Monitor, count: 156, color: "#F59E0B" },
    { name: "Storage", icon: HardDrive, count: 8, color: "#8B5CF6" },
    { name: "Wireless", icon: Wifi, count: 32, color: "#EC4899" },
    { name: "Database", icon: Database, count: 6, color: "#14B8A6" },
  ];


  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          CMDB
        </h1>
        <Button style={{ backgroundColor: "#384E66" }}>
          <Plus className="mr-2" size={18} />
          Tambah Aset
        </Button>
      </div>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan Asset ID, nama, tipe, lokasi, atau owner..."
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
                <TableHead>Asset ID</TableHead>
                <TableHead>Nama Asset</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Owner Dinas</TableHead>
                <TableHead>Status Operasional</TableHead>
                <TableHead>Konfigurasi Ringkas</TableHead>
                <TableHead>Hubungan ke Asset Lain</TableHead>
                <TableHead>Last Audit Date</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell className="font-medium">{asset.namaAsset}</TableCell>
                  <TableCell>{asset.tipe}</TableCell>
                  <TableCell>{asset.lokasi}</TableCell>
                  <TableCell>{asset.ownerDinas}</TableCell>
                  <TableCell>{getStatusBadge(asset.statusOperasional)}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{asset.konfigurasiRingkas}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-sm text-muted-foreground">
                      {asset.hubunganKeAssetLain}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{asset.lastAuditDate}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-sm">{asset.catatan}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>View Relationships</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> CMDB aset hanya dapat diedit oleh pengguna dengan role yang diotorisasi. 
            Semua perubahan akan tercatat dalam change log secara otomatis.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CMDB;
