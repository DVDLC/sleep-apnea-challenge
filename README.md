# DumboHealth - Supabase Edge Functions

This repository contains the Edge Functions developed for the DumboHealth technical assessment.

## 🚀 Tech Stack

- Supabase (PostgreSQL, Auth, Storage)
- Deno Deploy (Edge Functions)
- TypeScript
- Docker (for local development)
- Supabase CLI

---

## 📋 Technical Assessment Requirements

1. **Create a Patients Microservice**:

   - Verify patient's email and insurance ID.
   - Simulate verification by calling a third-party MockAPI.

2. **Create an Authentication Microservice**:

   - Allow user registration and login.
   - Integrate with Supabase Auth.
   - Secure protected routes.

3. **Deploy Edge Functions**:
   - Deploy to Supabase Edge Runtime.
   - Provide local development and deployment instructions.

---

## ⚙️ Environment Variables

The following environment variables must be set:

| Variable               | Description                                            |
| :--------------------- | :----------------------------------------------------- |
| `SUPABASE_PROJECT_URL` | Supabase project URL                                   |
| `SUPABASE_API_KEY`     | Public API Key from Supabase                           |
| `INSURANCE_API`        | URL of the external MockAPI for insurance verification |

You can export them manually:

```bash
export SUPABASE_PROJECT_URL=https://yourproject.supabase.co
export SUPABASE_API_KEY=your_public_anon_key
export INSURANCE_API=https://mockapi.io/your-endpoint
```

## 🧪 Local Development

Install the Supabase CLI:

```bash
brew install supabase/tap/supabase
Login and link your Supabase project:
```

```bash
supabase login
supabase link --project-ref <your-project-id>
Serve the Edge Functions locally:
```

```bash
# From the project root

make serve-patients
make serve-auth
(Makefile is used for easier local development workflow.)
```

## 🛡️ Route Protection

- /patients/\* routes are protected with JWT validation (verify_jwt = true).
- /auth/\* routes are public (verify_jwt = false).

Route protection is automatically handled by Supabase Edge Runtime.

## ✅ Status Checklist

- [x] Dockerized microservices for local development
- [x] Implemented user registration and login with Supabase Auth
- [x] Insurance verification against a third-party MockAPI
- [x] Row-Level Security (RLS) policies configured
- [x] Deployment to Supabase Edge Runtime
- [ ] Maybe use kubernetes to improve apigateway configuration (future improvement)
- [ ] CI/CD Pipeline Setup (future improvement)
- [ ] Centralized Logging (future improvement)

📣 Notes

- The project uses Supabase CLI and native Deno runtime.
- No external ORMs like Prisma were used — fully Supabase-native.
- Common code (common/) is modularized to support scalable microservices.
- Validation is done using Zod schemas.
- Decorators are used for validation and error handling, keeping controllers clean.

## 🏁 Final Words

Due to Supabase Edge Functions and Deno's handling of decorators, some runtime limitations apply.
However, the system meets all functional requirements and is structured for production readiness.
