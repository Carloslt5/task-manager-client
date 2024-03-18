import { useParams } from 'react-router-dom';

export const ProjectPage = () => {
  const { id } = useParams();
  return <div>Project {id}</div>;
};
