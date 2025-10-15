# 🛡️ Insurance Quote System - Server-Driven UI

A modern **Proof of Concept (POC)** demonstrating **Server-Driven UI** architecture applied to an insurance quote system. The frontend dynamically renders forms based on JSON schemas returned by the backend, allowing new products to be added and flows modified without changing client code.

> 🎯 **POC Objective**: Validate the feasibility of a Server-Driven UI architecture for multi-product insurance quote systems, where business rules, validations, and form structure are controlled by the backend.

---

## ✨ Features

### 🎯 Server-Driven UI

- **Completely product-agnostic frontend**
- **JSON schemas** define form structure
- **Dynamic validations** based on backend rules
- **Conditional fields** (showIf) controlled by JSON
- **Dependent fields** with dynamic option loading
- **End-to-end type-safety** with TypeScript

### 📋 Multi-Step System

- **4 fixed steps** for all products:
  1. **Initial Data** - Insured's CPF (common to all)
  2. **Additional Data** - Personal information + product-specific fields
  3. **Offers** - Cards with plans, coverage, prices, and services
  4. **Summary** - Complete view before submission

- **Navigation between steps** with validation

### 🦺 Insurance Products

**Auto Insurance:**

- Specific fields: Driver's license, License plate, Vehicle brand/model, Tracker
- 3 plans: Basic, Intermediate, Premium
- Coverage varies based on plan
- Additional discount for vehicles with tracker

**Home Insurance:**

- Specific fields: ZIP code, Property type, Total area, Alarm
- 3 plans: Essential, Complete, Total
- Coverage for structure and contents
- Additional discount for properties with alarm

### 🔧 Technical Features

- **Input masks** (CPF, phone, license plate, ZIP code)
- **Validation with Zod** dynamically generated
- **Loading states** in all asynchronous operations
- **Error boundaries** for error handling
- **Responsive design** mobile-first
- **Accessibility** with ARIA labels
- **Latency simulation** configurable in backend

---

## 🗂️ Project Structure

```
insurance-quote/
├── apps/
│   ├── web/                           # React Application
│   │   ├── src/
│   │   │   ├── features/              # Organization by features
│   │   │   │   └── cotacao/           # Quote feature
│   │   │   │       ├── components/    # UI Components
│   │   │   │       │   ├── fields/    # Field components
│   │   │   │       │   ├── ProductSelector.tsx
│   │   │   │       │   ├── StepWizard.tsx
│   │   │   │       │   ├── DynamicForm.tsx
│   │   │   │       │   ├── OffersStep.tsx
│   │   │   │       │   └── SummaryStep.tsx
│   │   │   │       ├── hooks/         # Custom hooks
│   │   │   │       ├── context/       # React Context
│   │   │   │       ├── lib/           # Utilities
│   │   │   │       └── pages/         # Pages
│   │   │   └── shared/                # Shared components
│   │   │       ├── components/        # Button, Card, etc
│   │   │       └── lib/               # API client
│   │   └── ...
│   │
│   └── server/                        # Fastify API
│       ├── src/
│       │   ├── index.ts               # Server setup
│       │   ├── routes/                # API Endpoints
│       │   │   ├── insurance.ts       # Product schemas
│       │   │   ├── offers.ts          # Offer generation
│       │   │   ├── vehicles.ts        # Vehicle data
│       │   │   └── quotes.ts          # Quote submission
│       │   ├── schemas/               # JSON configs
│       │   │   ├── auto.json          # Auto Insurance config
│       │   │   └── residencial.json   # Home Insurance config
│       │   └── services/              # Business logic
│       │       ├── schema-loader.ts   # Schema loading
│       │       ├── mock-data.ts       # Mock data
│       │       └── offers-data.ts     # Offer generation
│       └── ...
│
└── packages/
    ├── shared/                       # Shared TypeScript types
    ├── eslint-config/                # ESLint configuration
    └── typescript-config/            # TypeScript configuration
```

## 💡 The Concept: Server-Driven UI

### What is Server-Driven UI?

**Server-Driven UI** is an architectural pattern where the **backend controls** the structure, behavior, and appearance of the user interface through data (typically JSON). The frontend acts as a **generic renderer** that interprets these instructions.

### How It Works in This Project

#### 1. Backend Defines Structure

```json
{
  "productId": "auto",
  "commonFields": [
    {
      "id": "nome",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "validation": { "minLength": 3 }
    }
  ],
  "specificFields": [
    {
      "id": "cnh",
      "type": "text",
      "label": "Driver's License",
      "required": true
    }
  ]
}
```

#### 2. Frontend Interprets and Renders

The frontend receives the JSON and:

- ✅ Dynamically renders fields
- ✅ Applies real-time validations
- ✅ Manages conditional fields
- ✅ Loads options asynchronously
- ✅ Applies input masks

#### 3. Complete Flow

```
┌──────────────┐  Product: Auto
│   Backend    │  ↓
│   (Fastify)  │  Returns JSON Schema
└──────┬───────┘  ↓
       │          {
       ↓          "steps": [...]
┌──────────────┐    "fields": [...]
│   Frontend   │    "validations": [...]
│   (React)    │  }
└──────────────┘  ↓
       │          Renders form
       ↓          based on schema
  [🖥️ UI]
```

---

## 🎯 Implemented Patterns

### 1. Dynamic Validation

**Problem**: How to validate fields without knowing the structure in advance?

**Solution**: Convert JSON rules to Zod schemas at runtime.

**Backend Configuration:**

```json
{
  "id": "cpf",
  "type": "text",
  "label": "CPF",
  "required": true,
  "validation": {
    "pattern": "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
    "message": "Invalid CPF",
    "minLength": 14,
    "maxLength": 14
  }
}
```

**Frontend Converts To:**

```typescript
z.string()
  .min(1, "Required field")
  .min(14, "CPF must have 14 characters")
  .max(14, "CPF must have 14 characters")
  .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "Invalid CPF");
```

**Use Case Example:**

| User Input       | Validation            | Result                           |
| ---------------- | --------------------- | -------------------------------- |
| `123456789`      | Pattern doesn't match | ❌ "Invalid CPF"                 |
| `123.456.789-0`  | Less than minLength   | ❌ "CPF must have 14 characters" |
| `123.456.789-00` | ✓ Valid               | ✅ Field accepted                |
| ` ` (empty)      | Required field        | ❌ "Required field"              |

📍 Implementation: `apps/web/src/features/cotacao/lib/schema-to-zod.ts → fieldToZodSchema() and generateStepSchema()`

---

### 2. Input Masks and Formatting

**Problem**: How to format inputs (CPF, phone, license plate) without hardcoding in the frontend?

**Solution**: Generic mask interpreter that understands patterns sent by the backend.

**Pattern Characters:**

| Character | Meaning          | Accepts                  |
| --------- | ---------------- | ------------------------ |
| `9`       | Numeric digit    | 0-9                      |
| `A`       | Uppercase letter | A-Z                      |
| `a`       | Lowercase letter | a-z                      |
| `#`       | Alphanumeric     | A-Z, a-z, 0-9            |
| Others    | Literal          | `.` `-` `()` `/` `space` |

**Backend Configuration:**

```json
{
  "id": "telefone",
  "type": "text",
  "label": "Phone",
  "mask": "(99) 99999-9999",
  "placeholder": "(00) 00000-0000"
}
```

**Ready-to-Use Mask Examples:**

| Mask           | Pattern               | Input              | Formatted Output      |
| -------------- | --------------------- | ------------------ | --------------------- |
| CPF            | `999.999.999-99`      | `12345678900`      | `123.456.789-00`      |
| Phone          | `(99) 99999-9999`     | `11987654321`      | `(11) 98765-4321`     |
| ZIP Code       | `99999-999`           | `01310100`         | `01310-100`           |
| Mercosur Plate | `AAA-9A99`            | `ABC1D23`          | `ABC-1D23`            |
| CNPJ           | `99.999.999/9999-99`  | `12345678000195`   | `12.345.678/0001-95`  |
| Credit Card    | `9999-9999-9999-9999` | `1234567890123456` | `1234-5678-9012-3456` |

**Use Case Example - Phone:**

| User Types             | System Formats    | Displayed in Field          |
| ---------------------- | ----------------- | --------------------------- |
| `1`                    | `(1`              | `(1`                        |
| `11`                   | `(11) `           | `(11) `                     |
| `119`                  | `(11) 9`          | `(11) 9`                    |
| `1198765`              | `(11) 98765`      | `(11) 98765`                |
| `11987654321`          | `(11) 98765-4321` | `(11) 98765-4321` ✅        |
| `119876543219` (extra) | `(11) 98765-4321` | `(11) 98765-4321` (ignores) |

**How to Add New Mask:**

```json
// Backend: Add to JSON schema
{
  "id": "rg",
  "type": "text",
  "label": "ID Card",
  "mask": "99.999.999-9",
  "placeholder": "00.000.000-0"
}
```

📍 Implementation: `apps/web/src/features/cotacao/lib/masks.ts → applyMask(value, maskPattern)`

---

### 3. Conditional Fields

**Problem**: Show/hide fields based on values from other fields.

**Solution**: `showIf` directive in schema + React Hook Form `watch`.

**Backend Configuration:**

```json
{
  "id": "tipoRastreador",
  "type": "select",
  "label": "Tracker Type",
  "required": true,
  "options": [
    { "value": "bloqueador", "label": "With Blocker" },
    { "value": "localizador", "label": "Locator Only" }
  ],
  "showIf": {
    "field": "possuiRastreador",
    "equals": "sim"
  }
}
```

**How It Works:**

```typescript
// Frontend watches the 'possuiRastreador' field
const possuiRastreador = watch('possuiRastreador');

// Conditionally renders
if (possuiRastreador === 'sim') {
  return <SelectField {...tipoRastreadorProps} />
}
```

**Use Case Example:**

| User Selects             | "Tracker Type" Field |
| ------------------------ | -------------------- |
| **Has tracker?** → "No"  | 🚫 Field hidden      |
| **Has tracker?** → "Yes" | ✅ Field appears     |
| _(changes to)_ → "No"    | 🚫 Field hides again |

**Visual Flow:**

```
┌─────────────────────────────────┐
│ Has tracker?                    │
│ ○ Yes  ● No                     │  ← User selects "No"
└─────────────────────────────────┘
                                     (Field "Type" doesn't appear)

┌─────────────────────────────────┐
│ Has tracker?                    │
│ ● Yes  ○ No                     │  ← User changes to "Yes"
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ Tracker Type                    │  ← Field appears!
│ [ Select type... ▼ ]            │
└─────────────────────────────────┘
```

📍 Implementation: `apps/web/src/features/cotacao/components/FieldRenderer.tsx → shouldShow() + useWatch()`

---

### 4. Dependent Fields

**Problem**: Load options for one field based on the value of another field.

**Solution**: `dependsOn` + conditional fetch with TanStack Query.

**Backend Configuration:**

```json
{
  "id": "modelo",
  "type": "select",
  "label": "Model",
  "required": true,
  "dependsOn": "marca",
  "loadOptions": {
    "endpoint": "/api/vehicles/models",
    "params": ["marca"]
  }
}
```

**How It Works:**

```typescript
// Frontend watches the 'marca' field
const marca = watch("marca");

// Fetches models when brand changes
const { data: models } = useFieldOptions(
  "/api/vehicles/models",
  { marca },
  !!marca // Only fetches if brand is filled
);
```

**Use Case Example:**

| User Action                  | API Request                                 | Options for 'Model' field              |
| ---------------------------- | ------------------------------------------- | -------------------------------------- |
| _(initial)_                  | -                                           | `[ ]` (field disabled)                 |
| Selects brand: **"Fiat"**    | `GET /api/vehicles/models?marca=fiat`       | `["Uno", "Argo", "Toro", ...]` ✅      |
| Changes to: **"Volkswagen"** | `GET /api/vehicles/models?marca=volkswagen` | `["Gol", "Polo", "T-Cross", ...]` ✅   |
| Changes to: **"Toyota"**     | `GET /api/vehicles/models?marca=toyota`     | `["Corolla", "Hilux", "RAV4", ...]` ✅ |

📍 Implementation: `apps/web/src/features/cotacao/components/FieldRenderer.tsx + hooks/useFieldOptions.ts`

### 5. Dynamic Summary

**Problem**: How to display a summary of filled data without knowing which fields exist for each product?

**Solution**: Smart cross-reference between filled data (`stepsData`) and product schema to fetch correct labels.

**How It Works:**

```typescript
// 1. Context provides two essential pieces of information:
const { schema, stepsData } = useCotacao();

// schema = Structure with labels for each field
// stepsData = Data filled by the user

// 2. For each filled step:
Object.entries(stepsData).map(([stepId, data]) => {
  // 3. Find the step in schema
  const step = schema?.steps.find((s) => s.id === stepId);

  // 4. For each filled field, find the label
  Object.entries(data).map(([fieldId, value]) => {
    const field = step?.fields?.find((f) => f.id === fieldId);
    const label = field?.label || fieldId;

    // 5. Returns: Label + Value
    return {label}: {value}
  });
});
```

**Available Data:**

```typescript
// Backend Schema (structure)
{
  "steps": [
    {
      "id": "step-2",
      "fields": [
        { "id": "nome", "label": "Full Name" },
        { "id": "email", "label": "Email" },
        { "id": "cnh", "label": "Driver's License" }
      ]
    }
  ]
}

// Filled Data (values)
{
  "step-2": {
    "nome": "John Silva",
    "email": "john@email.com",
    "cnh": "12345678901"
  }
}
```

**Cross-reference:**

| Field ID (stepsData) | Label (schema)     | Value (stepsData) | Displayed                     |
| -------------------- | ------------------ | ----------------- | ----------------------------- |
| `nome`               | "Full Name"        | "John Silva"      | Full Name: John Silva         |
| `email`              | "Email"            | "john@email.com"  | Email: john@email.com         |
| `cnh`                | "Driver's License" | "12345678901"     | Driver's License: 12345678901 |

**Use Case Example:**

**Auto Insurance:**

```typescript
// Backend returns schema with "cnh" field
fields: [
  { id: "nome", label: "Full Name" },
  { id: "cnh", label: "Driver's License" }  // ← Specific
]

// Summary displays:
┌─────────────────────────────────┐
│ Additional Data                 │
├─────────────────────────────────┤
│ Full Name: John Silva           │
│ Email: john@email.com           │
│ Driver's License: 12345678901   │ ← Appears
└─────────────────────────────────┘
```

📍 Implementation: `apps/web/src/features/cotacao/components/SummaryStep.tsx` → `getFieldLabel()` + iteration over `stepsData`

---

## 📊 API Endpoints

### GET `/api/insurance/:productType/schema`

Returns the complete schema for a product.

**Parameters:**

- `productType`: `auto` | `residencial`

**Response:**

```json
{
  "productId": "auto",
  "productName": "Auto Insurance",
  "steps": [
    {
      "id": "step-1",
      "title": "Initial Data",
      "type": "form",
      "fields": [...]
    }
  ]
}
```

### POST `/api/offers/:productType`

Generates personalized offers based on form data.

**Body:**

```json
{
  "cpf": "123.456.789-00",
  "nome": "John Silva",
  "placa": "ABC-1D23",
  "possuiRastreador": "sim"
}
```

**Response:**

```json
{
  "offers": [
    {
      "id": "auto-basico",
      "name": "Basic Plan",
      "pricing": { ... },
      "coverages": [ ... ],
      "services": [ ... ]
    }
  ]
}
```

### GET `/api/vehicles/brands`

Lists vehicle brands.

### GET `/api/vehicles/models?marca={marca}`

Lists models for a specific brand.

### POST `/api/quotes`

Submits a complete quote.

**Body:**

```json
{
  "productType": "auto",
  "data": { ... },
  "selectedOffer": { ... }
}
```

---

### Success Criteria

| Criterion                           | Status | Note                         |
| ----------------------------------- | ------ | ---------------------------- |
| Add product without frontend code   | ✅     | JSON + backend only          |
| Dynamic validations work            | ✅     | Converted to Zod             |
| Conditional fields operational      | ✅     | showIf implemented           |
| Dependent fields load data          | ✅     | loadOptions + TanStack Query |
| Offers are personalized per product | ✅     | Calculation based on data    |
