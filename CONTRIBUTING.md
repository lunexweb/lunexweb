# Contributing to Lunexweb

Thank you for your interest in contributing to Lunexweb! We welcome contributions from the community and appreciate your help in making this project better.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [Issues](https://github.com/lunexweb/lunexweb/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

### Making Changes

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lunexweb.git
   cd lunexweb
   ```

3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Make your changes** following our coding standards

6. **Test your changes**:
   ```bash
   npm run dev
   npm run lint
   ```

7. **Commit your changes**:
   ```bash
   git commit -m "feat: add your feature description"
   ```

8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request** with a clear description

## 📋 Coding Standards

### TypeScript/React
- Use TypeScript for all new code
- Follow React best practices and hooks
- Use functional components over class components
- Implement proper error boundaries

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use shadcn/ui components when possible

### Code Quality
- Write meaningful variable and function names
- Add comments for complex logic
- Follow ESLint configuration
- Write tests for new features

### Git Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── data/               # Static data and constants
└── assets/             # Images and static assets
```

## 🧪 Testing

Before submitting your PR:

1. **Run the development server**: `npm run dev`
2. **Check for linting errors**: `npm run lint`
3. **Test on multiple devices/browsers**
4. **Verify accessibility** with screen readers
5. **Check performance** with Lighthouse

## 📝 Pull Request Guidelines

### PR Title
Use a clear, descriptive title that summarizes your changes.

### PR Description
Include:
- **What** you changed
- **Why** you made the change
- **How** to test the changes
- Screenshots/GIFs for UI changes
- Any breaking changes

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility tested

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**:
   - OS and version
   - Browser and version
   - Node.js version

2. **Steps to reproduce**:
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Additional context**:
   - Screenshots
   - Error messages
   - Console logs

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** first
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Provide mockups** if applicable
5. **Consider implementation** complexity

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)

## 🏷️ Labels

We use labels to categorize issues and PRs:

- `bug` - Something isn't working
- `feature` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority items

## 📞 Getting Help

If you need help:

1. Check our [documentation](docs/)
2. Search existing [issues](https://github.com/lunexweb/lunexweb/issues)
3. Join our discussions
4. Contact us at info@lunexweb.com

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Lunexweb! 🚀
