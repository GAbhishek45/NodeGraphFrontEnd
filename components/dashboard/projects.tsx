'use client';

import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Next.js + Stripe integration for online store',
    status: 'Active',
    progress: 85,
    team: ['JD', 'SM', 'AR'],
    technology: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    id: 2,
    name: 'Mobile Analytics',
    description: 'Real-time analytics dashboard for mobile apps',
    status: 'In Progress',
    progress: 60,
    team: ['JD', 'MK'],
    technology: ['React', 'D3.js', 'Node.js'],
  },
  {
    id: 3,
    name: 'API Gateway',
    description: 'Centralized API management system',
    status: 'Planning',
    progress: 20,
    team: ['SM', 'BT'],
    technology: ['Express', 'PostgreSQL', 'Redis'],
  },
  {
    id: 4,
    name: 'DevOps Dashboard',
    description: 'Infrastructure monitoring and management',
    status: 'Active',
    progress: 72,
    team: ['AR', 'MK', 'JD'],
    technology: ['Kubernetes', 'Docker', 'Python'],
  },
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Planning: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-gray-100 text-gray-800',
};

export default function DashboardProjects() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          + New Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group NodeGraph-blur-xl bg-white/40 border border-white/20 rounded-xl p-6 hover:bg-white/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusColors[project.status as keyof typeof statusColors]
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Progress</span>
                <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Technology and team */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                {project.technology.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-blue-100/50 text-blue-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Team avatars */}
              <div className="flex -space-x-2">
                {project.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    title={member}
                  >
                    {member}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
