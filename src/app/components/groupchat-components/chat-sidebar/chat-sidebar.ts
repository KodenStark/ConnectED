import { Component, inject, signal, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../../services/firebase';

interface SidebarChat {
  id: string;
  name: string;
}

@Component({
  selector: 'app-chat-sidebar',
  imports: [RouterLink],
  templateUrl: './chat-sidebar.html',
  styleUrl: './chat-sidebar.css',
})
export class ChatSidebar {
  private firebase = inject(FirebaseService);

  @Input() activeChatId: string | null = null;

  chats = signal<SidebarChat[]>([]);
  loading = signal(true);

  async ngOnInit(): Promise<void> {
    const ids = await this.firebase.getUserGroupChats();
    const resolved: SidebarChat[] = [];
    for (const id of ids) {
      const info = await this.firebase.getGroupChatInfo(id);
      if (info) resolved.push({ id: info.id, name: info.name });
    }
    this.chats.set(resolved);
    this.loading.set(false);
  }
}
