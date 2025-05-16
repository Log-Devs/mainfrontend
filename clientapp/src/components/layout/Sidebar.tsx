import { LogOut, Package, Truck, Settings, AlertCircle, History, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  navItems,
  active,
  setActive,
  onLogout,
  collapsed,
  setCollapsed,
}: {
  navItems: { label: string; key: string; icon?: string; path: string }[];
  active: string;
  setActive: (key: string) => void;
  onLogout?: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  // Theme handling has been moved to ThemeProvider
  // Removed unused mobileOpen state
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Persist collapsed state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setCollapsed(stored === "true");
    }
  }, [setCollapsed]);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  // Handle outside click to collapse sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !collapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed, setCollapsed]);

  const getIconForItem = (key: string) => {
    const iconSize = 20;
    switch (key) {
      case 'dashboard':
        return <LayoutDashboard size={iconSize} />;
      case 'submit':
        return <Package size={iconSize} />;
      case 'awaiting':
        return <Truck size={iconSize} />;
      case 'history':
        return <History size={iconSize} />;
      case 'report':
        return <AlertCircle size={iconSize} />;
      case 'settings':
        return <Settings size={iconSize} />;
      default:
        return <Package size={iconSize} />;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebarRef}
        className={`
          fixed z-40 top-0 left-0 h-full transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col shadow-lg
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h1
            className={`text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-300 overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
              }`}
          >
            Client Portal
          </h1>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ?
              <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" /> :
              <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
            }
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${active === item.key
                      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70"
                    }
                  `}
                  onClick={() => {
                    setActive(item.key);
                  }}
                >
                  <span className="flex items-center justify-center min-w-[24px]">
                    {getIconForItem(item.key)}
                  </span>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 mt-auto">
          <button
            onClick={onLogout}
            className={`flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all ${collapsed ? 'justify-center' : ''
              }`}
            aria-label="Logout"
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className={`ml-3 transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}>
              Logout
            </span>
          </button>
          <div className={`mt-4 flex ${collapsed ? 'justify-center' : 'items-center justify-between'}`}>
            <p className={`text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 ${collapsed ? 'hidden' : 'block'
              }`}>
              © 2025 Logistics Co.
            </p>

          </div>
        </div>
      </div>

      {/* Main Content Spacer - Ensures content doesn't appear under the sidebar */}
      <div
        className={`min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-64'
          }`}
        style={{ marginLeft: collapsed ? '4rem' : '16rem' }}
      ></div>    </>
  );
};

export default Sidebar;