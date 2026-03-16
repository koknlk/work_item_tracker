# Work Item Tracker

A full-stack Work Item Tracker application with .NET 8 backend and Next.js 13/14 frontend. Users can manage work items: list, create, update, delete, filter, and sort. JWT authentication protects the API and frontend routes.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Running with Docker Compose](#running-with-docker-compose)  
  - [Running Locally](#running-locally)  
- [Environment Variables](#environment-variables)  
- [Authentication](#authentication)  
- [API Endpoints](#api-endpoints)  
- [Frontend Routes](#frontend-routes)  

---

## Features

- Work Item with `Id`, `Title`, `Description`, `Status`, and `Creation Date`  
- List all work items  
- View a single work item  
- Add, update, delete work items  
- Filter and sort by status or creation date  
- JWT-based authentication  
- Protected routes in frontend  

---

## Tech Stack

- **Backend:** .NET 8, C#, Kestrel, JWT Authentication  
- **Frontend:** Next.js 13/14, React, TypeScript  
- **Containerization:** Docker, Docker Compose  
- **State Management:** Local React hooks  
- **API Communication:** Fetch + Bearer token  

---

## Folder Structure 
```
work_item_tracker/
├─ WorkItemTracker/ # Backend solution
│ ├─ WorkItemTracker.API/ # Web API project
│ ├─ WorkItemTracker.Application/ # Application layer
│ ├─ WorkItemTracker.Domain/ # Domain entities & enums
│ ├─ WorkItemTracker.Infrastructure/# Repositories
│ └─ WorkItemTracker.sln
├─ workitemtracker-frontend/ # Next.js frontend
│ ├─ app/
│ ├─ services/
│ ├─ types/
│ └─ hooks/
├─ docker-compose.yaml
└─ README.md ```
---

## Getting Started

### Prerequisites

- Docker & Docker Compose installed  
- Node.js 20+ (if running frontend locally)  
- .NET 8 SDK (if running backend locally)

---

### Running with Docker Compose

1. Build and start both backend and frontend:

```bash
docker-compose up --build

Open your browser:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/v1

Frontend communicates with backend via the container name backend (Docker internal network).

Stop containers:

docker-compose down