# Build Project Workflow

This workflow details the commands required to install dependencies, compile, and build "The Scriptorium" Next.js project.

## Steps

1. **Verify Node.js Environment**
   Ensure Node.js v20 or later is installed:
   ```bash
   node --version
   ```

2. **Install Dependencies**
   Install all required npm packages:
   ```bash
   npm install
   ```

3. **Typecheck Code**
   Run TypeScript validation to catch potential errors:
   ```bash
   npm run typecheck
   ```

4. **Build the Application**
   Compile and bundle the Next.js application for production:
   ```bash
   npm run build
   ```
