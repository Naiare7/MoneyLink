<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { authService } from './services/authService'

const isAuthenticated = ref(false)
const currentUser = ref(null)

const checkAuth = () => {
  isAuthenticated.value = authService.isAuthenticated()
  if (isAuthenticated.value) {
    currentUser.value = authService.getCurrentUser()
  }
}

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-brand">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">💸</span>
          <span class="logo-text">MoneyLink</span>
        </RouterLink>
      </div>
      
      <div class="navbar-links">
        <RouterLink to="/converter" class="nav-link">Simulator</RouterLink>
        <a href="#" class="nav-link">Markets</a>
        <a href="#" class="nav-link">Rates</a>
        <RouterLink v-if="isAuthenticated" to="/dashboard" class="nav-link">Dashboard</RouterLink>
      </div>
      
      <div class="navbar-auth">
        <template v-if="isAuthenticated">
          <span class="user-name">{{ currentUser?.fullName?.split(' ')[0] }}</span>
          <RouterLink to="/dashboard" class="dashboard-link">Mi Cuenta</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login" class="auth-link">Log In</RouterLink>
          <RouterLink to="/register" class="auth-button">Sign Up</RouterLink>
        </template>
      </div>
    </nav>

    <main class="main-content">
      <RouterView @auth-change="checkAuth" />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #020b08;
  color: #FFFFFF;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #0a1f1a;
  border-bottom: 1px solid #1a2e29;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
}

.navbar-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #A0A0A0;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #00E676;
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 24px;
}

.auth-link {
  color: #A0A0A0;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: #FFFFFF;
}

.auth-button {
  background: #00E676;
  color: #000000;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.auth-button:hover {
  background: #00C853;
  transform: translateY(-1px);
}

.user-name {
  color: #A0A0A0;
  font-size: 0.875rem;
}

.dashboard-link {
  color: #00E676;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.dashboard-link:hover {
  color: #00C853;
}

.main-content {
  flex: 1;
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 16px;
  }
  
  .navbar-links {
    display: none;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}
</style>
