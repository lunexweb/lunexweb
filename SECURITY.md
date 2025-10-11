# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** create a public issue
Security vulnerabilities should not be disclosed publicly until they have been addressed.

### 2. Email us directly
Send details to: **security@lunexweb.com**

### 3. Include the following information:
- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** (optional)

### 4. What to expect:
- **Acknowledgment** within 48 hours
- **Regular updates** on our progress
- **Credit** in our security advisories (if desired)

## Security Best Practices

### For Contributors:
- **Never commit** sensitive data (API keys, passwords, tokens)
- **Use environment variables** for configuration
- **Validate all inputs** on both client and server side
- **Follow OWASP guidelines** for web security
- **Keep dependencies** up to date

### For Users:
- **Keep your software** up to date
- **Use strong passwords** and enable 2FA where available
- **Be cautious** with file uploads and downloads
- **Report suspicious activity** immediately

## Security Measures

Our application implements several security measures:

### Frontend Security:
- **Content Security Policy (CSP)** headers
- **Input validation** and sanitization
- **XSS protection** through React's built-in mechanisms
- **Secure authentication** flows

### Backend Security:
- **Supabase Row Level Security (RLS)** policies
- **Environment variable** protection
- **Database connection** encryption
- **API rate limiting**

### Infrastructure Security:
- **HTTPS enforcement** on all domains
- **Secure headers** configuration
- **Regular dependency** updates
- **Automated security** scanning

## Known Vulnerabilities

Currently, there are no known security vulnerabilities. All reported issues are listed in our [GitHub Security Advisories](https://github.com/lunexweb/lunexweb/security/advisories).

## Security Updates

Security updates are released as soon as possible after vulnerabilities are discovered and patched. We recommend:

- **Subscribing** to security notifications
- **Updating immediately** when security patches are released
- **Monitoring** our security advisories

## Contact

For security-related questions or concerns:

- **Email**: security@lunexweb.com
- **Website**: [lunexweb.com/security](https://lunexweb.com/security)
- **Response Time**: Within 48 hours for security issues

## Acknowledgments

We thank the security researchers and community members who help keep our project secure by responsibly disclosing vulnerabilities.

---

**Last Updated**: January 2025  
**Next Review**: March 2025
