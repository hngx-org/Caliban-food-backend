# Folder Structure

CALIBAN-FOOD-BACKEND /
├── configs/  # Configuration files (database, environment, etc.)
│       ├── dbConfig.js  # Database configuration
├── controllers/
│   ├── userController.js  # User-related logic
│   ├── lunchController.js  # Lunch-related logic
│   └── ...
├── models/
│   ├── User.js            # User model
│   ├── Lunch.js           # Lunch model
│   └── ...
├── routes/
│   ├── api.js             # API routes (versioning, grouping)
│   ├── userRoutes.js       # User-related routes
│   ├── lunchRoutes.js      # Lunch-related routes
│   └── ...
├── services/               # Service files as needd by team implementation
│   ├── AuthService.js     
│   ├── LunchService.js    
│   └── ...etc
├── middleware/             # Middleware files as needed by team implementation.
│   ├── authMiddleware.js   
│   ├── errorMiddleware.js  
│   └── ...etc
├── tests/
│   ├── user.test.js        # Unit tests for User-related logic
│   ├── lunch.test.js       # Unit tests for Lunch-related logic
│   └── ...etc
├── utils/
│   ├── helpers.js          # Helper functions
│   └── ...etc
|-- validations             
    |-- # Input validation functions

├── app.js                  # Main application entry point
├── server.js               # Server initialization
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── .env                    # Environment variables (not in version control)
├── .gitignore              # Git ignore file
└── ...

**-- P.S: Any other file to be added here, should really be important and discussed with the maintainers of the repo/project.**

# Contribution rules

## These rules Are to be strictly complied with, failure to do so, your PR won't be merged.
1. **Branching Strategy**:
   - Use feature branches: Create a new branch for each feature or bug fix, using a descriptive name (e.g., `feature/user-auth`, `bugfix/issue-123`).
   - Your tasks should come in branches, there are 4 groups. So when your sub-team assgns a task to you, when youre done commit to your sub-groups's branch.
   - Whosever is incharge of your sub-group then makes a PR containing all the commits tjat the team feels are fail-proof(as in tested and confirmed it works without bugs.)
   - Do not push directly to the `main` or `master` branch. Submit pull requests for review and merging.

2. **Commit Guidelines**:
   - If you don't have an idea of what a commit message should look like, checkout [semantic commit messages](https://www.conventionalcommits.org/en/v1.0.0/). A typical commit message should have a concise summary and an optional body.
   - Use present tense (e.g., "Add feature" instead of "Added feature").

3. **Pull Requests (PRs)**:
   - PRs should include a clear and concise description of the changes made.
   - Ensure that your code is up to date with the latest changes from the `main` branch. To avoid conflicts (Pls don't give me issues)
   - Address any feedback or review comments promptly.

4. **Code Quality**:
   - Write clean, well-documented code that adheres to our coding style guidelines.
   - Run tests locally before submitting a PR to catch and fix issues.

5. **Testing**:
   - We are using jest and supertest for unit and integration tests.
   - So each team should have a guy, dedicated to understanding the tasks and hence writing tests for them.
   - Include new tests for any new functionality or bug fixes.
   - Ensure all existing tests pass before submitting a PR.

6. **Dependencies**:
   - Avoid adding unnecessary dependencies to the project.
   - Keep dependencies up to date, and use a lock file (e.g., `package-lock.json`).
   - If you're going to use any package ensure your sub-group member is aware and as such informs the maintainers so we all double check that the package is   not deprecated.

7. **Security**:
   - Report any security vulnerabilities privately to the maintainers.
   - Avoid hardcoding sensitive information (e.g., API keys, passwords) in the code.

8. **Respect Reviewers and Maintainers**:
    - Be patient and considerate during code reviews. Understand that feedback is meant to improve the quality of the code and might take time.

9. **Merging PRs**:
    - PRs will be merged after approval by maintainers. Do not merge your own PRs.

10. **Naming Convention**:
    - This project is sticking to camelCase not snake_case or PaschalCase.
    - All functions, files and variables should follow the provided naming convention.

11. **Coding Guidelines**:
    - Use comments to explain complex logic or to provide context.
    - Keep comments up to date; remove outdated comments.
    - Use consistent spacing around operators (`+`, `-`, `=`, etc.).
    - Add space after commas in function arguments and array elements.
    - Use a space before and after keywords like `if`, `for`, and `while`.
    - Keep imports at the top of the file.
    - Sort imports for better organization.
    - Use CommonJs (require/module.exports) not ES6 `import` and `export default` statements for module import and export.
    - Use consistent spacing around operators (`+`, `-`, `=`, etc.).
    - Add space after commas in function arguments and array elements.

**N/B: - Endeavour to stick to this coding guidelines, in the absence of any linter(eslint etc) we are using the rules here to keep ourselves in check. This is the closest to coding standard of eslint we can get, so stick to it.**
