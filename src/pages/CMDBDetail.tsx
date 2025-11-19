import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CMDBDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-5xl font-bold" style={{ color: "#253040" }}>
          Detail Aset
        </h1>
      </div>

      {/* Asset Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card
          className="shadow-sm"
          style={{
            backgroundColor: "#FDFDFD",
            border: "1px solid #384E66",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "#384E66" }}>Ringkasan Aset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Asset ID:</span>
                <span className="text-gray-900">AST{id?.padStart(3, "0")}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Hostname:</span>
                <span className="text-gray-900">srv-prod-01</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">IP Address:</span>
                <span className="text-gray-900">192.168.1.10</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Sistem Operasi:</span>
                <span className="text-gray-900">Ubuntu 22.04 LTS</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Penanggung Jawab:</span>
                <span className="text-gray-900">Budi Santoso</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-300">
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-sm"
          style={{
            backgroundColor: "#FDFDFD",
            border: "1px solid #384E66",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "#384E66" }}>Spesifikasi Teknis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Vendor:</span>
                <span className="text-gray-900">Dell</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Model:</span>
                <span className="text-gray-900">PowerEdge R740</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Versi:</span>
                <span className="text-gray-900">Gen 14</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Lokasi:</span>
                <span className="text-gray-900">Ruang Server - Rack 12</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Departemen:</span>
                <span className="text-gray-900">Divisi TI</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Serial Number:</span>
                <span className="text-gray-900">SN123456789</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description Card */}
      <Card
        className="shadow-sm"
        style={{
          backgroundColor: "#FDFDFD",
          border: "1px solid #384E66",
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: "#384E66" }}>Deskripsi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Server produksi untuk aplikasi internal perusahaan. Server ini menjalankan aplikasi kritis untuk operasional harian dan memiliki spesifikasi tinggi untuk menangani beban kerja yang besar.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-700">Dibuat:</span>
              <span className="text-gray-900 ml-2">2024-01-15</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Update Terakhir:</span>
              <span className="text-gray-900 ml-2">2024-03-10</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMDBDetail;
