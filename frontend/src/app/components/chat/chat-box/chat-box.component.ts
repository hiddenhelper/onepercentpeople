import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { JobResponse } from '@app/interfaces/job_response';
import { TalkService } from '@services/chat/talk.service';
import { ChatService } from '@services/chat/chat.service';
import { AuthService } from '@services/auth/auth.service';
import Talk from 'talkjs';
import { Chat } from '@app/interfaces/chat';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;

  @Input() job_response: JobResponse;

  private chatbox: Talk.Chatbox;
  private session: Talk.Session | null;

  /**
   * State of whether the two users have had a conversation before.
   */
  public has_chat: boolean = false;

  constructor(
    private talkService: TalkService,
    private chatService: ChatService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.checkIfChatExists();
  }

  /**
   * Check the backend to see if the two users have chatted before.
   */
  checkIfChatExists(): void {
    if (!this.job_response.user || !this.job_response.user.id)
      return;
    const other_user_id = this.job_response.user.id;
    const current_user = this.authService.getUser();
    if (!current_user || !other_user_id)
      return;

    this.chatService.getAll({ talent_user_id: other_user_id }).subscribe(
      response => {
        console.log(response);
        if (response.chats && response.chats.length > 0) {
          this.has_chat = true;
          this.createChatBox();
        }
      },
      error => {

      });
  }

  /**
   * Creates the talk.js chatbox between the two users.
   */
  async createChatBox(): Promise<void> {
    this.session = await this.talkService.createCurrentSession();
    if (!this.job_response.user || !this.session)
      return;
    this.chatbox = await this.talkService.createChatbox(this.session, this.job_response.user);
    this.chatbox.mount(this.talkjsContainer.nativeElement);
  }

  /**
   * Creates a chat instance on the backend and then opens a talk.js chatbox.
   */
  startConversation(): void {
    if (!this.job_response.user || !this.job_response.user.id)
      return;
    const other_user_id = this.job_response.user.id;
    const current_user = this.authService.getUser();
    if (!current_user || !other_user_id)
      return;

    const chat: Chat = { employer_user_id: current_user.id, talent_user_id: other_user_id };

    this.chatService.create(chat).subscribe(
      (response) => {
        this.has_chat = true;
        this.createChatBox();
      },
      error => {

      }
    );
  }

  ngOnDestroy() {
    if (this.chatbox) {
      this.chatbox.destroy();
    }
  }
}
