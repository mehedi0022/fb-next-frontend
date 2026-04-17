# Lib Folder Structure

This folder contains all centralized exports for the application.

## Files

- **`index.ts`** - Main entry point that exports everything from other files
- **`types.ts`** - All TypeScript type definitions and interfaces
- **`utils.ts`** - Utility functions (toBanglaNumber, formatPrice, etc.)
- **`constants.ts`** - Application constants and configuration
- **`components.ts`** - Component exports for easy importing

## Usage

Instead of importing from multiple locations:
```typescript
import { Product } from '@/app/types/productTypes';
import { toBanglaNumber } from '@/app/lib/index';
import Container from '@/app/components/common/Container';
```

You can now import everything from one place:
```typescript
import { Product, toBanglaNumber, Container } from '@/lib';
```

## Benefits

1. **Centralized imports** - All imports from one location
2. **Better organization** - Types, utils, and components are properly separated
3. **TypeScript support** - Full type safety with proper TypeScript files
4. **Easy maintenance** - Changes in one place affect the entire application
5. **Clean code** - Shorter import statements and better readability