import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideSparkles } from '@lucide/angular';
import { Archetype } from '../../models/client-profile.model';

@Component({
  selector: 'app-archetype-card',
  imports: [LucideSparkles],
  templateUrl: './archetype-card.html',
  styleUrl: './archetype-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchetypeCard {
  readonly archetype = input.required<Archetype>();
}