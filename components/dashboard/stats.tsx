'use client';

const stats = [
  {
    label: 'Active Projects',
    value: '12',
    icon: '📦',
    change: '+2 this month',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Deployments',
    value: '48',
    icon: '🚀',
    change: '+12 this week',
    color: 'from-purple-500 to-pink-500',
  },
  {
    label: 'Team Members',
    value: '8',
    icon: '👥',
    change: 'Fully staffed',
    color: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Issues Resolved',
    value: '156',
    icon: '✅',
    change: '-23 remaining',
    color: 'from-orange-500 to-red-500',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative NodeGraph-blur-xl bg-white/40 border border-white/20 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{stat.icon}</div>
              <div className="text-xs font-semibold text-green-600 bg-green-100/50 px-2 py-1 rounded-full">
                {stat.change}
              </div>
            </div>

            <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
