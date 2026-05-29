'use client';
import { useState } from 'react';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import ProjectsTable from '../components/ProjectsTable';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tenant, setTenant] = useState('acme'); // Simulación
  const [projects, setProjects] = useState<any[]>([]);

  const handleLogin = async (jwt: string) => {
    setToken(jwt);
    // Simulación: obtener usuario y proyectos
    setUser({ email: 'admin@acme.com', role: 'ADMIN' });
    setProjects([
      { id: '1', name: 'Proyecto Demo' },
      { id: '2', name: 'Proyecto SaaS' },
    ]);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setProjects([]);
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
      <Sidebar tenant={tenant} onLogout={handleLogout} />
      <main className="flex-1">
        <Dashboard user={user} tenant={tenant} projects={projects} />
        <ProjectsTable projects={projects} />
      </main>
    </div>
  );
}
