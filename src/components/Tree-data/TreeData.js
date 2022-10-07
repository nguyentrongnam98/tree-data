import React, { useState } from "react";
import SortableTree, { toggleExpandedForAll, changeNodeAtPath, insertNode, removeNodeAtPath } from "react-sortable-tree";
import "react-sortable-tree/style.css";
import './TreeData.css';
export default function TreeData(props) {
  const { treeData: data, isSearch, isExpandOrCollapse } = props;
  const [treeData, setTreeData] = useState(data);
  const [searchQuery, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [currentNode,setCurrentNode] = useState({})
  const getNodeKey = ({ treeIndex }) => treeIndex;
  const handleTreeData = (data) => {
    setTreeData(data);
  };
  const handleExpandOrCollapse = (expanded) => {
    setTreeData(
      toggleExpandedForAll({
        treeData,
        expanded,
      })
    );
  };
  const renderButtonExpandOrCollapse = () => {
    return (
      <>
        <button onClick={() => handleExpandOrCollapse(true)}>Expand</button>
        <button onClick={() => handleExpandOrCollapse(false)}>Collapse</button>
      </>
    );
  };
  const renderInputSearch = () => {
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type={"text"}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputSearch}
          style={{ outline: "none", padding: "6px" }}
        />
      </div>
    );
  };
  const handleInputSearch = (e) => {
    setSearchString(e.target.value)
  };
  const updateTreeData = (treeData) => {
    setTreeData(treeData)
  }
  const customSearchMethod = ({ node, searchQuery }) => {
    console.log('searchQuery',searchQuery);
   return searchQuery &&
    node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
  }
  const insertNewNode = () => {
    setTreeData(insertNode({
      treeData,
      depth:0,
      minimumTreeIndex:treeData.length,
      newNode: {title:'',children:[]},
      getNodeKey: ({ treeIndex }) => treeIndex
    }).treeData)
  }
  const removeNode  = (path) => {
    setTreeData(removeNodeAtPath({
      treeData,
      path,
      getNodeKey:({ treeIndex }) => treeIndex
    }))
  }   
  const selectThis = (node, path) => {
     setCurrentNode({node,path})
  } 
  return (
    <div style={{ height: "1800px" }}>
      {isExpandOrCollapse && renderButtonExpandOrCollapse()}
      {isSearch && renderInputSearch()}
      <SortableTree
        treeData={treeData}
        onChange={treeData  => handleTreeData(treeData)}
        searchFocusOffset={searchFocusIndex}
        searchQuery={searchQuery}
        searchMethod={customSearchMethod}
        generateNodeProps={({ node, path }) => ({
          title: (
            <form onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectThis(node, path); }}>
              <input
                style={{ fontSize: "1rem", width: 200 }}
                value={node.title}
                onChange={event => {
                  const title = event.target.value;
                  setTreeData(changeNodeAtPath({treeData,path,getNodeKey,newNode:{...node,title}}))
                }}
              />&nbsp;&nbsp;&nbsp;
              <buton onClick={(e) =>{e.preventDefault(); e.stopPropagation(); insertNewNode(path)} } className="btn">
                <span className="size">+</span>
              </buton>
              <buton onClick={(e) => {e.preventDefault(); e.stopPropagation();removeNode(path)} } className="btn">
              <span className="size">-</span>
              </buton>
            </form>
          )
        })}
      />
    </div>
  );
}
