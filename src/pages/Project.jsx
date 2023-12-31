//hooks
import { useParams } from 'react-router-dom';
import { useDocument } from '../hooks/useDocument';
//components
import ProjectSummary from '../components/ProjectSummary';
import ProjectComments from '../components/ProjectComments';
//styles
import '../styles/project.css';

function Project() {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!document) {
    return <div className="loading">loading documents...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}

export default Project;
