<script setup lang="ts">
import { Search, Bell, Plus } from 'lucide-vue-next'
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
    <div class="flex items-center gap-4">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search agents, teams, knowledge..."
          class="w-80 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue9-500 transition-colors"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2 px-4 py-2 bg-blue9-600 hover:bg-blue9-700 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Task</span>
      </button>

      <button class="relative p-2 hover:bg-slate-700 rounded-lg transition-colors">
        <Bell class="w-5 h-5 text-slate-300" />
        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </div>
  </header>
</template>