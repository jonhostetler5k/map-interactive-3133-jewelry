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

export interface Section {
  id: string;
  title: string;
  level: number;
}