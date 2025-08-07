# IELTS Mock Project - React Component Transformation Plan

## Overview
This document outlines the plan for transforming the HTML templates in `/pages` into React components for the IELTS mock testing website. The website is built with React and Vite, and uses Bootstrap for styling.

## Existing React Components (Already Done)
- `Layout.tsx` - Main layout wrapper
- `Header.tsx` - Main navigation header
- `TopBar.tsx` - Top header bar with contact info and language/currency dropdowns
- `Footer.tsx` - Footer component

## Pages Analysis & Component Strategy

### 1. Authentication Pages (Transform to Simple React Pages)
**Files:** `login.html`, `register.html`, `forgot-password.html`

**Strategy:** Convert to simple React pages with form components
- **AuthLayout Component** - Reusable layout for auth pages with left banner/carousel
- **LoginForm Component** - Login form with validation
- **RegisterForm Component** - Registration form
- **ForgotPasswordForm Component** - Password reset form
- **AuthCarousel Component** - Reusable carousel for auth page banners

**Reason:** These are straightforward forms with minimal complexity. The auth layout pattern is repeated across all auth pages.

### 2. Dashboard Pages (Component-Heavy Transformation)
**Files:** `student-dashboard.html`, `instructor-dashboard.html`, `student-profile.html`, `instructor-profile.html`, `student-settings.html`, `instructor-settings.html`

**Strategy:** Create comprehensive dashboard component system
- **DashboardLayout Component** - Main dashboard wrapper with sidebar
- **DashboardSidebar Component** - Navigation sidebar for dashboard pages
- **ProfileCard Component** - User profile card with avatar, name, role, action buttons
- **StatsCard Component** - Reusable card for displaying statistics (enrolled courses, active courses, etc.)
- **CourseCard Component** - Reusable course display card used in multiple contexts
- **QuizCard Component** - Card for displaying quiz information and continue buttons
- **BreadcrumbBar Component** - Breadcrumb navigation component

**Reason:** Dashboard pages share many UI patterns and components that can be reused across student and instructor views.

### 3. Course-Related Pages (Component-Heavy Transformation)
**Files:** `course-grid.html`, `course-category.html`, `course-resume.html`, `student-courses.html`, `instructor-course.html`

**Strategy:** Create comprehensive course system components
- **CourseGrid Component** - Main course grid layout
- **CourseFilter Component** - Sidebar filter system with categories, instructors, price, ratings
- **CourseCard Component** - Individual course card (reusable across multiple pages)
- **CourseListHeader Component** - Sort, search, and view toggle controls
- **CategoryCard Component** - Course category display cards
- **RatingFilter Component** - Star rating filter component
- **AccordionFilter Component** - Reusable accordion filter sections
- **PaginationComponent** - Course grid pagination

**Reason:** Course pages contain complex filter systems, card layouts, and search functionality that benefit greatly from componentization.

### 4. Static Content Pages (Simple React Pages)
**Files:** `about-us.html`, `contact-us.html`, `faq.html`

**Strategy:** Convert to simple React pages with minimal components
- **Hero/Banner Component** - Reusable hero section for static pages
- **FAQ Accordion Component** - Expandable FAQ sections
- **ContactForm Component** - Contact form with validation

**Reason:** These pages are mostly static content with simple layouts that don't require complex componentization.

### 5. Home Page (Component-Heavy Transformation)
**File:** `index.html`

**Strategy:** Break down into multiple reusable components
- **HeroBanner Component** - Main hero section with background images
- **BenefitsSection Component** - "Master the Skills" benefits grid
- **InstitutionsSlider Component** - Trusted institutions carousel
- **TopCoursesSection Component** - Categories and courses slider
- **VideoShowcase Component** - Video player with fancy box
- **FeaturedCourses Component** - Featured courses slider
- **CommunitySection Component** - Join community section
- **ClientSlider Component** - Client logos slider
- **HowItWorksSection Component** - How it works content
- **FeaturedInstructors Component** - Instructor cards slider
- **TestimonialsSection Component** - Testimonials slider
- **FAQSection Component** - FAQ accordion
- **BlogSection Component** - Recent blog articles

**Reason:** The home page contains many distinct sections that can be reused across the site and are complex enough to warrant individual components.

### 6. User Management Pages (Simple React Pages)
**Files:** `students.html`, `add-course.html`, `become-an-instructor.html`

**Strategy:** Create specific page components with reusable elements
- **StudentGrid Component** - Grid layout for students
- **StudentCard Component** - Individual student display card
- **CourseForm Component** - Add/edit course form
- **InstructorApplication Component** - Become instructor form

**Reason:** These are specialized pages with unique functionality but can benefit from some component reuse.

## Reusable UI Components to Extract

### High Priority Components (Used in Multiple Pages)
1. **CourseCard** - Used in course grids, dashboards, home page
2. **InstructorCard** - Used in instructor sections and grids
3. **StatsCard** - Used in all dashboard pages
4. **FilterAccordion** - Used in course and search pages
5. **StarRating** - Used throughout for course ratings
6. **Badge** - Used for course categories, discounts, etc.
7. **Avatar** - Used for user profiles throughout
8. **Button** - Styled buttons with various variants
9. **Modal** - For popups and dialogs
10. **Dropdown** - Language, currency, and other dropdowns

### Medium Priority Components
1. **TestimonialCard** - Testimonials display
2. **BlogCard** - Blog post display
3. **PriceDisplay** - Course pricing
4. **ProgressBar** - Course progress indicators
5. **IconBox** - Icon containers used in benefits sections
6. **Slider/Carousel** - Various content sliders
7. **SearchBox** - Search input component
8. **TagList** - Course tags and categories

### Low Priority Components (Page-Specific)
1. **VideoPlayer** - Video showcase component
2. **CounterUp** - Animated counters
3. **Timeline** - Process/step indicators
4. **FileUpload** - File upload for course creation
5. **Calendar** - Date pickers and calendars

## Implementation Strategy

### Phase 1: Core Components (Week 1)
- Set up component structure
- Create Layout and routing
- Implement Authentication pages with AuthLayout
- Create basic Button, Badge, Avatar components

### Phase 2: Dashboard System (Week 2)
- Implement DashboardLayout and ProfileCard
- Create StatsCard and CourseCard components
- Build student and instructor dashboard pages
- Add breadcrumb navigation

### Phase 3: Course System (Week 3)
- Create CourseGrid and CourseFilter components
- Implement course listing and category pages
- Add search and filtering functionality
- Build course detail views

### Phase 4: Home Page & Content (Week 4)
- Break down home page into components
- Implement static content pages
- Add testimonials and blog sections
- Create FAQ system

### Phase 5: Polish & Integration (Week 5)
- Implement remaining specialized pages
- Add animations and transitions
- Integrate with backend APIs
- Testing and bug fixes

## Special Considerations for IELTS Context

### IELTS-Specific Components to Create
1. **TestCard** - For IELTS practice tests
2. **ScoreDisplay** - IELTS band scores
3. **TestTimer** - Timer for timed sections
4. **QuestionTypes** - Different IELTS question formats
5. **ResultsBreakdown** - Detailed score analysis
6. **PracticeSection** - Reading, writing, listening, speaking sections

### Adaptation Notes
- Replace "Dreams LMS" branding with IELTS Mock Project branding
- Modify course terminology to test/practice terminology
- Adapt instructor/student roles to test-taker/admin roles
- Focus on test preparation rather than general education

## Technical Implementation Notes

### Component Structure
```
src/
  components/
    common/          # Reusable UI components
    auth/           # Authentication components  
    dashboard/      # Dashboard-specific components
    course/         # Course/test-related components
    home/           # Home page sections
    layout/         # Layout components
  pages/            # Page-level components
  hooks/            # Custom React hooks
  utils/            # Helper functions
  types/            # TypeScript types
```

### State Management
- Use React Context for user authentication
- Local state for component-specific data
- Consider React Query for server state management

### Styling Approach
- Keep existing Bootstrap classes
- Create CSS modules for component-specific styles
- Use CSS custom properties for theming

## Conclusion

This plan prioritizes creating reusable components for complex, repeated UI patterns while keeping simpler pages as straightforward React pages. The component-heavy approach is justified for dashboards, course systems, and the home page due to their complexity and reusability potential. The phased implementation approach ensures steady progress while maintaining functionality throughout development.
