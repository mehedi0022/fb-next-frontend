app                                          # Next.js App Router root
├── (user)                                   # Route group: user-facing pages
│   ├── (auth)                               # Route group: authentication pages
│   │   ├── error.tsx                        # Error boundary for auth routes
│   │   ├── loading.tsx                      # Loading UI for auth routes
│   │   ├── login                            
│   │   │   ├── page.tsx                     # Login page (Server Component)
│   │   │   └── two-factor                   
│   │   │       └── page.tsx                 # Two-factor auth page (Server Component)
│   │   └── register                         
│   │       └── page.tsx                     # Registration page (Server Component)
│   └── (home)                               # Route group: main app pages
│       ├── about                            
│       │   └── page.tsx                     # About Us page (Server Component)
│       ├── categories                       
│       │   ├── error.tsx                    # Error boundary for categories
│       │   ├── loading.tsx                  # Skeleton/loading UI for categories
│       │   └── page.tsx                     # Categories listing page (Server Component)
│       ├── contact                          
│       │   └── page.tsx                     # Contact page (Server Component)
│       ├── privacy-policy                   
│       │   └── page.tsx                     # Privacy Policy page (Server Component)
│       ├── products                         
│       │   ├── [id]                         # Dynamic route: single product
│       │   │   ├── loading.tsx              # Loading UI for product detail
│       │   │   └── page.tsx                 # Product detail page (Server Component)
│       │   ├── error.tsx                    # Error boundary for products
│       │   ├── loading.tsx                  # Loading UI for products list
│       │   └── page.tsx                     # Products listing page (Server Component)
│       └── terms-and-conditions            
│           └── page.tsx                     # Terms & Conditions page (Server Component)
├── error.tsx                                # Global error boundary
├── favicon.ico                              # App favicon
├── fonts                                    # Local font files
│   ├── GeistMonoVF.woff                     # Geist Mono variable font
│   └── GeistVF.woff                         # Geist variable font
├── global-error.tsx                         # Root-level error boundary (catches layout errors)
├── globals.css                              # Global CSS styles & Tailwind base
├── layout.tsx                               # Root layout (Server Component) — wraps all pages
├── loading.tsx                              # Root-level loading UI
├── not-found.tsx                            # 404 page (Server Component)
├── page.tsx                                 # Homepage (Server Component)
└── providers.tsx                            # Client Component — wraps app with context providers
