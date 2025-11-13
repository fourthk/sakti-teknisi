import { useState } from "react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import saktiLogo from "@/assets/sakti-logo.png";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { 
    name: "Change Management", 
    subItems: [
      { name: "Daftar Laporan", path: "/change-request" },
      { name: "Daftar Persetujuan", path: "/approval-list" },
      { name: "Jadwal Implementasi", path: "/implementation-schedule" },
    ]
  },
  { name: "CMDB", path: "/cmdb" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>("Change Management");
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Fixed Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
        style={{ 
          height: "80px", 
          backgroundColor: "#384E66"
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/10 p-2 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <img 
            src={saktiLogo} 
            alt="SAKTI Logo" 
            className="h-12 object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="text-white hover:bg-white/10 p-2 rounded transition-colors"
            aria-label="Notifications"
          >
            <Bell size={24} />
          </button>
          <button 
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Profile"
          >
            <User size={24} />
          </button>
        </div>
      </header>

      {/* Sidebar - positioned below header */}
      <aside
        className={cn(
          "fixed left-0 transition-transform duration-300 ease-in-out z-40",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          top: "80px",
          width: "270px",
          height: "calc(100vh - 80px)",
          backgroundColor: "#384E66",
        }}
      >
        <nav className="py-4">
          {menuItems.map((item) => {
            if ('subItems' in item) {
              const isExpanded = expandedMenu === item.name;
              const hasActiveChild = item.subItems?.some(sub => location.pathname === sub.path);
              
              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setExpandedMenu(isExpanded ? null : item.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 text-white transition-all duration-200",
                      "hover:bg-[#2F4256] hover:pl-7",
                      "relative overflow-hidden group",
                      hasActiveChild && "bg-[#2F4256]"
                    )}
                  >
                    <span className="relative z-10 text-base font-medium">{item.name}</span>
                    <ChevronDown 
                      size={18} 
                      className={cn(
                        "transition-all duration-300 ease-out relative z-10",
                        isExpanded && "rotate-180",
                        "group-hover:scale-110"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2F4256]/0 to-[#2F4256]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="bg-[#2F4256] shadow-inner">
                      {item.subItems?.map((subItem, index) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-12 py-3 text-white transition-all duration-200 text-sm relative group",
                              "hover:bg-[#27384A] hover:pl-14 hover:shadow-md",
                              isActive && "bg-[#27384A] border-l-4 border-white font-medium"
                            )
                          }
                          style={{
                            transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
                          }}
                        >
                          <span className="relative z-10">{subItem.name}</span>
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-6 py-4 text-white transition-all duration-200 relative overflow-hidden group",
                    "hover:bg-[#2F4256] hover:pl-7",
                    isActive && "bg-[#2F4256] border-l-4 border-white font-medium"
                  )
                }
              >
                <span className="relative z-10 text-base">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2F4256]/0 to-[#2F4256]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-[270px]" : "ml-0"
        )}
        style={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
