const TRANSACTIONS_KEY = 'moneylink_transactions'
const CURRENT_USER_KEY = 'moneylink_current_user_transactions'

export const transactionService = {
  getTransactions() {
    const user = JSON.parse(localStorage.getItem('moneylink_auth'))
    if (!user) return []
    
    const data = localStorage.getItem(`${CURRENT_USER_KEY}_${user.id}`)
    return data ? JSON.parse(data) : []
  },

  getTransactionById(id) {
    const transactions = this.getTransactions()
    return transactions.find(t => t.id === id)
  },

  saveTransaction(transaction) {
    const user = JSON.parse(localStorage.getItem('moneylink_auth'))
    if (!user) return null
    
    const transactions = this.getTransactions()
    
    const newTransaction = {
      ...transaction,
      id: String(Date.now()),
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: 'completed'
    }
    
    transactions.unshift(newTransaction)
    
    localStorage.setItem(
      `${CURRENT_USER_KEY}_${user.id}`, 
      JSON.stringify(transactions)
    )
    
    return newTransaction
  },

  deleteTransaction(id) {
    const user = JSON.parse(localStorage.getItem('moneylink_auth'))
    if (!user) return
    
    const transactions = this.getTransactions()
    const filtered = transactions.filter(t => t.id !== id)
    
    localStorage.setItem(
      `${CURRENT_USER_KEY}_${user.id}`, 
      JSON.stringify(filtered)
    )
  },

  getRecentTransactions(limit = 5) {
    const transactions = this.getTransactions()
    return transactions.slice(0, limit)
  },

  getTransactionsByDateRange(startDate, endDate) {
    const transactions = this.getTransactions()
    return transactions.filter(t => {
      const txDate = new Date(t.createdAt)
      return txDate >= startDate && txDate <= endDate
    })
  },

  getTotalSent(fromCurrency) {
    const transactions = this.getTransactions()
    return transactions
      .filter(t => t.fromCurrency === fromCurrency)
      .reduce((sum, t) => sum + t.amount, 0)
  },

  simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, 200))
  }
}

export default transactionService
