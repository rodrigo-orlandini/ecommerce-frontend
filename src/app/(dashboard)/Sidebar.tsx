'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Products from '@/icons/Products';
import Categories from '@/icons/Categories';
import Brands from '@/icons/Brands';
import Orders from '@/icons/Orders';
import Close from '@/icons/Close';

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Produtos',
    icon: Products,
    href: '/products',
  },
  {
    label: 'Categorias',
    icon: Categories,
    href: '/categories',
  },
  {
    label: 'Marcas',
    icon: Brands,
    href: '/brands',
  },
  {
    label: 'Pedidos',
    icon: Orders,
    href: '/orders',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <Close className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? 'text-blue-600'
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
