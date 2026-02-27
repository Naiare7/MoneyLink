<script setup>
import { CURRENCIES } from '../constants/currencies'

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['continue'])

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getCountryName = (code) => {
  const currency = CURRENCIES.find(c => c.code === code)
  return currency ? currency.region : code
}
</script>

<template>
  <div class="transaction-card">
    <div class="card-header">
      <span class="status-badge">En Proceso</span>
      <span class="date">{{ formatDate(transaction.createdAt) }}</span>
    </div>
    
    <div class="card-body">
      <div class="amount-section">
        <div class="amount-sent">
          <span class="label">Envías</span>
          <span class="amount">{{ formatCurrency(transaction.amount, transaction.fromCurrency) }}</span>
        </div>
        <div class="arrow">→</div>
        <div class="amount-received">
          <span class="label">Recibe</span>
          <span class="amount highlight">{{ formatCurrency(transaction.convertedAmount, transaction.toCurrency) }}</span>
        </div>
      </div>
      
      <div class="recipient-info">
        <span class="label">Destinatario:</span>
        <span class="name">{{ transaction.recipient?.fullName || 'N/A' }}</span>
        <span class="country">({{ getCountryName(transaction.recipient?.country) }})</span>
      </div>
    </div>
    
    <div class="card-footer">
      <button class="continue-btn" @click="emit('continue')">
        Continuar Transferencia
      </button>
    </div>
  </div>
</template>

<style scoped>
.transaction-card {
  background: rgba(10, 31, 26, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 230, 118, 0.3);
  border-radius: 16px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.status-badge {
  background: rgba(0, 230, 118, 0.15);
  color: #00E676;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.date {
  color: #5a6a65;
  font-size: 0.8125rem;
}

.card-body {
  margin-bottom: 16px;
}

.amount-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.amount-sent,
.amount-received {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.label {
  color: #5a6a65;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.amount {
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: 600;
}

.amount.highlight {
  color: #00E676;
}

.arrow {
  color: #00E676;
  font-size: 1.5rem;
}

.recipient-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px solid #1a2e29;
}

.recipient-info .label {
  color: #5a6a65;
}

.recipient-info .name {
  color: #FFFFFF;
  font-weight: 500;
}

.recipient-info .country {
  color: #A0A0A0;
  font-size: 0.875rem;
}

.card-footer {
  display: flex;
  justify-content: center;
}

.continue-btn {
  background: #00E676;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.continue-btn:hover {
  background: #00C853;
  transform: translateY(-1px);
}
</style>
