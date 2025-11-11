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
import { Search, MoreVertical, Plus, Edit } from "lucide-react";

const CMDB = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const assets = [
    {
      id: "AST-001",
      namaAsset: "Server Aplikasi Utama",
      tipe: "Server",
      lokasi: "Data Center - Rack A3",
      ownerDinas: "Diskominfo",
      statusOperasional: "Active",
      konfigurasiRingkas: "Dell R740, 128GB RAM, 2TB Storage",
      hubunganKeAssetLain: "Network Switch AST-015, Storage AST-023",
      lastAuditDate: "2024-01-10",
      catatan: "Critical production server",
    },
    {
      id: "AST-002",
      namaAsset: "Database Server",
      tipe: "Server",
      lokasi: "Data Center - Rack A4",
      ownerDinas: "Diskominfo",
      statusOperasional: "Active",
      konfigurasiRingkas: "HP DL380, 256GB RAM, 4TB Storage",
      hubunganKeAssetLain: "Backup Server AST-005",
      lastAuditDate: "2024-01-11",
      catatan: "PostgreSQL & MySQL instances",
    },
    {
      id: "AST-003",
      namaAsset: "Firewall UTM",
      tipe: "Network Device",
      lokasi: "Ruang Server Diskominfo",
      ownerDinas: "Diskominfo",
      statusOperasional: "Active",
      konfigurasiRingkas: "Fortinet FortiGate 600E",
      hubunganKeAssetLain: "Core Switch AST-010, Router AST-012",
      lastAuditDate: "2024-01-08",
      catatan: "Main security gateway",
    },
    {
      id: "AST-004",
      namaAsset: "Core Switch",
      tipe: "Network Device",
      lokasi: "Data Center - Rack B1",
      ownerDinas: "Diskominfo",
      statusOperasional: "Active",
      konfigurasiRingkas: "Cisco Catalyst 9500, 48 ports",
      hubunganKeAssetLain: "Firewall AST-003, Access Switches AST-016-020",
      lastAuditDate: "2023-12-28",
      catatan: "Recently replaced",
    },
    {
      id: "AST-005",
      namaAsset: "Backup Server",
      tipe: "Server",
      lokasi: "Data Center - Rack A5",
      ownerDinas: "Diskominfo",
      statusOperasional: "Active",
      konfigurasiRingkas: "Synology RS3621xs+, 64GB RAM, 48TB",
      hubunganKeAssetLain: "Database Server AST-002, File Server AST-007",
      lastAuditDate: "2024-01-05",
      catatan: "Daily automated backups",
    },
    {
      id: "AST-006",
      namaAsset: "Web Application Server",
      tipe: "Server",
      lokasi: "Data Center - Rack A3",
      ownerDinas: "Dinas Pendidikan",
      statusOperasional: "Maintenance",
      konfigurasiRingkas: "VM on ESXi, 32GB RAM, 500GB Storage",
      hubunganKeAssetLain: "Load Balancer AST-013",
      lastAuditDate: "2023-12-15",
      catatan: "Scheduled maintenance for software updates",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Active: "bg-green-100 text-green-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Inactive: "bg-gray-100 text-gray-800",
      Retired: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`${variants[status]} border-0`}>
        {status}
      </Badge>
    );
  };

  const filteredAssets = assets.filter((asset) =>
    Object.values(asset).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
