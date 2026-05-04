import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../services/firebase';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  private route = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);

  // Grabs the community id from the URL
  communityId = this.route.snapshot.paramMap.get('id');

  // Group chats loaded from Firebase
  courseGroupChats = signal<
    { id: string; name: string; courseNumber: string; members: string[] }[]
  >([]);
  userGroupChats = signal<{ id: string; name: string; members: string[] }[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadGroupChats();
  }

  private async loadGroupChats(): Promise<void> {
    const snapshot = await this.firebaseService.getGroupChats(this.communityId!);
    if (!snapshot) return;

    const course: { id: string; name: string; courseNumber: string; members: string[] }[] = [];
    const user: { id: string; name: string; members: string[] }[] = [];

    snapshot.docs.forEach((doc) => {
      const data = doc.data();

      // Only load group chats that belong to this community
      if (data['communityId'] !== this.communityId) return;

      if (data['chatType'] === 'Course') {
        course.push({
          id: doc.id,
          name: String(data['name'] ?? ''),
          courseNumber: String(data['courseNumber'] ?? ''),
          members: data['users'] ?? [],
        });
      } else {
        user.push({
          id: doc.id,
          name: String(data['name'] ?? ''),
          members: data['users'] ?? [],
        });
      }
    });

    this.courseGroupChats.set(course);
    this.userGroupChats.set(user);
  }

  async joinGroupChat(groupChatId: string): Promise<void> {
    const success = await this.firebaseService.joinGroupChat(groupChatId);
    if (success) {
      console.log('Successfully joined group chat:', groupChatId);
      await this.loadGroupChats(); 
    }
  }
}
