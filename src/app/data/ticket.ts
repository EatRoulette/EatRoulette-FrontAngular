export class Ticket {
  title: string;
  id: string;
  message: string;
  status: string; //  = 'created' | 'pending' | 'done' | 'standby'
  type: string; // 'bug' | 'request'
  comments: Comment[];
  created_at: Date;
}
