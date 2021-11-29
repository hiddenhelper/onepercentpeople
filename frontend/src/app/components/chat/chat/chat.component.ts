import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TalkService } from '@services/chat/talk.service';
import Talk from 'talkjs';
import { Chat } from '@app/interfaces/chat';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;

  private inbox: Talk.Inbox;
  private session: Talk.Session | null;

  constructor(
    private talkService: TalkService,
  ) { }

  ngOnInit(): void {
    this.createInbox();
  }

  private async createInbox() {
    this.session = await this.talkService.createCurrentSession();

    if (!this.session) return;

    this.inbox = await this.talkService.createInbox(this.session);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

}
