# ContactApp — Full-Stack Contact Management (Google Contacts Clone)

## Tech Stack
- **Backend**: ASP.NET Core 8, EF Core, SQL Server, Clean Architecture
- **Frontend**: Angular 20, Angular Material, Reactive Forms, Signals

---

## Folder Structure

```
ContactApp/
├── Backend/
│   ├── ContactApp.sln
│   ├── ContactApp.Core/
│   │   ├── Entities/Contact.cs
│   │   ├── DTOs/ContactDtos.cs
│   │   └── Interfaces/IContactRepository.cs
│   ├── ContactApp.Infrastructure/
│   │   ├── Data/AppDbContext.cs
│   │   └── Repositories/ContactRepository.cs
│   └── ContactApp.API/
│       ├── Controllers/ContactsController.cs
│       ├── Middleware/ExceptionMiddleware.cs
│       ├── Program.cs
│       └── appsettings.json
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── shell/             ← Main layout (sidebar + list + detail)
│   │   │   │   ├── contact-detail/    ← Right panel
│   │   │   │   ├── contact-form/      ← Add/Edit dialog
│   │   │   │   └── confirm-dialog/    ← Delete confirmation
│   │   │   ├── models/contact.model.ts
│   │   │   ├── services/contact.service.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   │   ├── environments/environment.ts
│   │   ├── styles.scss
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── sql_schema.sql
```

---

## API Endpoints

| Method | URL                    | Description         |
|--------|------------------------|---------------------|
| GET    | /api/contacts          | Get all (+ search)  |
| GET    | /api/contacts/{id}     | Get by ID           |
| POST   | /api/contacts          | Create contact      |
| PUT    | /api/contacts/{id}     | Update contact      |
| DELETE | /api/contacts/{id}     | Delete contact      |

Query param: `GET /api/contacts?search=john`

---

## Database Setup

### Option A — EF Core Migrations (recommended)
```bash
cd Backend/ContactApp.API

# Install EF tools if not already
dotnet tool install --global dotnet-ef

# Create migration
dotnet ef migrations add InitialCreate --project ../ContactApp.Infrastructure --startup-project .

# Apply migration (creates DB + table)
dotnet ef database update --project ../ContactApp.Infrastructure --startup-project .
```

### Option B — Manual SQL
Run `sql_schema.sql` in SQL Server Management Studio or Azure Data Studio.

---

## Steps to Run Backend

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- SQL Server (local or SQL Express)

### 1. Update connection string
Open `Backend/ContactApp.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ContactAppDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```
Change `Server=localhost` to your SQL Server instance name (e.g., `.\SQLEXPRESS`).

### 2. Run migrations
```bash
cd Backend
dotnet ef migrations add InitialCreate --project ContactApp.Infrastructure --startup-project ContactApp.API
dotnet ef database update --project ContactApp.Infrastructure --startup-project ContactApp.API
```

### 3. Run the API
```bash
cd Backend/ContactApp.API
dotnet run
```
API runs at: `https://localhost:7001` (or `http://localhost:5001`)
Swagger UI: `https://localhost:7001/swagger`

---

## Steps to Run Frontend

### Prerequisites
- Node.js 18+
- Angular CLI 20: `npm install -g @angular/cli@20`

### 1. Install dependencies
```bash
cd Frontend
npm install
```

### 2. Verify API URL
Open `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'  // must match your backend port
};
```

### 3. Run Angular dev server
```bash
ng serve
```
App runs at: `http://localhost:4200`

---

## Features Implemented
- ✅ Full CRUD (Create, Read, Update, Delete)
- ✅ Google Contacts-style 3-panel layout (sidebar, list, detail)
- ✅ Search contacts by name/email/phone
- ✅ Add/Edit dialog with Reactive Forms + validation
- ✅ Confirm dialog before delete
- ✅ Snackbar notifications (success/error)
- ✅ Loading spinner
- ✅ Profile initials avatar with color coding
- ✅ Favorite badge
- ✅ Responsive layout
- ✅ Angular standalone components + signals
- ✅ Clean Architecture backend
- ✅ Repository pattern
- ✅ Global exception middleware
- ✅ Swagger/OpenAPI
- ✅ CORS enabled
- ✅ EF Core with migrations
- ✅ DTOs + Data Annotations validation

---

## Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error | Ensure backend is running & `apiUrl` matches port |
| DB connection error | Check SQL Server instance name in `appsettings.json` |
| Migration error | Run from `ContactApp.API` directory, not solution root |
| Angular material not styled | Ensure `styles.scss` imports the prebuilt theme |
