# Next.js Multi-Tenant Code Assistance Platform

This platform is a modern web application built using the Next.js framework, designed to provide a comprehensive suite of code assistance tools within a multi-tenant architecture. It leverages TypeScript for type checking and an improved developer experience.

## Getting Started

To get started with this application, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-name>
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and routing.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Key Features

### User Authentication

- Separate sign-up (`components/auth/SignUpForm.tsx`) and login (`components/auth/LoginForm.tsx`) functionalities for end users and corporates.

### Multi-Tenant Architecture

- Each corporate has its isolated environment, managed through the corporate dashboard (`pages/dashboard/[corporateId].tsx`).

### User Roles and Permissions

- **End Users**: Basic access to code assistance tools.
- **Corporate Admins**: Dashboard for monitoring user activities and project progress.
- **Super Admin**: Oversight of all corporates and individual users.

### Code Assistance Tools

1. **SRS/PRD Document Generation**: Automatically generate documents from prompts using the SRS Generator (`pages/tools/srs-generator.tsx`).
2. **App Generation**: Create apps from prompts or existing documents with the App Generator (`pages/tools/app-generator.tsx`).
3. **Code Refactoring**: Utilize the Code Refactor Tool (`pages/tools/code-refactor.tsx`) for language migration and code improvements.
4. **Version Management**: Manage different versions of your code with the Version Management Tool (`pages/tools/version-management.tsx`).
5. **File Comparison**: Compare different files to track changes using the File Comparison Tool (`pages/tools/file-comparison.tsx`).
6. **Repository Documentation**: Generate comprehensive documentation for your repositories with the Repository Docs Form (`pages/tools/repository-docs.tsx`).
7. **Code Analysis**: Analyze code efficiency and get completion suggestions with the Code Analysis Tool (`pages/tools/code-analysis.tsx`).

## Shared Dependencies

- `authOptions` in `[...nextauth].ts`
- `db` in `lib/db.ts`
- `apiHandler` in `lib/api.ts`
- `validateUser` in `lib/auth.ts`
- `userRoles` and `permissions` in `types/index.d.ts`

## Data Schemas

- `User`, `Corporate`, and `Project` schemas are defined in `prisma/schema.prisma` and `types/index.d.ts`.

## Contributing

Contributions are welcome! Please read our contributing guidelines in `CONTRIBUTING.md` before submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.