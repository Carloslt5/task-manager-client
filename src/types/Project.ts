type Project = {
  id: string;
  title: string;
  description: string;
  ownerId?: string;
};

type ProjectNotID = Omit<Project, 'id'>;
