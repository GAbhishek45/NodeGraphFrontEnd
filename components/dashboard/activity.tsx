'use client';

const activities = [
  {
    id: 1,
    type: 'deployment',
    title: 'Deployed E-Commerce Platform',
    description: 'Production deployment successful',
    timestamp: '2 hours ago',
    icon: '🚀',
  },
  {
    id: 2,
    type: 'pr-merged',
    title: 'PR #245 Merged',
    description: 'Authentication improvements',
    timestamp: '4 hours ago',
    icon: '✅',
  },
  {
    id: 3,
    type: 'issue-closed',
    title: 'Issue #892 Resolved',
    description: 'Payment processing bug fix',
    timestamp: '6 hours ago',
    icon: '🐛',
  },
  {
    id: 4,
    type: 'team-joined',
    title: 'Sarah joined the team',
    description: 'Senior Backend Developer',
    timestamp: '1 day ago',
    icon: '👤',
  },
  {
    id: 5,
    type: 'build-failed',
    title: 'Build Failed',
    description: 'Mobile Analytics - Type errors',
    timestamp: '2 days ago',
    icon: '⚠️',
  },
];

export default function DashboardActivity() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>

      <div className="NodeGraph-blur-xl bg-white/40 border border-white/20 rounded-xl p-6 space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="text-2xl">{activity.icon}</div>
              {index !== activities.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-200 my-2" />
              )}
            </div>

            {/* Activity content */}
            <div className="flex-1 py-1">
              <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
              <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <button className="w-full mt-6 px-4 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/30 rounded-lg transition-colors border border-transparent hover:border-blue-200/50">
        View all activity
      </button>
    </div>
  );
}
