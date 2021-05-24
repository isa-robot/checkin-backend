
export default interface IDocument {
  key: string;
  folder_id: number;
  filename: string;
  uploaded_at: string;
  updated_at: string;
  finished_at: string;
  deadline_at: string;
  status: string;
  auto_close: boolean;
}
