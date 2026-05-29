"use client";
import { useEffect, useState } from 'react';

export default function Sidebar({ tenant, onLogout }: { tenant: string; onLogout: () => void }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-900 shadow flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {tenant[0]?.toUpperCase()}
        </div>
        <span className="font-bold text-lg text-gray-800 dark:text-white">{tenant}</span>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-2 mt-8">
          <li><a className="block py-2 px-3 rounded hover:bg-blue-50 dark:hover:bg-gray-800" href="/dashboard">Dashboard</a></li>
          <li><a className="block py-2 px-3 rounded hover:bg-blue-50 dark:hover:bg-gray-800" href="/projects">Proyectos</a></li>
        </ul>
      </nav>
      <div className="p-4 border-t dark:border-gray-800 flex items-center justify-between">
        <button onClick={() => setDark(d => !d)} className="text-xs text-gray-500 dark:text-gray-300">{dark ? '☀️ Claro' : '🌙 Oscuro'}</button>
        <button onClick={onLogout} className="text-xs text-red-500">Salir</button>
      </div>
    </aside>
  );
}
