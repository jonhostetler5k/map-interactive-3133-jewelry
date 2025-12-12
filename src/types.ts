export enum ChatSender {
  USER = 'user',
  AI = 'model'
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  isError?: boolean;
}

export interface PlanSection {
  id: string;
  title: string;
  category: 'Strategy' | 'Playbooks';
  content: string;
}
