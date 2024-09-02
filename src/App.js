import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import AboutMe from './page/aboutme/AboutMe';
import ProjectsPage from './page/projects/ProjectsPage';
import ExperiencePage from './page/aboutme/experience/ExperiencePage';
import AddExperiencePage from './page/aboutme/experience/AddExperiencePage';
import DeleteExperiencePage from './page/aboutme/experience/DeleteExperiencePage';
import ProjectDetailPage from './page/projects/ProjectDetailPage';
import PostProjectPage from './page/projects/PostProjectPage';
import EditProjectPage from './page/projects/EditProjectPage';
import PostsPage from './page/posts/PostsPage';
import PostDetailPage from './page/posts/PostDetailPage';
import PostPostPage from './page/posts/PostPostPage';
import EditPostPage from './page/posts/EditPostPage';
import SkillsPage from './page/aboutme/skills/SkillsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/aboutme' element={<AboutMe/>}/>
        <Route path='/aboutme/skills' element={<SkillsPage/>}/>
        <Route path='/aboutme/experience' element={<ExperiencePage/>}/>
        <Route path='/aboutme/add-experience' element={<AddExperiencePage/>}/>
        <Route path='/aboutme/delete-experience' element={<DeleteExperiencePage/>}/>
        <Route path='/projects' element={<ProjectsPage/>}/>
        <Route path='/projects/:project_id' element={<ProjectDetailPage/>}/>
        <Route path='/post-project' element={<PostProjectPage/>}/>
        <Route path='/edit-project/:project_id' element={<EditProjectPage/>}/>
        <Route path='/posts' element={<PostsPage/>}/>
        <Route path='/posts/:post_id' element={<PostDetailPage/>}/>
        <Route path='/post-post' element={<PostPostPage/>}/>
        <Route path='/edit-post/:post_id' element={<EditPostPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
