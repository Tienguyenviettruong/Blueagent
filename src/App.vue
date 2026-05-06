<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="flex h-screen bg-[#0a0a0a]">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-auto bg-[#0a0a0a]">
        <router-view />
      </main>
    </div>
  </div>
</template>
