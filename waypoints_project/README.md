# Waypoints - Mark Your Moments

A marketing website for the Waypoints calendar & diary app. This project demonstrates a clean, modular structure with well-organized code for beginners.

---

## 📁 Project Structure

```
dyingtoseeya/
├── homepage.html          # Main marketing website page
├── auth.js                # Authentication modal logic
├── styles.css             # All styling and responsive design
├── index.php              # PHP backend entry point
├── waypoints_logo.svg     # Brand logo
├── phone-svgrepo-com.svg  # Phone illustration for contact section
└── README.md              # This file
```

---

## 🎯 Quick Start

### For Beginners: Understanding Each File

#### **1. homepage.html** - The Main Page
The HTML file is organized into **clear sections**:

- **Head**: Contains metadata, fonts, and style links
- **Header**: Sticky navigation bar with responsive mobile menu
- **Hero Section**: Main headline with featured image and statistics
- **Features Section**: 3-column grid showcasing app capabilities
- **Gallery Section**: Photo showcase with location/time overlays
- **CTA Section**: "Start your free trial" call-to-action
- **Download Section**: App store download links
- **Contact Section**: Social media and contact information
- **Footer**: Brand info, links, and newsletter signup
- **Auth Modal**: Login/signup popup (hidden by default)

> **Pro Tip**: Each section is wrapped in `<!-- ========== SECTION NAME ========== -->` comments for easy navigation

---

#### **2. auth.js** - Authentication Logic
Handles all interactive behavior in the authentication modal:

**Key Features:**
- Opening/closing the modal
- Switching between Login and Signup tabs
- Form submission to server endpoints
- Keyboard shortcuts (Escape to close)
- Scroll wheel interaction within modal
- Focus management for accessibility

**Reusable Functions:**
- `openModal()` - Opens modal and switches to specified panel
- `closeModal()` - Hides modal
- `setActiveTab()` - Updates active tab styling
- `showPanel()` - Shows/hides form panels
- `focusFirstInput()` - Focuses first input for accessibility
- `submitForm()` - Handles form submission to PHP endpoints

> **Developer Note**: Functions are organized into clear sections with JSDoc comments explaining each function's purpose

---

#### **3. styles.css** - All Styling
Complete stylesheet organized by component:

```
CSS Variables → Global Styles → Components → Responsive → Accessibility
```

**Key Sections:**
1. **CSS Variables** - Color palette defined at the top for easy theming
2. **Global Styles** - Base styles for all elements
3. **Component Sections** - Each major page section has its own styling
   - Header & Navigation
   - Hero Section
   - Features Section
   - Gallery Section
   - CTA Section
   - Download Section
   - Contact Section
   - Footer
4. **Responsive Design** - Mobile-first breakpoints
5. **Accessibility** - Focus indicators and motion preferences
6. **Auth Modal** - Popup styling (managed by auth.js)

> **Design Color Palette:**
> - `--green-dark: #2f8f6b` (primary dark)
> - `--green: #35aa87` (primary)
> - `--charcoal-deep: #3a423f` (dark background)
> - `--cream: #fbfdfb` (light background)

---

#### **4. index.php** - Backend Entry Point
Currently serves as a test file. This is where you'll:
- Add user authentication logic
- Process form submissions from the modal
- Manage database connections
- Handle user sessions

---

## 🔄 How Authentication Works

### User Flow:
1. User clicks "Create" button or "Start Free Trial" button
2. `auth.js` opens the modal and shows the appropriate form
3. User fills in credentials and submits
4. `submitForm()` sends data via POST to PHP endpoints
5. PHP processes the request:
   - `/auth/login.php` - Validates login credentials
   - `/auth/signup.php` - Creates new account
6. Success/error message displays to user
7. Modal closes on success

### Form Submission Endpoints:
```javascript
// In auth.js
loginForm sends to: /auth/login.php
signupForm sends to: /auth/signup.php
```

---

## 🎨 Design System

### Colors (CSS Variables)
All colors are defined at the top of `styles.css` under `:root`:
```css
--green: #35aa87                /* Primary color */
--charcoal-deep: #3a423f        /* Dark backgrounds */
--cream: #fbfdfb                /* Light backgrounds */
```

### Fonts
- **Headings**: Baloo 2 (bold, modern)
- **Body Text**: Nunito Sans (clean, readable)

### Responsive Breakpoints
- **Desktop**: Full width
- **Tablet (900px)**: Grid layouts adjust, single column
- **Mobile (720px)**: Hamburger menu appears, single column

---

## 🔧 Code Reusability

### Patterns Used to Avoid Repetition:

#### 1. **CSS Variables for Colors**
Instead of typing `#35aa87` everywhere, use:
```css
background: var(--green);
color: var(--charcoal-deep);
```

#### 2. **Button Style Classes**
All buttons share common styles:
- `.btn-create` - Navigation button
- `.btn-primary` - Form submit button
- `.btn-learn` - "Learn More" link
- `.btn-trial` - CTA button

#### 3. **JavaScript Helper Functions**
Reusable functions in `auth.js` avoid code duplication:
- `handleCtaButtonClick()` - Used by both Create and Trial buttons
- `submitForm()` - Handles all form submissions
- `focusFirstInput()` - Used by multiple modal openers

#### 4. **ARIA Attributes Template**
Modal uses standard ARIA attributes making it easy to copy for other interactive components:
```html
role="dialog"
aria-hidden="true"
aria-selected="false"
```

---

## 📱 Responsive Design Strategy

The site uses a **mobile-first approach**:
- Base styles work on mobile
- `@media (max-width: 900px)` adjusts for tablets
- `@media (max-width: 720px)` adds mobile-specific styles (hamburger menu)

Example: Hero section
```css
/* Desktop (2 columns) */
.hero-grid { grid-template-columns: 1.15fr 1fr; }

/* Tablet/Mobile (1 column) */
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
}
```

---

## ♿ Accessibility Features

✅ **Keyboard Navigation**
- Escape key closes modal
- Tab key navigates form fields
- Enter key submits forms

✅ **Screen Reader Support**
- Semantic HTML (`<header>`, `<section>`, `<footer>`)
- ARIA labels and roles throughout
- Alt text for images

✅ **Visual Accessibility**
- Focus indicators (orange outline)
- High contrast colors
- Respects `prefers-reduced-motion` preference

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Create `/auth/login.php` to handle login submissions
- [ ] Create `/auth/signup.php` to handle signup submissions
- [ ] Set up database for storing user data
- [ ] Add form validation on PHP side
- [ ] Test all forms with real backend
- [ ] Update branding assets (SVG logos)
- [ ] Configure email notifications for new signups
- [ ] Set up error logging
- [ ] Test on mobile devices
- [ ] Update social media links in contact section

---

## 💡 Tips for Beginners

### Reading the Code:
1. Start with `homepage.html` - understand the structure
2. Read CSS section by section - see how styles apply to HTML
3. Review `auth.js` - understand event listeners and functions
4. Check comments - each function explains what it does

### Making Changes:
1. **Colors**: Edit CSS variables at top of `styles.css`
2. **Text Content**: Edit directly in `homepage.html`
3. **Behavior**: Add/modify event listeners in `auth.js`
4. **Mobile Issues**: Check responsive sections at bottom of `styles.css`

### Common Tasks:
- **Add new navigation link**: Add `<a>` in nav section + update color in CSS
- **Change hero image**: Update `src` in `.hero-photo img`
- **Modify button text**: Edit text between `<button>` tags
- **Change colors globally**: Update CSS variable in `:root`

---

## 📚 Resources for Learning

- [MDN Web Docs](https://developer.mozilla.org/) - Excellent resource for HTML/CSS/JS
- [CSS Tricks](https://css-tricks.com/) - Great CSS guides
- [Accessibility (A11y)](https://www.a11yproject.com/) - Learn about accessibility
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - ARIA best practices

---

## 📞 Getting Help

If you're stuck:
1. Check the comments in the code - they explain what's happening
2. Search MDN for HTML/CSS/JS concepts
3. Use browser DevTools (F12) to inspect elements
4. Test in the browser console to experiment

---

**Happy coding! 🎉**
