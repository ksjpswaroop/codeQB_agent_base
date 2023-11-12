// User roles definition
export enum UserRole {
  END_USER = 'end_user',
  CORPORATE_ADMIN = 'corporate_admin',
  SUPER_ADMIN = 'super_admin',
}

// Permissions definition
export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  EXECUTE = 'execute',
}

// User entity type
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  corporateId?: string; // Nullable for end users, required for corporate admins
};

// Corporate entity type
export type Corporate = {
  id: string;
  name: string;
  domain: string;
  users: User[];
};

// Project entity type
export type Project = {
  id: string;
  name: string;
  description: string;
  corporateId: string;
  createdAt: Date;
  updatedAt: Date;
};