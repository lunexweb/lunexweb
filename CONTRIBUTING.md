# Contributing to Lunexweb

Thank you for your interest in contributing to Lunexweb! We welcome contributions from the community and appreciate your help in making this project better.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Clear description** of the bug
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment details** (browser, OS, Node.js version)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- **Clear description** of the feature
- **Use case** and why it would be valuable
- **Proposed implementation** (if you have ideas)

### Code Contributions

1. **Fork** the repository
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit** with a clear message:
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Coding Standards

### TypeScript/React
- Use **TypeScript** for all new code
- Follow **React best practices** and hooks patterns
- Use **functional components** with hooks
- Implement **proper error handling**
- Add **JSDoc comments** for complex functions

### Styling
- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Maintain **consistent spacing** and typography
- Use **semantic HTML** elements

### Code Style
- Use **2 spaces** for indentation
- Use **semicolons** consistently
- Use **camelCase** for variables and functions
- Use **PascalCase** for components
- Use **kebab-case** for file names

### Git Commit Messages
Follow the conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## 🧪 Testing

Before submitting your PR, please ensure:

- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] ESLint passes without warnings
- [ ] Responsive design works on mobile and desktop
- [ ] All existing functionality still works

## 📝 Documentation

- Update **README.md** if adding new features
- Add **JSDoc comments** for new functions
- Update **component documentation** if needed
- Include **screenshots** for UI changes

## 🚀 Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/lunexweb.git
cd lunexweb

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 🎯 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── lib/           # Utilities and services
├── hooks/         # Custom React hooks
├── assets/        # Images and static files
└── types/         # TypeScript type definitions
```

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Your code follows the coding standards
- [ ] You've tested your changes
- [ ] Documentation is updated
- [ ] No console errors or warnings

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here
```

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 💬 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## 📞 Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Use Issues for bugs and feature requests
- **Email**: info@lunexweb.com for urgent matters

## 🎉 Recognition

Contributors will be recognized in our:
- README.md contributors section
- Release notes
- Social media acknowledgments

Thank you for contributing to Lunexweb! 🚀
