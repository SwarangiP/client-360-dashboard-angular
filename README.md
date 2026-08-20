# Client 360 Dashboard

Angular implementation of a Client 360 wealth-advisory operations dashboard based on the provided EOS reference design and assignment requirements.

---

## Tech Stack

* **Framework:** Angular 22
* **Language:** TypeScript
* **Reactive & State:** RxJS, Angular Signals
* **Styling:** SCSS, Tailwind CSS
* **Icons:** Lucide Angular
* **Architecture:** Angular Standalone Components
---

## Features

The dashboard is being built to provide a single Client 360 view covering:

* Client profile and personal details
* Client archetype
* Assigned advisory team
* Household information
* Lifecycle progression
* Financial snapshot
* Compliance status
* Activity feed
* Next action and workbook status
* Client tasks and task interactions

The interface is driven by the supplied mock client data and is being implemented as a production-oriented Angular feature rather than a static screenshot recreation.

---

## Architecture

The application uses a feature-oriented Angular architecture with a clear separation between the shared application shell and the Client Profile feature.

```text
src/app/
├── core/
│   └── services/
│
├── layout/
│   ├── navigation/
│   └── shell/
│
├── features/
│   └── client-profile/
│       ├── components/
│       ├── containers/
│       ├── models/
│       ├── pipes/
│       └── services/
│
└── shared/
    ├── components/
    ├── pipes/
    └── utils/
```

The assignment specifically recommends treating the navigation as a shared application shell rather than as part of the Client Profile feature.

---

## Data Flow

The supplied `client-mock-data.json` is treated as the response from a client API.

```text
client-mock-data.json
        ↓
  ClientService
        ↓
Observable<ClientProfile>
        ↓
Client Profile Container
        ↓
Presentational Components
        ↓
  Client 360 UI
```

* The JSON is accessed through a service layer instead of being imported directly into components, as required by the assignment.
* The client data is represented using strongly typed TypeScript interfaces.

---

## State Handling

The application uses Angular Signals and RxJS for local feature state and asynchronous data handling.

The Client Profile feature is designed to explicitly support:
* Loading state while client data is being fetched
* Success state when data is available
* Error state with retry handling

---

## Accessibility

...

## Testing

...

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open application:**  
   The application will be available at [http://localhost:4200]

## Architectural Decisions

* **Standalone Angular Components:** Standalone components are used instead of NgModules to keep feature boundaries explicit and align with the current Angular architecture.
* **Feature-Oriented Structure:** The Client Profile functionality is isolated under `features/client-profile`, while the application shell remains under `layout`.
* **Service-Based Data Access:** The mock JSON is accessed through a dedicated service so that the data-access implementation can later be replaced by a real backend API without coupling components directly to the data source.
* **Strong Typing:** The supplied JSON is represented through TypeScript interfaces and union types rather than `any`, allowing compile-time validation of the client domain model.
* **Reusable Components:** Repeated UI patterns such as metric tiles, status indicators, lifecycle stages, and avatars will be implemented as reusable components rather than duplicated markup.
* **Styling:** Tailwind CSS is used alongside component-scoped SCSS. Tailwind provides the utility foundation while SCSS is used for component-specific styling and more complex UI rules.
* **State Management:** Signals and RxJS are used for local state and asynchronous data flows. A larger state-management library is intentionally avoided because the current feature scope does not justify the additional complexity.

---

## Known Tradeoffs

* The current implementation uses a local mock API and supplied JSON rather than a real backend.
* The dashboard currently represents a single client record because the assignment provides one client dataset.
...

---

## What I Would Improve With More Time

...

---

## Current Progress

### Completed
- [x] Angular project setup
- [x] Typed Client Profile domain model
- [x] Client mock API service
- [x] EOS application shell
- [x] EOS navigation
- [x] Responsive shell foundation
- [x] Lucide icon integration
- [x] Initial project documentation
- [x] Client header and breadcrumb

### Remaining
- [ ] Archetype card
- [ ] Personal details
- [ ] Assigned team
- [ ] Household
- [ ] Lifecycle stepper
- [ ] Financial snapshot and sparkline
- [ ] Compliance section
- [ ] Activity filtering
- [ ] Next Action and Workbook panel
- [ ] Task interactions
- [ ] Loading/error/empty UI states
- [ ] Final responsive and accessibility refinement
- [ ] Unit tests
- [ ] Final submission polish
