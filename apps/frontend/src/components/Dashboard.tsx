'use client';
import { useEffect, useState } from 'react';

export default function Dashboard({
  user,
  tenant,
  projects,
}: {
  user: any;
  tenant: string;
  projects: any[];
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenido, {user.email} ({user.role})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold">
            {tenant}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {projects.length}
          </span>
          <span className="text-gray-500 dark:text-gray-400">Proyectos</span>
        </div>
        {/* Otros cards métricas aquí */}
      </div>
    </div>
  );
}
