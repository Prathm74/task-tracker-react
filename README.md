Task Tracker – React + TypeScript

A production-ready Task Tracker application built using React 18, TypeScript, and modern frontend tooling, demonstrating clean architecture, state management, form handling, optimistic updates, and testing best practices.

Features
1. Core Functionality

CRUD Tasks (Create, Read, Update, Delete)

Edit & Cancel functionality using a reusable form

Filter tasks by status

Sort tasks by priority

Client-side pagination

Empty state handling with clear call-to-action

2. Authentication

Mock login system

Protected routes using React Router

Auth state persisted via LocalStorage

3. UX & Performance

Optimistic UI updates with rollback on failure

User-friendly error handling

Clean UX flow (form-focused editing)

Reusable and scalable component design

4. Quality & Reliability

Unit and integration tests using Vitest + React Testing Library

Async-safe testing with user-event

Clean code structure and separation of concerns

Tech Stack
Category	Technology
Frontend	React 18, TypeScript
Build Tool	Vite
Routing	React Router v6
State Management	Zustand
Forms & Validation	React Hook Form + Zod
UI Library	Material UI (MUI)
Testing	Vitest, React Testing Library
Persistence	LocalStorage (Mock API)

Project Folder Structure

src/
├─ app/
│  └─ router.tsx
├─ auth/
│  ├─ authService.ts
│  ├─ useAuthStore.ts
│  └─ ProtectedRoute.tsx
├─ tasks/
│  ├─ taskTypes.ts
│  ├─ taskApi.ts
│  ├─ useTaskStore.ts
│  └─ components/
│     ├─ TaskForm.tsx
│     ├─ TaskList.tsx
│     └─ StatusPill.tsx
├─ pages/
│  ├─ LoginPage.tsx
│  └─ NotFoundPage.tsx
├─ tests/
│  ├─ ProtectedRoute.test.tsx
│  ├─ TaskForm.test.tsx
│  └─ TaskList.test.tsx
└─ main.tsx

Login Credentials
Username: admin
Password: admin

Getting Started
1️. Install Dependencies
npm install
2. Run Development Server
npm run dev

Running Tests
npm run test
