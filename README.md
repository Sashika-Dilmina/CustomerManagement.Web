# Customer Management Web Application

A Customer Management frontend built using **ASP.NET Core MVC**, **Razor Views**, **Knockout.js**, **Bootstrap 5**, and **jQuery AJAX**. This application consumes the Customer Management REST API and provides a complete Customer CRUD (Create, Read, Update, Delete) experience through a server-side proxy architecture.

---

## Project Overview

This project serves as a frontend application for the Customer Management API. Unlike modern SPA frameworks such as Angular or React, this solution follows a traditional enterprise architecture using ASP.NET Core MVC and Razor while enhancing the user experience with Knockout.js MVVM data binding.

The application allows users to:

- View all customers
- Create new customers
- Edit existing customers
- Delete customers
- Validate form inputs
- Manage customer status (Active/Inactive)

---

## Technology Stack

| Technology | Purpose |
|------------|----------|
| ASP.NET Core MVC (.NET 8) | Web application framework |
| Razor Views | Server-side page rendering |
| Bootstrap 5 | UI styling and responsive layout |
| Knockout.js | MVVM data binding |
| jQuery AJAX | Client-server communication |
| HttpClient | API communication |
| LibMan | Client-side library management |

---

## Architecture

The application follows a proxy-based architecture:

```text
Browser
   │
   ▼
ASP.NET Core MVC Application
   │
   ▼
Customer Management API
   │
   ▼
Database
```

### Why Use a Proxy Layer?

The browser never communicates directly with the API.

Instead:

1. Browser sends AJAX requests to MVC Controllers.
2. MVC Controllers forward requests to the API through a typed HttpClient.
3. API processes requests and returns responses.
4. MVC application returns JSON back to the browser.

### Benefits

- Eliminates CORS issues
- Centralizes API communication
- Improved security
- Easier maintenance
- Clean separation of concerns

---

## Features

### Customer Management

- Display customer list
- Create customer
- Update customer
- Delete customer
- View customer status

### Validation

- Required customer name
- Required date of birth
- Email format validation
- Maximum length validation

### User Interface

- Bootstrap responsive layout
- Bootstrap modal forms
- Dynamic table updates
- Loading indicators
- Error handling messages

---

## Project Structure

```text
CustomerManagement.Web
│
├── Controllers
│   └── CustomersController.cs
│
├── Models
│   ├── CustomerDto.cs
│   └── CustomerSaveDto.cs
│
├── Services
│   ├── ICustomerApiClient.cs
│   └── CustomerApiClient.cs
│
├── Views
│   ├── Customers
│   │   └── Index.cshtml
│   │
│   └── Shared
│       └── _Layout.cshtml
│
├── wwwroot
│   ├── js
│   │   └── customers.js
│   │
│   └── lib
│       ├── bootstrap
│       ├── jquery
│       └── knockout
│
├── appsettings.json
├── Program.cs
└── libman.json
```

---

## Core Components

### Models

#### CustomerDto

Represents customer data returned by the API.

#### CustomerSaveDto

Represents customer data sent to the API during create and update operations.

---

### Service Layer

#### ICustomerApiClient

Defines API operations:

- GetAllAsync()
- GetByIdAsync()
- CreateAsync()
- UpdateAsync()
- DeleteAsync()

#### CustomerApiClient

Implements API communication using HttpClient.

Responsibilities:

- Send HTTP requests
- Receive API responses
- Deserialize JSON data
- Handle API interaction

---

### Controller Layer

#### CustomersController

Acts as a proxy between the frontend and backend API.

Available Actions:

| Action | Method | Description |
|----------|----------|-------------|
| Index | GET | Returns customer page |
| List | GET | Returns all customers |
| Get | GET | Returns customer by ID |
| Create | POST | Creates a customer |
| Update | PUT | Updates a customer |
| Delete | DELETE | Deletes a customer |

---

### View Layer

#### Razor View

File:

```text
Views/Customers/Index.cshtml
```

Contains:

- Customer table
- Create/Edit modal
- Knockout bindings
- Bootstrap components

---

### Knockout.js ViewModel

File:

```text
wwwroot/js/customers.js
```

Responsible for:

- Managing UI state
- Handling AJAX requests
- Form validation
- Modal interactions
- Data binding

Key concepts used:

```javascript
ko.observable()
ko.observableArray()
ko.applyBindings()
```

---

## MVVM Pattern

The application uses the MVVM (Model-View-ViewModel) pattern.

```text
Model
  │
  ▼
ViewModel
  │
  ▼
View
```

### Model

Customer data received from API.

### ViewModel

Knockout.js object that contains:

- Observables
- AJAX logic
- Validation rules

### View

HTML rendered through Razor with Knockout bindings.

---

## CRUD Workflow

### Create

```text
User
 ▼
Open Modal
 ▼
Enter Details
 ▼
AJAX POST
 ▼
MVC Controller
 ▼
API Client
 ▼
Customer API
 ▼
Database
```

### Read

```text
Page Load
 ▼
AJAX GET
 ▼
Controller
 ▼
API
 ▼
Display Customers
```

### Update

```text
Edit Customer
 ▼
Update Fields
 ▼
AJAX PUT
 ▼
Controller
 ▼
API
 ▼
Database
```

### Delete

```text
Delete Button
 ▼
AJAX DELETE
 ▼
Controller
 ▼
API
 ▼
Database
```

---

## Configuration

### API Base URL

Configure the API endpoint inside:

```json
{
  "CustomerApi": {
    "BaseUrl": "https://localhost:7123/"
  }
}
```

> Ensure the URL ends with a trailing slash (/).

---

## Running the Application

### Prerequisites

- Visual Studio 2022
- .NET 8 SDK
- Customer Management API
- Trusted HTTPS Development Certificate

Verify SDK:

```bash
dotnet --version
```

Trust certificate:

```bash
dotnet dev-certs https --trust
```

---

### Start the API

```bash
dotnet run --project CustomerManagement.API
```

---

### Start the MVC Application

```bash
dotnet run
```

or

Press:

```text
F5
```

in Visual Studio.

---

## Testing

### Create Customer

1. Click "New Customer"
2. Enter details
3. Save
4. Verify new record appears

### Update Customer

1. Click Edit
2. Modify details
3. Save
4. Verify changes

### Delete Customer

1. Click Delete
2. Confirm action
3. Verify record removed

### Validation

Test:

- Empty customer name
- Empty date of birth
- Invalid email address

Expected result:

Validation messages displayed and request blocked.

---

## Common Issues

### API Calls Return 404

Check:

```json
CustomerApi:BaseUrl
```

Ensure trailing slash exists.

---

### SSL Error

Run:

```bash
dotnet dev-certs https --trust
```

---

### POST/PUT Returns 415

Verify:

```javascript
contentType: "application/json"
```

and

```javascript
JSON.stringify(payload)
```

are present.

---

### Knockout Bindings Not Working

Verify:

```html
<script src="~/lib/knockout/knockout-min.js"></script>
```

is correctly loaded.

---

## Learning Outcomes

Through this project, the following concepts were implemented and practiced:

- ASP.NET Core MVC
- Razor Views
- Dependency Injection
- Typed HttpClient
- Service Layer Pattern
- Knockout.js MVVM
- AJAX CRUD Operations
- Bootstrap UI Development
- Client-side Validation
- API Integration
- Proxy Pattern Architecture

---

## Future Enhancements

- Search and filtering
- Client-side sorting
- Pagination
- Bootstrap toast notifications
- Anti-forgery protection
- Knockout validation plugin
- Polly retry policies
- Unit testing

---

## Conclusion

This project demonstrates how a traditional ASP.NET Core MVC application can provide a modern interactive user experience using Knockout.js and AJAX while maintaining a clean enterprise architecture. By introducing a server-side proxy layer, the application avoids CORS issues and keeps API communication centralized and maintainable.

---
