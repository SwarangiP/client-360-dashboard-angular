import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, delay, Observable, throwError } from "rxjs";
import { ClientProfile } from "../models/client-profile.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly http = inject(HttpClient);
    private readonly clientDataUrl = '/client-mock-data.json';

    getClientProfile(forceError = false): Observable<ClientProfile> {
        if (forceError) {
            return throwError(() => new Error('Failed to load client profile.'));
        }

        return this.http
            .get<ClientProfile>(this.clientDataUrl)
            .pipe(
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