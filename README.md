# Checkout System

## Overview

This repository contains a TypeScript implementation of a flexible and extensible checkout system for Datarocks new computer store. The system is designed to handle dynamic pricing rules and promotions for various products, ensuring it can easily adapt to changing requirements in the future. The checkout system adheres to best practices in software development, ensuring high-quality code that is easy to maintain, extend, and test.

- **Code Quality**: Clear structure with separation of concerns.
- **Maintainability**: Uses classes for pricing rules to allow easy expansion.
- **Testability**: Includes unit tests for core functionalities.
- **Scalability**: Supports flexible pricing rule extensions.

## Features

- **Pricing Rules Implemented**:
  - Apple TV "3 for 2" discount.
  - Super iPad bulk discount.
  - MacBook Pro includes a free VGA adapter.

## Technologies

- **Language**: TypeScript
- **Testing Framework**: Jest
- **Build Tool**: npm/yarn

## Setup

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/ZeeshanM20/datarock-shopping-ts.git
cd datarock-shopping-ts
```

# Install dependencies
```bash
npm install  # or yarn install
```

## Running the Application

To run the checkout system:

```bash
npm start  # or yarn start
```

## Running Tests

Unit tests are included using Jest:

```bash
npm test  # or yarn test
```

## Project Structure

```plaintext
├── src
│   ├── models         # Product and pricing rule models
│   ├── rules          # Pricing rule implementations
│   ├── services       # Checkout logic
│   ├── tests          # Unit tests for core functionalities
│   └── index.ts       # Entry point
├── README.md          # Documentation
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript configuration
└── jest.config.js     # Test framework configuration
```

## Implementation Details

### Why Are We Using Classes for Pricing Rules?

**Separation of concerns & extensibility**:

- Using classes allows each pricing rule to be encapsulated as an independent module.
- Makes it easy to add new rules without modifying existing logic.
- Encourages the Open/Closed Principle (OCP) – new rules can be created as separate classes without modifying the checkout process.
- Improves testability, as each pricing rule can be tested in isolation.

### How It Works

1. **Checkout System**:
   - Scans items into the cart.
   - Applies pricing rules dynamically.
   - Calculates total price.

2. **Pricing Rules**:
   - Apple TV "3 for 2" discount.
   - Super iPad bulk discount.
   - MacBook Pro includes a free VGA adapter.

### Example Usage

```typescript
const pricingRules = [new AppleTvDiscount(), new BulkIpadDiscount(), new FreeVgaAdapter()];
const checkout = new Checkout(pricingRules);

checkout.scan("atv");
checkout.scan("ipd");
checkout.scan("mbp");

console.log("Total price:", checkout.total());
```

### Future Improvements

- Extend pricing rules with percentage-based discounts.
- Support currency conversion.
- Optimize performance using HashMaps for item lookups.
