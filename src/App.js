
import TreeData from './components/Tree-data/TreeData';
import { treeData } from './mockData';

function App() {
  return (
    <div className="App">
       <TreeData treeData={treeData} isSearch isExpandOrCollapse/>
    </div>
  );
}

export default App;
