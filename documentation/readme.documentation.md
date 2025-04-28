# 📬 API Usage Guide (DumboHealth Postman Collection)

This guide explains how to use the Postman collection provided to interact with the DumboHealth Edge Functions.

## 🔧 How to Use

1. Import the collection into Postman.

2. Set the following environment variables manually in Postman:

   - lambda_login_url → Your Supabase project URL (example: https://yourproject.supabase.co)
   - lambda_patients_url → Same as your Supabase project URL

3. Run the login request.
4. Run the patient-verify request (the token is automatically injected).

### 1. `POST /auth/login`

**Purpose**:  
Authenticate a staff user and obtain an access token.

**Request**:

```json
POST {{lambda_login_url}}/functions/v1/auth/login
Content-Type: application/json
Body:
{
  "email": "staff@example.com",
  "password": "123456"
}
```

### 1. `POST /patients/verify`

**Purpose**:  
Verify a patient's insurance calling third party api.

**Request**:

```json
POST {{lambda_patients_url}}/functions/v1/patients/verify
Authorization: Bearer {{auth_access_token}}
Content-Type: application/json
Body:
{
  "email": "dm@dumbo.health",
  "insurance_id": "3eae6243-dc23-4b6c-b561-16b6e2822b8f" --> use this insurance_id
}
```
