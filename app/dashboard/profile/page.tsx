"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Calendar,
  Camera,
  Settings,
  Crown,
  BarChart3,
  Download,
  Palette,
  Clock,
  Trophy,
  Star,
  Zap,
  Edit3,
  Save,
  X,
  Plus
} from "lucide-react"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    company: "",
    website: "",
    bio: ""
  })

  const userStats = [
    { label: "Projects Created", value: "12", icon: BarChart3, color: "text-blue-600" },
    { label: "Templates Used", value: "8", icon: Palette, color: "text-green-600" },
    { label: "Exports Generated", value: "45", icon: Download, color: "text-purple-600" },
    { label: "Hours Designed", value: "28", icon: Clock, color: "text-orange-600" }
  ]

  const achievements = [
    { title: "First Design", description: "Created your first packaging design", icon: Trophy, unlocked: true },
    { title: "Template Explorer", description: "Used 5 different templates", icon: Star, unlocked: true },
    { title: "Power User", description: "Created 10+ projects", icon: Zap, unlocked: true },
    { title: "Pro Designer", description: "Used advanced features", icon: Crown, unlocked: false }
  ]

  const recentActivity = [
    { action: "Created Coffee Package Design", time: "2 hours ago", type: "create" },
    { action: "Exported Skincare Box as PNG", time: "1 day ago", type: "export" },
    { action: "Used Premium Template", time: "3 days ago", type: "template" },
    { action: "Updated Profile Information", time: "1 week ago", type: "profile" }
  ]

  const handleSave = async () => {
    try {
      // In a real app, this would update the user's profile in the database
      await update({
        name: formData.name,
        email: formData.email
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <DashboardLayout title="Profile">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <CardContent className="relative p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      session?.user?.name?.charAt(0) || "U"
                    )}
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
                    <Camera className="h-4 w-4 text-slate-600" />
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                        placeholder="Your Name"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="text-slate-600 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-slate-900">{session?.user?.name}</h1>
                      <div className="flex items-center text-slate-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {session?.user?.email}
                      </div>
                      <div className="flex items-center text-slate-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined December 2024
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm" variant="success" leftIcon={<Save className="h-4 w-4" />}>
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} size="sm" variant="outline" leftIcon={<X className="h-4 w-4" />}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" leftIcon={<Edit3 className="h-4 w-4" />}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {userStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card variant="interactive" padding="sm">
                    <CardContent className="text-center">
                      <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions on PackagePro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${
                        activity.type === 'create' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'export' ? 'bg-green-100 text-green-600' :
                        activity.type === 'template' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'create' && <Plus className="h-4 w-4" />}
                        {activity.type === 'export' && <Download className="h-4 w-4" />}
                        {activity.type === 'template' && <Palette className="h-4 w-4" />}
                        {activity.type === 'profile' && <User className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{activity.action}</div>
                        <div className="text-xs text-slate-500">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements & Settings */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Plan Information */}
            <Card variant="gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-yellow-600" />
                  Free Plan
                </CardTitle>
                <CardDescription>Upgrade to unlock premium features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Projects</span>
                    <span className="font-medium">5 / 5</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-full" />
                  </div>
                  <Button variant="gradient" size="sm" className="w-full">
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your design milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      variants={itemVariants}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-slate-50 border border-slate-200 opacity-60'
                      }`}
                    >
                      <achievement.icon className={`h-5 w-5 ${
                        achievement.unlocked ? 'text-green-600' : 'text-slate-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{achievement.title}</div>
                        <div className="text-xs text-slate-500">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Settings className="h-4 w-4" />}>
                    Account Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<User className="h-4 w-4" />}>
                    Privacy Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Crown className="h-4 w-4" />}>
                    Billing & Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}