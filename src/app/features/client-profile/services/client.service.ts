import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, delay, map, Observable, throwError } from "rxjs";
import { ClientProfile } from "../models/client-profile.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly http = inject(HttpClient);
    private readonly clientDataUrl = '/client-mock-data.json';

    private normalizeClientProfile(
        client: ClientProfile
    ): ClientProfile {
        return {
            ...client,

            name: client.name ?? 'Unknown client',
            avatarInitials: client.avatarInitials ?? '--',

            archetype: {
                name: client.archetype?.name ?? 'Not available',
                generation: client.archetype?.generation ?? '—',
                stage: client.archetype?.stage ?? '—',
                city: client.archetype?.city ?? '—',
                tags: client.archetype?.tags ?? []
            },

            scores: {
                fbs: {
                    value: client.scores?.fbs?.value ?? 0,
                    percentile: client.scores?.fbs?.percentile ?? '—',
                    deltaVsLastPeriod:
                        client.scores?.fbs?.deltaVsLastPeriod ?? 0
                },
                status: {
                    label: client.scores?.status?.label ?? 'Unknown',
                    subLabel: client.scores?.status?.subLabel ?? '—'
                }
            },

            personal: {
                age: client.personal?.age ?? 0,
                gender: client.personal?.gender ?? '—',
                maritalStatus: client.personal?.maritalStatus ?? '—',
                dependents: client.personal?.dependents ?? 0,
                occupation: client.personal?.occupation ?? '—',
                employer: client.personal?.employer ?? '—',
                city: client.personal?.city ?? '—',
                leadSource: client.personal?.leadSource ?? '—',
                clientSince: client.personal?.clientSince ?? ''
            },

            assignedTeam: client.assignedTeam ?? [],
            household: client.household ?? [],

            lifecycle: {
                cycle: client.lifecycle?.cycle ?? '—',
                day: client.lifecycle?.day ?? 0,
                nextReviewDate: client.lifecycle?.nextReviewDate ?? '',
                stages: client.lifecycle?.stages ?? []
            },

            activity: client.activity ?? [],

            compliance: {
                verifiedCount: client.compliance?.verifiedCount ?? 0,
                pendingCount: client.compliance?.pendingCount ?? 0,
                items: client.compliance?.items ?? []
            },

            tasks: client.tasks ?? [],
            docsCount: client.docsCount ?? 0,

            workbook: {
                version: client.workbook?.version ?? '—',
                status: client.workbook?.status ?? 'Unknown',
                completionPercent:
                    client.workbook?.completionPercent ?? 0,
                totalActions: client.workbook?.totalActions ?? 0,
                completedActions:
                    client.workbook?.completedActions ?? 0
            },

            paymentSummary: {
                status: client.paymentSummary?.status ?? 'up_to_date'
            }
        };
    }
    getClientProfile(forceError = false): Observable<ClientProfile> {
        if (forceError) {
            return throwError(() => new Error('Failed to load client profile.'));
        }

        return this.http
            .get<ClientProfile>(this.clientDataUrl)
            .pipe(
                map((client) => this.normalizeClientProfile(client)),
                delay(800),
                catchError((error: unknown) => {
                    console.error('Failed to load client profile', error);

                    return throwError(
                        () => new Error('Unable to load client profile.')
                    );
                })
            );
    }
}