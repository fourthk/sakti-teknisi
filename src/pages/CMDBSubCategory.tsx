import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockAssets = [
  {
    id: 1,
    category: "Perangkat Keras",
    parentId: "HW001",
    assetId: "AST-HW-001",
    assetType: "Laptop",
    hostname: "LT-IT-001",
    ipAddress: "192.168.1.50",
    osName: "Windows",
    osVersion: "11 Pro",
    vendor: "Dell",
    location: "Ruang IT Lantai 2",
    ownerDepartment: "Divisi TI",
    responsiblePerson: "Budi Santoso",
    status: "Active",
    description: "Laptop untuk staff IT operasional",
    created: "2024-01-15",
    lastUpdate: "2024-03-10",
  },
  {
    id: 2,
    category: "Perangkat Jaringan",
    parentId: "NET001",
    assetId: "AST-NET-001",
    assetType: "Switch Managed",
    hostname: "SW-CORE-01",
    ipAddress: "192.168.1.1",
    osName: "Cisco IOS",
    osVersion: "15.2",
    vendor: "Cisco",
    location: "Ruang Server",
    ownerDepartment: "Divisi Jaringan",
    responsiblePerson: "Ahmad Fauzi",
    status: "Active",
    description: "Core switch untuk backbone jaringan kantor",
    created: "2024-01-20",
    lastUpdate: "2024-03-08",
  },
  {
    id: 3,
    category: "Server & Penyimpanan",
    parentId: "SRV001",
    assetId: "AST-SRV-001",
    assetType: "Server Fisik",
    hostname: "SRV-PROD-01",
    ipAddress: "192.168.1.10",
    osName: "Windows Server",
    osVersion: "2022",
    vendor: "HPE",
    location: "Ruang Server",
    ownerDepartment: "Divisi TI",
    responsiblePerson: "Siti Nurhaliza",
    status: "Active",
    description: "Server produksi untuk aplikasi internal",
    created: "2023-11-05",
    lastUpdate: "2024-03-12",
  },
  {
    id: 4,
    category: "Perangkat Keras",
    parentId: "HW002",
    assetId: "AST-HW-015",
    assetType: "PC Desktop",
    hostname: "PC-FIN-05",
    ipAddress: "192.168.2.45",
    osName: "Windows",
    osVersion: "10 Pro",
    vendor: "Lenovo",
    location: "Ruang Keuangan Lantai 3",
    ownerDepartment: "Divisi Keuangan",
    responsiblePerson: "Rina Wijaya",
    status: "Inactive",
    description: "Desktop untuk staff keuangan",
    created: "2024-02-01",
    lastUpdate: "2024-03-05",
  },
  {
    id: 5,
    category: "Perangkat Cetak",
    parentId: "PRT001",
    assetId: "AST-PRT-003",
    assetType: "Printer Multifungsi",
    hostname: "PRT-ADM-01",
    ipAddress: "192.168.3.20",
    osName: "-",
    osVersion: "-",
    vendor: "Canon",
    location: "Ruang Administrasi Lantai 1",
    ownerDepartment: "Divisi Administrasi",
    responsiblePerson: "Dewi Lestari",
    status: "Maintenance",
    description: "Mesin cetak multifungsi untuk administrasi",
    created: "2024-01-10",
    lastUpdate: "2024-03-09",
  },
];

const CMDBSubcategory = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<typeof mockAssets[0] | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "retired":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getCategoryColor = (cat: string) => {
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  const handleChangeStatus = (asset: typeof mockAssets[0]) => {
    setSelectedAsset(asset);
    setNewStatus(asset.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = () => {
    // Handle status update logic here
    setIsStatusModalOpen(false);
    setSelectedAsset(null);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(`/cmdb/${encodeURIComponent(category || "")}`)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Kembali ke kategori"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <div className="text-sm text-gray-500">{category}</div>
          <h1
            className="text-4xl font-bold"
            style={{ color: "#253040" }}
          >
            {subcategory}
          </h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: "#384E66" }}
            size={20}
          />
          <Input
            placeholder="Cari aset..."
            className="pl-10 bg-white font-medium"
            style={{ 
              borderRadius: "8px",
              borderColor: "#384E66",
              borderWidth: "2px"
            }}
          />
        </div>
        <Select defaultValue="All">
          <SelectTrigger 
            className="w-40" 
            style={{ backgroundColor: "#384E66", color: "white", borderColor: "#384E66" }}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden shadow-sm mb-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#384E66" }}>
              <TableHead className="text-white font-semibold">ID</TableHead>
              <TableHead className="text-white font-semibold">Kategori</TableHead>
              <TableHead className="text-white font-semibold">Parent ID</TableHead>
              <TableHead className="text-white font-semibold">Asset ID</TableHead>
              <TableHead className="text-white font-semibold">Tipe Aset</TableHead>
              <TableHead className="text-white font-semibold">Hostname</TableHead>
              <TableHead className="text-white font-semibold">IP Address</TableHead>
              <TableHead className="text-white font-semibold">OS Name</TableHead>
              <TableHead className="text-white font-semibold">OS Version</TableHead>
              <TableHead className="text-white font-semibold">Vendor</TableHead>
              <TableHead className="text-white font-semibold">Lokasi</TableHead>
              <TableHead className="text-white font-semibold">Departemen Pemilik</TableHead>
              <TableHead className="text-white font-semibold">Penanggung Jawab</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Deskripsi</TableHead>
              <TableHead className="text-white font-semibold">Dibuat</TableHead>
              <TableHead className="text-white font-semibold">Update Terakhir</TableHead>
              <TableHead className="text-white font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssets.map((asset) => (
              <TableRow key={asset.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getCategoryColor(asset.category)}
                  >
                    {asset.category}
                  </Badge>
                </TableCell>
                <TableCell>{asset.parentId}</TableCell>
                <TableCell>{asset.assetId}</TableCell>
                <TableCell>{asset.assetType}</TableCell>
                <TableCell>{asset.hostname}</TableCell>
                <TableCell>{asset.ipAddress}</TableCell>
                <TableCell>{asset.osName}</TableCell>
                <TableCell>{asset.osVersion}</TableCell>
                <TableCell>{asset.vendor}</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>{asset.ownerDepartment}</TableCell>
                <TableCell>{asset.responsiblePerson}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(asset.status)}
                  >
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{asset.description}</TableCell>
                <TableCell>{asset.created}</TableCell>
                <TableCell>{asset.lastUpdate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white z-50">
                      <DropdownMenuItem
                        onClick={() => navigate(`/cmdb/detail/${asset.id}`)}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/cmdb/history/${asset.id}`)}
                      >
                        Riwayat
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeStatus(asset)}>
                        Ubah Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Edit asset:", asset.id)}>
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 2} onClick={() => setCurrentPage(2)}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 3} onClick={() => setCurrentPage(3)}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              className={currentPage === 3 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Change Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: "#253040" }}>
              Ubah Status
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full border-2" style={{ borderColor: "#384E66", borderRadius: "12px" }}>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsStatusModalOpen(false)}
              variant="outline"
              className="flex-1"
              style={{ borderColor: "#384E66", borderRadius: "8px", borderWidth: "2px" }}
            >
              Batal
            </Button>
            <Button
              onClick={handleStatusSubmit}
              className="flex-1"
              style={{ backgroundColor: "#384E66", color: "white", borderRadius: "8px" }}
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMDBSubcategory;
