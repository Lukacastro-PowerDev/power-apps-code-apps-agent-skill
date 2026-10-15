// EXAMPLE ONLY - use generated SharePoint service when available.
export interface SharePointEntity {
  id: string;
  title: string;
}

export interface SharePointEntityService {
  list(): Promise<SharePointEntity[]>;
  create(input: Omit<SharePointEntity, "id">): Promise<SharePointEntity>;
  update(id: string, input: Partial<Omit<SharePointEntity, "id">>): Promise<SharePointEntity>;
  remove(id: string): Promise<void>;
}
