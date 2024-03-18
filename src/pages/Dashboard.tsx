import { useParams } from 'react-router-dom';

const exampleProject: Project = {
  id: '512E8FFC-FAEC-4E01-8F98-03A283323038',
  title: 'Projecto 1',
  description: 'Description project 1',
  owner_id: '0c3d375d-1862-49f1-9364-7f81e8800f20',
};

export const DashboardPage = () => {
  const { id } = useParams();
  return (
    <>
      <p>Esto es el params USERID, {id}</p>
      <header>
        <h1 className="mb-3 title__primary">My Dashboard</h1>
      </header>
    </>
  );
};
