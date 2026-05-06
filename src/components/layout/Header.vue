<script setup lang="ts">
import { Search, Bell, Plus, Command } from 'lucide-vue-next'
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <header class="h-14 bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center justify-between px-4">
    <!-- Left: Breadcrumb / Title -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-[#666]">
        <Command class="w-4 h-4" />
        <span class="text-sm">blue9</span>
      </div>
    </div>

    <!-- Center: Search -->
    <div class="flex-1 max-w-xl mx-4">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search agents, teams, knowledge..."
          class="w-full pl-9 pr-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#e5e5e5] placeholder-[#666] focus:outline-none focus:border-[#3a3a3a] transition-colors"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#666]">
          <span class="text-xs">⌘</span>
          <span class="text-xs">K</span>
        </div>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#e5e5e5] rounded-lg transition-colors text-sm border border-[#2a2a2a]">
        <Plus class="w-4 h-4" />
        <span>New</span>
      </button>

      <button class="relative p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
        <Bell class="w-5 h-5 text-[#666]" />
        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
        <span class="text-white text-sm font-medium">A</span>
      </div>
    </div>
  </header>
</template>
