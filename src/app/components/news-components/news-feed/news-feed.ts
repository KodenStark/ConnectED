import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { News, NdsuEvent } from '../../../services/news';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.html',
  styleUrl: './news-feed.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeed implements OnInit {
  private readonly newsService = inject(News);

  protected readonly events = signal<NdsuEvent[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  private readonly startsFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  private readonly endsFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  ngOnInit(): void {
    this.newsService.getEvents().subscribe({
      next: (response) => {
        this.events.set(response.value ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load events right now.');
        this.loading.set(false);
      },
    });
  }

  protected eventLink(eventId: string): string {
    return `https://myndsu.ndsu.edu/event/${eventId}`;
  }

  protected formatStartsOn(value: string): string {
    return this.startsFormatter.format(new Date(value));
  }

  protected formatEndsOn(value: string): string {
    return this.endsFormatter.format(new Date(value));
  }

  protected formatTheme(theme: string): string {
    return theme
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (char) => char.toUpperCase());
  }

  protected descriptionPreview(description: string): string {
    const plainText = description
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    if (plainText.length <= 180) {
      return plainText;
    }

    return `${plainText.slice(0, 177).trim()}...`;
  }

  protected categories(event: NdsuEvent): string[] {
    return event.categoryNames.slice(0, 3);
  }
}
