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
* **Data Source:** Mock JSON served through Angular `HttpClient`
---

## Features

The dashboard provides a single Client 360 view covering:

* Client profile and personal details
* Client archetype
* Assigned advisory team
* Household information
* Lifecycle progression
* Financial snapshot
* Net-worth sparkline
* Compliance status
* Activity feed with filtering
* Next Action
* Workbook status
* Task list and local task interactions
* Loading skeleton
* Error state with retry
* Empty and partial-data handling
* Route-aware client navigation
* Financial breakdown stub route
* Toast feedback for primary interactions

The interface is driven by the supplied mock client data and is implemented as a production-oriented Angular feature rather than a static screenshot recreation.

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

### Data Normalization
The service normalizes API data before exposing it to the UI. Examples include:
- Missing arrays fall back to empty arrays.
- Missing display values fall back to safe placeholders.
- Missing workbook/task collections do not break rendering.
- Sections can render empty states when no records are available.

### State Handling
The application uses Angular Signals and RxJS for local state and asynchronous data handling. The Client Profile feature supports:
- Loading state
- Successful data rendering
- Simulated API failure
- Error state with Retry
- Empty and partial data states
- Local task state (task completion and local task creation)
- Data-driven lifecycle and status rendering

### Simulated API Delay & Error
- The mock service introduces an artificial delay to simulate a realistic asynchronous API request.
- A client loading error can be triggered using: `/clients/147842?error=true`
- The page displays a dedicated error state with a Retry action that clears the query parameter and reloads the profile.

---

## Routing

The application uses Angular child routes under the persistent Shell.

```text
/
└── redirects to /clients/147842

/clients/:id
└── Client Profile Dashboard

/clients/:id/financials
└── Financial Breakdown stub page
```

- **Client Profile Route:** Available at `http://localhost:4200/clients/147842`
- **Financial Breakdown Route:** The Financial Snapshot provides a *View full breakdown* action navigating to `/clients/147842/financials` (currently a stub page).
- **Active Navigation:** The Clients navigation item uses Angular router state for active-route highlighting.

---

## User Interactions

### Client Header
Available actions include:
- Call
- Message
- Send FWP
- Overflow menu

*All header actions provide visible toast feedback.*

### Next Action
Available actions include:
- Generate FWP v3
- Overflow menu

### Activity Feed
Supports filtering by category:
- All
- Meetings
- Notes
- Docs
- Calls

*Filtering is performed client-side using the activity type.*

### Workbook
The Workbook panel supports:
- Tasks tab
- Docs tab
- Payment tab
- Task completion toggle
- Add Task form interaction (with local state management and cancellation)

*Tasks are maintained in local state and are not persisted to a backend.*

---

## Loading, Error, and Empty States

- **Loading State:** A reusable dashboard skeleton is displayed while the mock API request is in progress.
- **Error State:** Displays an error message alongside a Retry button when the API request fails.
- **Empty and Partial Data:** The UI remains usable when optional data or collections are missing (e.g., no linked household members, activities, tasks, or compliance records). Missing scalar display values fall back to `—`.

---

## Accessibility & Styling

### Accessibility
- Semantic HTML throughout
- Accessible labels for icon-only buttons
- Keyboard-friendly interactive controls and visible focus states
- Labeled form inputs and appropriate button/tab semantics
- Accessible error messaging and text-based status indicators alongside visuals

### Styling
- Component-scoped SCSS for detailed visual hierarchy
- Tailwind CSS configured for utility styling where appropriate
- Visual design follows the supplied EOS reference while prioritizing responsive architecture and maintainability over pixel-perfect reproduction

---

## Testing

The project is structured to support unit testing of reusable and stateful logic.

### Recommended Test Coverage
- Currency formatting
- Metric-delta presentation logic
- Client Profile loading, success, and error states
- Retry behavior
- Task interactions
- Activity filtering

> **Current Status:** The submission currently has limited automated test coverage. Expanding unit test coverage remains the main remaining testing work.

---

## Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open Application
Navigate to `http://localhost:4200` (redirects automatically to `http://localhost:4200/clients/147842`).

---

## Architectural Decisions

- **Standalone Angular Components:** Standalone components are used instead of NgModules to keep feature boundaries explicit and align with current Angular architecture.
- **Feature-Oriented Structure:** Client Profile functionality is isolated under `features/client-profile` while the application shell remains under `layout`.
- **Service-Based Data Access:** The supplied mock JSON is accessed through `ClientService`. This keeps UI components independent from the underlying data source and allows the mock implementation to be replaced with a real backend later.
- **Strong Typing:** The supplied JSON is represented through TypeScript interfaces and union types instead of `any`.
- **Reusable Components:** Focused UI responsibilities are separated into reusable components (Metric Tile, Lifecycle Stepper, Compliance, Activity Feed, Next Action, Workbook Panel, Empty State, Loading Skeleton).
- **State Management:** Angular Signals are used for local UI state (loading/error state, task state, workbook tab selection, Add Task form state), while RxJS manages asynchronous API data flows. A larger state-management library was intentionally avoided because the current feature scope does not justify the additional complexity.
- **Date Formatting:** Reusable date pipe maintains consistent display formatting (e.g., `21 Aug 2026`).

---

## Known Tradeoffs & Future Improvements

### Tradeoffs
- The application uses a local mock API instead of a real backend.
- The assignment provides one client dataset, so the application currently demonstrates one Client 360 record.
- Task creation and completion are local-only and are not persisted.
- The Financial Breakdown route is currently a stub.
- Several secondary navigation items remain presentation-focused because their corresponding feature areas are outside the scope of the supplied Client 360 screen.

### What I Would Improve With More Time
- **Automated Testing:** Expand coverage for currency formatting, metric-delta logic, service loading behavior, error/retry handling, task interactions, and activity filtering.
- **Personal Details Editing:** Extend the Personal Details area with a complete edit flow including form controls, validation, save, cancel, and dirty-state handling.
- **Financial Breakdown Expansion:** Extend the stub route into a complete financial detail workflow with asset allocation, liability breakdown, historical trends, insurance analysis, and additional financial metrics.
- **Backend Persistence:** Persist task updates and client edits through real API endpoints instead of remaining local to the current session.
- **Broader Navigation:** Implement additional routes for remaining navigation items once their corresponding feature areas are available.

---

## Project Status

### Completed
- [x] Angular project setup
- [x] Standalone component architecture
- [x] Typed Client Profile domain model
- [x] Client mock API service
- [x] Client data normalization
- [x] EOS application shell
- [x] Route-aware Clients navigation
- [x] Responsive shell foundation
- [x] Lucide icon integration
- [x] Client header and breadcrumb
- [x] Archetype card
- [x] Personal details
- [x] Assigned team
- [x] Household
- [x] Lifecycle stepper
- [x] Financial Snapshot
- [x] Net-worth sparkline
- [x] Compliance
- [x] Activity feed
- [x] Activity filtering
- [x] Next Action
- [x] Workbook panel
- [x] Task completion
- [x] Add Task
- [x] Toast feedback
- [x] Loading skeleton
- [x] Error state
- [x] Retry behavior
- [x] Empty / partial-data handling
- [x] Client Profile routing
- [x] Financial Breakdown stub route
- [x] Responsive layout refinement
- [x] Accessibility-focused interaction patterns

### Remaining
- [ ] Expand automated unit test coverage
- [ ] Complete Personal Details edit flow
- [ ] Expand Financial Breakdown implementation
- [ ] Add backend persistence

---

## Submission Notes

The implementation prioritizes:
1. Clear Angular component boundaries
2. Strong TypeScript typing
3. Service-based data access
4. Reusable presentational components
5. Signals and RxJS for state and asynchronous flows
6. Loading, error, and empty-state handling
7. Responsive UI structure
8. Accessible interaction patterns
9. Practical engineering tradeoffs

