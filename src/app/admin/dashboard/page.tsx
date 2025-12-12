'use client'

import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, Calendar, MessageSquare, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
    const stats = [
        {
            label: 'Total Blog Posts',
            value: '0',
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            label: 'Gallery Images',
            value: '0',
            icon: ImageIcon,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
        },
        {
            label: 'Upcoming Events',
            value: '0',
            icon: Calendar,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
        },
        {
            label: 'Contact Messages',
            value: '0',
            icon: MessageSquare,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600',
        },
    ]

    const recentActivity = [
        { action: 'System initialized', time: 'Just now', type: 'info' },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white"
            >
                <h2 className="text-3xl font-bold mb-2">Welcome to CalmiCasa Admin</h2>
                <p className="text-blue-100">
                    Manage your tiny homes website content from this dashboard
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <a
                            href="/admin/blog"
                            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-gray-900">Create New Blog Post</span>
                            </div>
                        </a>
                        <a
                            href="/admin/gallery"
                            className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-gray-900">Upload to Gallery</span>
                            </div>
                        </a>
                        <a
                            href="/admin/events"
                            className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <span className="font-medium text-gray-900">Add New Event</span>
                            </div>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
