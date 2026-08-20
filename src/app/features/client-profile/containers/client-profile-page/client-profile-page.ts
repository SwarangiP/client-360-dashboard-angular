import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientProfile } from '../../models/client-profile.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientHeader } from '../../components/client-header/client-header';
import { ArchetypeCard } from '../../components/archetype-card/archetype-card';
import { PersonalDetails } from '../../components/personal-details/personal-details';
import { AssignedTeam } from '../../components/assigned-team/assigned-team';

@Component({
  selector: 'app-client-profile-page',
  imports: [ClientHeader,
    ArchetypeCard,
    PersonalDetails,
    AssignedTeam
  ],
  templateUrl: './client-profile-page.html',
  styleUrl: './client-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientProfilePage {
  private readonly clientService = inject(ClientService);
  private readonly destroyRef = inject(DestroyRef);

  readonly client = signal<ClientProfile | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.loadClientProfile();
  }

  loadClientProfile(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.getClientProfile().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (clientProfile) => {
          this.client.set(clientProfile);
          this.isLoading.set(false);
        },
        error: (error: unknown) => {
          console.error(error);
          this.client.set(null);
          this.isLoading.set(false);
          this.errorMessage.set('Unable to load client profile.');
        }
      });
  }

  retry(): void {
    this.loadClientProfile();
  }

}
