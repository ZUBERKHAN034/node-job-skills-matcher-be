# Node Job Skills Matcher (Backend)

A Node.js backend API for job skills matching application that helps match job requirements with candidate skills, providing intelligent skill analysis and recommendations.

## 🚀 Features

- RESTful API built with Node.js and Express
- TypeScript for type safety
- Layered architecture (Repository → Service → Controller → Route)
- ESLint configuration for code quality
- Prettier for code formatting
- Hot reload support with Nodemon

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.x or higher recommended)
- **npm** (comes with Node.js)
- **VS Code** (recommended IDE)

You can verify your installations by running:

```bash
node --version
npm --version
```

## 🔌 Recommended VS Code Extensions

Follow the steps given in the following link to install the extensions: [VS Code Extensions Guide](https://code.visualstudio.com/docs/introvideos/extend)

Install the following extensions:
- **Prettier** - Code formatter
- **ESLint** - JavaScript/TypeScript linting
- **Pretty TypeScript Errors** - Better TypeScript error messages
- **Error Lens** - Inline error highlighting
- **GitLens** - Git supercharged
- **Material Icon Theme** - File icons
- **Night Owl** - Color theme

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/ZUBERKHAN034/node-job-skills-matcher-be.git
```

2. **Navigate to the project directory**

```bash
cd node-job-skills-matcher-be
```

3. **Install all the packages of node**

```bash
npm install
```

## 🏃 Project Configuration

### Running the Application

To run the application for development:

```bash
npm run dev
```

The application will start on `http://localhost:8002` (default port).

## 📁 Project Structure

```
node-job-skills-matcher-be/
├── src/
│   ├── services/            # Service classes - Business logic layer
│   ├── controllers/         # Controller classes - Request validation
│   ├── routes/              # Route classes - API endpoints
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utility functions and helpers
│   └── app.ts               # Application entry point
├── dist/                    # Compiled JavaScript files
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
└── README.md                # Project documentation
```

### Architecture Guidelines

#### Service Classes
- **Location:** `src/services/`
- **Purpose:** Business logic layer
- **Naming Convention:** `{ModuleName}Service.ts` (e.g., `UserService.ts`, `UserPermissionService.ts`)
- **Rules:**
  - Service classes will contain business logic code only
  - File name should be same as model or table or module name
  - Class name must have **Service** word in it

#### Controller Classes
- **Location:** `src/controllers/`
- **Purpose:** Request validation and routing to services
- **Naming Convention:** `{ModuleName}Controller.ts` (e.g., `UserController.ts`, `UserPermissionController.ts`)
- **Rules:**
  - Create controller class for each module
  - Service class instance must be created
  - **Never create repository class directly into the controller**
  - Controller classes will contain the code for validating the request
  - After validating the request, it will send the request instance to the service class
  - File name should be same as model or table or module name
  - Class name must have **Controller** word in it

#### Route Classes
- **Location:** `src/routes/`
- **Purpose:** Define all module-related routes
- **Naming Convention:** `{ModuleName}Route.ts` (e.g., `UserRoute.ts`, `UserPermissionRoute.ts`)
- **Rules:**
  - Create controller instance
  - File name should be same as model or table or module name
  - Class name must have **Route** word in it


## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Compiles and runs the project locally with hot-reload |
| `npm run clean` | Cleans the build directory |
| `npm run compile` | Compiles the TypeScript project |
| `npm run build` | Builds the project for production |
| `npm run lint-check` | Check all ESLint issues in the project |
| `npm run prettier-format` | Format all files in the project |

## 🐛 Debugging

### Run Project Locally
To debug/run the project, use the following command. This command will compile and run the project locally:
```bash
npm run dev
```

### Clean Build
Use the following command to clean the build:
```bash
npm run clean
```

### Compile Project
Use the following command to compile the project:
```bash
npm run compile
```

### Check ESLint Issues
Use the following command to see all the ESLint issues:
```bash
npm run lint-check
```

### Format Code
Use the following command to format all the files of the project:
```bash
npm run prettier-format
```

### Build Project
To build the project for production:
```bash
npm run build
```

## 🔥 Hot Reload

### Install Nodemon (Global)
Use the following command to install nodemon (to hot reload project):
```bash
npm install -g nodemon
```

### Kill Port if Already Running
To kill port if already running:

**Linux/Mac:**
```bash
sudo kill -9 $(sudo lsof -t -i:8002)
```

**Windows (Command Prompt):**
```cmd
netstat -ano | findstr :8002
taskkill /PID <PID> /F
```

**Windows (PowerShell):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8002).OwningProcess | Stop-Process
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT = 8002

DEV_URL = 'backend_base_url_here'

JWT_SECRET = 'jwt_secret here'

CORS_ORIGIN_URL = "cors_urls_here"

GEMINI_API_KEY = "gemini_api_key_here"

FE_BASE_URL = "frontend_url_here"
```

**Note:** Never commit the `.env` file to version control. Add it to `.gitignore`.

## 🔗 API Endpoints

The APIs will be available at `http://localhost:8002/api/swagger-docs`

Example endpoints structure:
- `POST /api/job-matcher/compare-skills` - API to get job skills by job title
- `POST /api/job-matcher/parse-resume` - API to parse resume and extract skills
- `POST /api/job-matcher/compare-skills` - API to compare job skills and resume skills

## 🐛 Troubleshooting

### Port Already in Use

If port 8002 is already in use, either:
1. Kill the process using the port (see Hot Reload section)
2. Change the port in your `.env` file

### TypeScript Compilation Errors

If you encounter TypeScript compilation errors:
```bash
# Clean the build
npm run clean

# Recompile
npm run compile
```

### Node Module Issues

If you encounter any issues with node modules:
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## 🎨 Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Make sure to:
- Follow the ESLint rules defined in `.eslintrc.js`
- Run `npm run prettier-format` before committing code
- Use the recommended VS Code extensions for automatic formatting
- Follow the layered architecture pattern (Repository → Service → Controller → Route)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the project structure and architecture guidelines
4. Run `npm run lint-check` to verify code quality
5. Run `npm run prettier-format` to format code
6. Test your changes thoroughly
7. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
8. Push to the branch (`git push origin feature/AmazingFeature`)
9. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Zuber Khan**

- GitHub: [@ZUBERKHAN034](https://github.com/ZUBERKHAN034)
- Backend: [node-job-skills-matcher-be](https://github.com/ZUBERKHAN034/node-job-skills-matcher-be)
- Frontend: [react-job-skills-matcher-fe](https://github.com/ZUBERKHAN034/react-job-skills-matcher-fe)

## 🙏 Acknowledgments

- Built with [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/) for API framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

---

For more information, check out:
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [VS Code Extensions Guide](https://code.visualstudio.com/docs/introvideos/extend)