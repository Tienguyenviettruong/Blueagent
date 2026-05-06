<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  ChevronRight,
  Check
} from 'lucide-vue-next'

const activeSection = ref('general')

const sections = [
  { id: 'general', label: 'General', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'storage', label: 'Storage', icon: Database },
  { id: 'providers', label: 'Providers', icon: Globe }
]

const settings = {
  general: [
    { id: 'name', label: 'Name', value: 'Admin', type: 'text' },
    { id: 'email', label: 'Email', value: 'admin@blue9.io', type: 'text' },
    { id: 'theme', label: 'Theme', value: 'Dark', type: 'select' },
    { id: 'language', label: 'Language', value: 'English', type: 'select' }
  ],
  notifications: [
    { id: 'email', label: 'Email Notifications', enabled: true },
    { id: 'push', label: 'Push Notifications', enabled: true },
    { id: 'debate', label: 'Debate Updates', enabled: true },
    { id: 'workflow', label: 'Workflow Alerts', enabled: false }
  ],
  security: [
    { id: '2fa', label: 'Two-Factor Authentication', enabled: true },
    { id: 'session', label: 'Auto-lock Session', enabled: true, value: '15 minutes' },
    { id: 'history', label: 'Activity History', enabled: true },
    { id: 'audit', label: 'Audit Logs', enabled: false }
  ],
  appearance: [
    { id: 'theme', label: 'Color Theme', value: 'Blue9 Dark', type: 'select' },
    { id: 'accent', label: 'Accent Color', value: 'Blue', type: 'select' },
    { id: 'font', label: 'Font Size', value: 'Medium', type: 'select' },
    { id: 'animations', label: 'Animations', enabled: true }
  ],
  storage: [
    { id: 'local', label: 'Local Storage', value: '2.4 GB used of 10 GB' },
    { id: 'sync', label: 'Auto-sync', enabled: true },
    { id: 'backup', label: 'Auto-backup', enabled: true, value: 'Daily' },
    { id: 'obsidian', label: 'Obsidian Sync', enabled: false }
  ],
  providers: [
    { id: 'openai', name: 'OpenAI', status: 'active', model: 'gpt-4' },
    { id: 'claude', name: 'Claude', status: 'active', model: 'claude-3-sonnet' },
    { id: 'gemini', name: 'Gemini', status: 'inactive', model: 'gemini-pro' },
    { id: 'ollama', name: 'Ollama', status: 'active', model: 'llama3' }
  ]
}
</script>

<template>
  <div class="flex gap-6">
    <div class="w-64 bg-slate-800 rounded-xl border border-slate-700 p-4">
      <h3 class="text-sm font-semibold text-white mb-4">Settings</h3>
      <ul class="space-y-1">
        <li v-for="section in sections" :key="section.id">
          <button
            @click="activeSection = section.id"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            :class="[
              activeSection === section.id
                ? 'bg-blue9-600 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            ]"
          >
            <component :is="section.icon" class="w-5 h-5" />
            <span class="font-medium">{{ section.label }}</span>
            <ChevronRight v-if="activeSection === section.id" class="w-4 h-4 ml-auto" />
          </button>
        </li>
      </ul>
    </div>

    <div class="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-white">{{ sections.find(s => s.id === activeSection)?.label }}</h2>
          <p class="text-slate-400 mt-1">Configure your {{ activeSection }} settings</p>
        </div>
        <button class="px-4 py-2 bg-blue9-600 hover:bg-blue9-700 text-white rounded-lg transition-colors">
          Save Changes
        </button>
      </div>

      <div v-if="activeSection === 'general'" class="space-y-4">
        <div
          v-for="setting in settings.general"
          :key="setting.id"
          class="p-4 bg-slate-700/50 rounded-lg"
        >
          <label class="text-sm text-slate-400 mb-2 block">{{ setting.label }}</label>
          <input
            v-if="setting.type === 'text'"
            :value="setting.value"
            class="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue9-500"
          />
          <select
            v-else
            :value="setting.value"
            class="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue9-500"
          >
            <option v-if="setting.label === 'Theme'">Dark</option>
            <option v-if="setting.label === 'Theme'">Light</option>
            <option v-if="setting.label === 'Language'">English</option>
            <option v-if="setting.label === 'Language'">Spanish</option>
            <option v-if="setting.label === 'Language'">French</option>
          </select>
        </div>
      </div>

      <div v-else-if="activeSection === 'notifications'" class="space-y-4">
        <div
          v-for="setting in settings.notifications"
          :key="setting.id"
          class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
        >
          <div>
            <h4 class="font-medium text-white">{{ setting.label }}</h4>
            <p class="text-sm text-slate-400">Receive {{ setting.label.toLowerCase() }}</p>
          </div>
          <button
            :class="[
              'w-12 h-6 rounded-full transition-colors relative',
              setting.enabled ? 'bg-blue9-600' : 'bg-slate-600'
            ]"
          >
            <div
              :class="[
                'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all',
                setting.enabled ? 'left-6' : 'left-0.5'
              ]"
            ></div>
          </button>
        </div>
      </div>

      <div v-else-if="activeSection === 'security'" class="space-y-4">
        <div
          v-for="setting in settings.security"
          :key="setting.id"
          class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
        >
          <div>
            <h4 class="font-medium text-white">{{ setting.label }}</h4>
            <p v-if="setting.value" class="text-sm text-slate-400">{{ setting.value }}</p>
          </div>
          <button
            :class="[
              'w-12 h-6 rounded-full transition-colors relative',
              setting.enabled ? 'bg-blue9-600' : 'bg-slate-600'
            ]"
          >
            <div
              :class="[
                'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all',
                setting.enabled ? 'left-6' : 'left-0.5'
              ]"
            ></div>
          </button>
        </div>
      </div>

      <div v-else-if="activeSection === 'appearance'" class="space-y-4">
        <div
          v-for="setting in settings.appearance"
          :key="setting.id"
          class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
        >
          <div>
            <h4 class="font-medium text-white">{{ setting.label }}</h4>
            <p v-if="setting.value" class="text-sm text-slate-400">{{ setting.value }}</p>
          </div>
          <select
            v-if="setting.type === 'select'"
            :value="setting.value"
            class="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue9-500"
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <button
            v-else
            :class="[
              'w-12 h-6 rounded-full transition-colors relative',
              setting.enabled ? 'bg-blue9-600' : 'bg-slate-600'
            ]"
          >
            <div
              :class="[
                'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all',
                setting.enabled ? 'left-6' : 'left-0.5'
              ]"
            ></div>
          </button>
        </div>
      </div>

      <div v-else-if="activeSection === 'storage'" class="space-y-4">
        <div
          v-for="setting in settings.storage"
          :key="setting.id"
          class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
        >
          <div>
            <h4 class="font-medium text-white">{{ setting.label }}</h4>
            <p v-if="setting.value" class="text-sm text-slate-400">{{ setting.value }}</p>
          </div>
          <button
            v-if="typeof setting.enabled !== 'undefined'"
            :class="[
              'w-12 h-6 rounded-full transition-colors relative',
              setting.enabled ? 'bg-blue9-600' : 'bg-slate-600'
            ]"
          >
            <div
              :class="[
                'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all',
                setting.enabled ? 'left-6' : 'left-0.5'
              ]"
            ></div>
          </button>
          <div v-else class="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
            <div class="w-3/5 h-full bg-blue9-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div v-else-if="activeSection === 'providers'" class="space-y-4">
        <div
          v-for="provider in settings.providers"
          :key="provider.id"
          class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue9-500 to-blue9-700 rounded-xl flex items-center justify-center">
              <Globe class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="font-medium text-white">{{ provider.name }}</h4>
              <p class="text-sm text-slate-400">{{ provider.model }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span :class="[
              'px-3 py-1 text-xs rounded-full',
              provider.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'
            ]">{{ provider.status }}</span>
            <button v-if="provider.status === 'active'" class="p-2 hover:bg-slate-600 rounded-lg">
              <Check class="w-5 h-5 text-green-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>