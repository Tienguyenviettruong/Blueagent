<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  Key,
  Bell,
  Shield,
  Palette,
  Globe,
  ChevronRight,
  Save
} from 'lucide-vue-next'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'api', name: 'API Keys', icon: Key },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'language', name: 'Language', icon: Globe }
]

const profile = ref({
  name: 'Admin',
  email: 'admin@blue9.ai',
  avatar: '',
  bio: 'Multi-Agent Orchestration Platform'
})

const apiKeys = ref([
  { name: 'OpenAI', key: 'sk-...xxxx', status: 'active' },
  { name: 'Claude', key: 'sk-...xxxx', status: 'active' },
  { name: 'Ollama', key: 'local', status: 'inactive' }
])

const notifications = ref({
  email: true,
  push: false,
  slack: true,
  webhook: false
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Settings</h1>
      <p class="text-[#666] mt-1">Manage your preferences and configurations</p>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <!-- Sidebar -->
      <div class="bg-[#111] rounded-xl border border-[#1a1a1a] p-4">
        <nav class="space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm"
            :class="[
              activeTab === tab.id
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-[#666] hover:bg-[#1a1a1a] hover:text-[#999]'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.name }}</span>
          </button>
        </nav>
      </div>

      <!-- Content -->
      <div class="col-span-3 bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
        <!-- Profile -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">Profile</h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-[#666] mb-1 block">Name</label>
              <input
                v-model="profile.name"
                type="text"
                class="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
              />
            </div>
            <div>
              <label class="text-sm text-[#666] mb-1 block">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
              />
            </div>
            <div>
              <label class="text-sm text-[#666] mb-1 block">Bio</label>
              <textarea
                v-model="profile.bio"
                rows="3"
                class="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a] resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- API Keys -->
        <div v-if="activeTab === 'api'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">API Keys</h2>
          <div class="space-y-3">
            <div
              v-for="api in apiKeys"
              :key="api.name"
              class="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg"
            >
              <div>
                <h3 class="text-sm font-medium text-white">{{ api.name }}</h3>
                <p class="text-xs text-[#666] mt-1">{{ api.key }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  api.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-[#1a1a1a] text-[#666]'
                ]">{{ api.status }}</span>
                <button class="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <ChevronRight class="w-4 h-4 text-[#666]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">Notifications</h2>
          <div class="space-y-4">
            <div
              v-for="(value, key) in notifications"
              :key="key"
              class="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg"
            >
              <div>
                <h3 class="text-sm font-medium text-white capitalize">{{ key }}</h3>
                <p class="text-xs text-[#666] mt-1">Receive {{ key }} notifications</p>
              </div>
              <button
                @click="notifications[key] = !value"
                :class="[
                  'w-11 h-6 rounded-full transition-colors relative',
                  value ? 'bg-blue-500' : 'bg-[#1a1a1a]'
                ]"
              >
                <div :class="[
                  'w-4 h-4 rounded-full bg-white absolute top-1 transition-transform',
                  value ? 'translate-x-6' : 'translate-x-1'
                ]"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">Security</h2>
          <div class="space-y-4">
            <div class="p-4 bg-[#0a0a0a] rounded-lg">
              <h3 class="text-sm font-medium text-white">Change Password</h3>
              <p class="text-xs text-[#666] mt-1">Update your password regularly for security</p>
              <button class="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                Change Password
              </button>
            </div>
            <div class="p-4 bg-[#0a0a0a] rounded-lg">
              <h3 class="text-sm font-medium text-white">Two-Factor Authentication</h3>
              <p class="text-xs text-[#666] mt-1">Add an extra layer of security</p>
              <button class="mt-3 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors text-sm">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        <!-- Appearance -->
        <div v-if="activeTab === 'appearance'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">Appearance</h2>
          <div class="space-y-4">
            <div class="p-4 bg-[#0a0a0a] rounded-lg">
              <h3 class="text-sm font-medium text-white">Theme</h3>
              <p class="text-xs text-[#666] mt-1">Choose your preferred theme</p>
              <div class="flex gap-3 mt-3">
                <button class="w-20 h-20 bg-[#0a0a0a] border-2 border-blue-500 rounded-lg flex items-center justify-center">
                  <span class="text-xs text-white">Dark</span>
                </button>
                <button class="w-20 h-20 bg-white border-2 border-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <span class="text-xs text-black">Light</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Language -->
        <div v-if="activeTab === 'language'" class="space-y-6">
          <h2 class="text-lg font-semibold text-white">Language</h2>
          <div class="space-y-4">
            <div class="p-4 bg-[#0a0a0a] rounded-lg">
              <h3 class="text-sm font-medium text-white">Interface Language</h3>
              <select class="mt-3 w-full px-3 py-2 bg-[#111] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]">
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-6 pt-6 border-t border-[#1a1a1a]">
          <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Save class="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
