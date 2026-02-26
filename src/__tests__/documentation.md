# MoneyLink - Documentation

## Completed Tasks Summary

### US-001: Currency Converter (TK-001-01 to TK-001-11)
✅ Completed in previous session

### US-002: Authentication (TK-002-01 to TK-002-09)
✅ Completed in previous session

### US-003: Proceso de envío de divisas (TK-003-01 a TK-003-07)
✅ TK-003-01: Crear formulario para datos del destinatario y checkbox de destinatario frecuente
✅ TK-003-02: Crear formulario para los datos del remitente
✅ TK-003-03: Implementar apartado de selección de método de pago
✅ TK-003-04: Desarrollar vista de resumen (montos, exchange, tarifas) y botón de continuar
✅ TK-003-05: Lógica de validación de datos del destinatario y cálculo en tiempo real
✅ TK-003-06: Crear test E2E para validar flujos de transferencia
✅ TK-003-07: Crear test MCP para validar flujos de transferencia

### US-004: Dashboard de transacciones (TK-004-01 a TK-004-09)
✅ TK-004-01: Diseñar interfaz del dashboard
✅ TK-004-02: Implementar servicio de consulta de transacción en curso
✅ TK-004-03: Implementar servicio de historial de transacciones
✅ TK-004-04: Implementar consulta de destinatarios frecuentes
✅ TK-004-05: Desarrollar vista del dashboard
✅ TK-004-06: Implementar navegación a flujo de nueva transacción
✅ TK-004-07: Pruebas funcionales y de integración

---

## AuthView Component - Documentation

### Overview

This documentation covers the authentication components created for the MoneyLink project (Tasks TK-002-01 through TK-002-09).

### Files Created/Modified

| File | Action | Description |
|------|--------|-------------|
| `src/services/authService.js` | Created | Authentication service with login, register, logout, and transfer data storage |
| `src/views/AuthView.vue` | Created | Main authentication view with login/register forms |
| `src/views/TransferView.vue` | Created | Placeholder view for transfer confirmation |
| `src/router/index.js` | Modified | Added routes: `/login`, `/register`, `/transfer` |
| `src/components/CurrencyConverter.vue` | Modified | Added transfer data storage before redirect |
| `src/App.vue` | Modified | Updated navbar links to use router |
| `src/__tests__/AuthView.spec.js` | Created | E2E tests for authentication flows |
| `src/__tests__/AuthService.spec.js` | Created | MCP tests for auth service |

### Features Implemented

#### Login Form
- Email input with validation
- Password input
- Error handling for invalid credentials
- Success message on successful login

#### Registration Form
- Full name input
- Email input with validation
- Password input (minimum 8 characters)
- Confirm password input
- ID Number input (National ID, minimum 5 characters)
- Error handling for validation failures

#### Transfer Data Flow
- Transfer data saved to localStorage when executing transfer
- Transfer data retrieved on login/register
- Redirect to `/transfer` after authentication with saved data

### Validation Rules

| Field | Rule |
|-------|------|
| Email | Required, valid email format |
| Password (login) | Required |
| Password (register) | Required, minimum 8 characters |
| Confirm Password | Must match password |
| Full Name | Required, minimum 2 characters |
| ID Number | Required, minimum 5 characters |

### Error Messages

- Email is required
- Invalid email format
- Password is required
- Password must be at least 8 characters
- Passwords do not match
- Full name is required
- ID number is required
- ID number must be at least 5 characters
- Invalid credentials
- Email already exists

### Glassmorphism Styles

Applied to:
- AuthView.vue
- CurrencyConverter.vue
- TransferView.vue

Style: `backdrop-filter: blur(10px)` with semi-transparent backgrounds

### Testing

Run tests with:
```bash
npm run test:unit
```

All 42 tests passing:
- 17 AuthService tests (MCP)
- 25 AuthView tests (E2E)

### Mock Users

For testing:
- Email: `test@example.com`
- Password: `password123`

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirects to `/converter` | Home |
| `/converter` | ConverterView | Currency converter |
| `/login` | AuthView | Login form |
| `/register` | AuthView | Registration form |
| `/transfer` | TransferView | Transfer confirmation (placeholder) |

### Design Decisions

1. **Service-based architecture**: Authentication logic in separate service
2. **LocalStorage**: Used for session and transfer data persistence
3. **Form validation**: Client-side validation before submission
4. **Error handling**: Clear error messages for each validation failure
5. **Glassmorphism**: Applied following project design system
6. **Mobile-first**: Responsive design for all views
