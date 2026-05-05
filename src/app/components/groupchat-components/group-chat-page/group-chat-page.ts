import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../services/firebase';
import { ChatSidebar } from '../chat-sidebar/chat-sidebar';
import { MessageList } from '../message-list/message-list';

@Component({
  selector: 'app-group-chat-page',
  imports: [ChatSidebar, MessageList],
  templateUrl: './group-chat-page.html',
  styleUrl: './group-chat-page.css',
})
export class GroupChatPage implements OnInit {
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);

  chatId = signal<string | null>(null);
  communityId = signal('');
  chatName = signal('');
  isMember = signal(false);
  loading = signal(true);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.chatId.set(id);

    const [info, member] = await Promise.all([
      this.firebase.getGroupChatInfo(id),
      this.firebase.isUserInGroupChat(id),
    ]);

    if (info) {
      this.chatName.set(info.name);
      this.communityId.set(info.communityId);
    }
    this.isMember.set(member);
    this.loading.set(false);
  }
}
