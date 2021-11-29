import { Injectable } from '@angular/core';
import Talk from 'talkjs';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  private currentTalkUser: Talk.User;

  constructor(
    private authService: AuthService,
  ) { }

  async createUser(user: User) {
    await Talk.ready;

    return new Talk.User({
      id: user.id,
      name: `${user?.first_name}  ${user?.last_name}`,
      photoUrl: user?.profile_photo_url,
      role: user.account_type === 1 ? 'talent' : 'employer',
      // welcomeMessage: user.account_type === 1 ? "Say hello" : "Say hello",
    });
  }


  async createCurrentSession() {
    await Talk.ready;
    const user = this.authService.getUser();
    if (!user) return null;

    this.currentTalkUser = await this.createUser(user);

    const session = new Talk.Session({
      appId: 't9uMmxZa',
      me: this.currentTalkUser
    });

    return session;
  }

  private async getOrCreateConversation(session: Talk.Session, otherUser: User) {
    const otherTalkUser = await this.createUser(otherUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentTalkUser, otherTalkUser));
    conversation.setParticipant(this.currentTalkUser);
    conversation.setParticipant(otherTalkUser);

    return conversation;
  }

  async createInbox(session: Talk.Session) {

    return session.createInbox({});
  }


  async createChatbox(session: Talk.Session, otherUser: User) {
    const conversation = await this.getOrCreateConversation(session, otherUser);

    return session.createChatbox(conversation);
  }

}
