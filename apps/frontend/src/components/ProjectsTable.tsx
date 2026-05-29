export default function ProjectsTable({ projects }: { projects: any[] }) {
  if (!projects.length) {
    return <div className="p-8 text-gray-500 dark:text-gray-400">No hay proyectos aún.</div>;
  }
  return (
    <div className="overflow-x-auto p-8">
      <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Nombre</th>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">ID</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t dark:border-gray-800">
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4 text-xs text-gray-400">{p.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
