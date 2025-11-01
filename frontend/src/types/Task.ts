export interface Task {
  id: number;
  title: string;
  description?: string | null;
  deadline?: string | null;     // ISO date string or null
  completed: boolean;
  created_by?: string | null;
  created_at: string;   // ISO date string
}
