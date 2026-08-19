export interface ClientProfile {
    id: string;
    name: string;
    avatarInitials: string;
    breadcrumb: Breadcrumb;
    archetype: Archetype;
    scores: Scores;
    personal: PersonalDetails;
    assignedTeam: TeamMember[];
    household: HouseholdMember[];
    lifecycle: Lifecycle;
    financialSnapshot: FinancialSnapshot;
    compliance: Compliance;
    activity: Activity[];
    nextAction: NextAction;
    workbook: Workbook;
    tasks: Task[];
    docsCount: number;
    paymentSummary: PaymentSummary;
}

export interface Breadcrumb {
    section: string;
    totalClients: number;
}

export interface Archetype {
    name: string;
    generation: string;
    stage: string;
    city: string;
    tags: [];
}

export interface Scores {
    fbs: FbsScore;
    status: ClientStatus;
}

export interface FbsScore {
    value: number;
    percentile: string,
    deltaVsLastPeriod: number;
}

export interface ClientStatus {
    label: string;
    subLabel: string;
}

export interface PersonalDetails {
    age: number;
    gender: string;
    maritalStatus: string;
    dependents: number;
    occupation: string;
    employer: string;
    city: string;
    leadSource: string;
    clientSince: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarInitials: string;
}

export interface HouseholdMember {
    id: string;
    relation: string;
    initials: string;
}

export interface Lifecycle {
    cycle: string;
    day: number;
    nextReviewDate: string;
    stages: LifecycleStage[];
}

export interface LifecycleStage {
    key: string;
    label: string;
    status: LifecycleStageStatus;
}

export type LifecycleStageStatus = 'complete' | 'current' | 'upcoming';

export interface FinancialSnapshot {
    lastSynced: string;
    syncSource: string;
    viewCount: number;
    netWorth: NetWorth;
    metrics: SnapshotMetrics;
    monthly: MonthlyMetric;
}

export interface NetWorth {
    value: number;
    displayValue: string;
    deltaPercent: number | null;
    deltaLabel: string;
    trend: TrendPoint[];
}

export interface TrendPoint {
    period: string;
    value: number;
}

export interface SnapshotMetrics {
    assets: FinancialMetric;
    liabilities: FinancialMetric;
    valueUnderAdvisory: FinancialMetric;
    insuranceCover: FinancialMetric;
}

export interface FinancialMetric {
    value: number;
    displayValue?: string;
    deltaPercent?: number | null;
    deltaIsGood?: boolean;
    gap?: InsuranceGap;
}

export interface InsuranceGap {
    value: number;
    displayValue: string;
}

export interface MonthlyMetric {
    income: FinancialMetric;
    expense: FinancialMetric;
    surplus: FinancialMetric;
    fbs: MonthlyFbs;
}

export interface MonthlyFbs {
    value: number;
    percentile: string;
    deltaAbs: number;
}

export interface Compliance {
    verifiedCount: number;
    pendingCount: number;
    items: ComplianceItem[];
}

export interface ComplianceItem {
    id: string;
    label: string;
    status: ComplianceStatus;
    subLabel: string;
}

export type ComplianceStatus = 'verified' | 'pending' | 'action_required';

export interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    timestamp: string;
    author: string;
    meta: string | null;
    description: string | null;
}

export type ActivityType = 'meeting' | 'note' | 'doc' | 'call';

export interface NextAction {
    status: NextActionStatus;
    overdueByDays: number;
    title: string;
    description: string;
    primaryCta: string;
}

export type NextActionStatus = 'overdue' | 'due' | 'scheduled';

export interface Workbook {
    version: string;
    status: string;
    completionPercent: number;
    totalActions: number;
    completedActions: number;
}

export interface Task {
    id: string;
    label: string;
    dueLabel: string;
    assigneeTag: string;
    completed: boolean;
}

export interface PaymentSummary {
    status: PaymentStatus;
}

export type PaymentStatus = 'up_to_date' | 'due' | 'overdue';