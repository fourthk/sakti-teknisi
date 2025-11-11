import { useState } from "react";
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
import { Search } from "lucide-react";

const ApprovalList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const approvals = [
    {
      id: "APV-2024-001",
      requestId: "CR-2024-002",
      inspeksiId: "INS-2024-001",
      pejabat: "Budi Santoso",
      jabatan: "Kasi Infrastruktur",
      status: "Approved",
      tanggal: "2024-01-14 15:30",
      catatan: "Disetujui, lanjutkan dengan jadwal yang direncanakan",
    },
    {
      id: "APV-2024-002",
      requestId: "CR-2024-003",
      inspeksiId: "INS-2024-002",
      pejabat: "Siti Nurhaliza",
      jabatan: "Kasi Infrastruktur",
      status: "Approved",
      tanggal: "2024-01-13 11:00",
      catatan: "Approved",
    },
    {
      id: "APV-2024-003",
      requestId: "CR-2024-003",
      inspeksiId: "INS-2024-002",
      pejabat: "Ahmad Yani",
      jabatan: "Kabid Teknis",
      status: "Pending",
      tanggal: "-",
      catatan: "-",
    },
    {
      id: "APV-2024-004",
      requestId: "CR-2024-004",
      inspeksiId: "INS-2024-003",
      pejabat: "Dewi Lestari",
      jabatan: "Kasi Infrastruktur",
      status: "Approved",
      tanggal: "2024-01-12 10:30",
      catatan: "Perlu koordinasi dengan Diskominfo",
    },
    {
      id: "APV-2024-005",
      requestId: "CR-2024-004",
      inspeksiId: "INS-2024-003",
      pejabat: "Rudi Hermawan",
      jabatan: "Kabid Teknis",
      status: "Approved",
      tanggal: "2024-01-12 14:00",
      catatan: "Approved dengan monitoring ketat",
    },
    {
      id: "APV-2024-006",
      requestId: "CR-2024-004",
      inspeksiId: "INS-2024-003",
      pejabat: "Dr. Rina Kusuma",
      jabatan: "Diskominfo",
      status: "Pending",
      tanggal: "-",
      catatan: "-",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`${variants[status]} border-0`}>
        {status}
      </Badge>
    );
  };

  const filteredApprovals = approvals.filter((apv) =>
    Object.values(apv).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8" style={{ color: "#253040" }}>
        Daftar Persetujuan
      </h1>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Cari berdasarkan approval ID, request ID, pejabat, atau jabatan..."
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
                <TableHead>Approval ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Inspeksi ID</TableHead>
                <TableHead>Pejabat</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Catatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell className="font-medium">{approval.id}</TableCell>
                  <TableCell>{approval.requestId}</TableCell>
                  <TableCell>{approval.inspeksiId}</TableCell>
                  <TableCell>{approval.pejabat}</TableCell>
                  <TableCell>{approval.jabatan}</TableCell>
                  <TableCell>{getStatusBadge(approval.status)}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {approval.tanggal === "-" ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      approval.tanggal
                    )}
                  </TableCell>
                  <TableCell>
                    {approval.catatan === "-" ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      approval.catatan
                    )}
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

export default ApprovalList;
