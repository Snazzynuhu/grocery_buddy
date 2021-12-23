import React,{useState,useEffect, useRef} from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getLocalStorageData =()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  return [];
}

const App=()=>{
  const [item, setItem] = useState('');
  const [list, setList] = useState(getLocalStorageData());
  const [alert, setAlert] = useState({show:false, type:'',message: ''});
  const [idOfItemToEdit, setIdOfItemToEdit] = useState('');


  const inputRef = useRef();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(item && idOfItemToEdit){
      const newList = list.map((val) => {
        if(val.id === idOfItemToEdit){
          return {
            ...val,
            title: item
          }
        }
        return val;
      })

      setList(newList)
      setIdOfItemToEdit('')
      setItem('')
      setAlert({show:true,type:'success',message:'Item updated'});
      return;
    }
    if(!item){
      setAlert({show:true,type:'danger',message:'please add item'});
    }
    else{
      const newItem={id: new Date().getTime().toString(), title: item};
      setList([...list, newItem]);
      setAlert({show:true,type:'success',message:'item added to list'});
      setItem('');
    }
  }

  // Edit item //
  const editItem = (item) =>{
    setItem(item.title)
    setIdOfItemToEdit(item.id)
  }

// Close Alert //
  function closeAlert(){
    setAlert({show:false})
  }

  // remove item //
  const removeItem=(id)=>{
    const newList = list.filter((item)=> item.id !== id);
    setList(newList);
    setAlert({show:true,type:'danger',message:'item removed'});
  }
  
// CLEAR ALL ITEM IN LIST //
  const clearAll=()=>{
    setList([]);
    setAlert({show:true,type:'danger',message:'all items cleared'});
  }
  useEffect(() => {
     inputRef.current.focus();
     localStorage.setItem('list', JSON.stringify(list));
  }, [list])
  
  return (
    <>
    <div className='container'>
      <div className='circle1'></div>
      <div className='circle2'></div>
       <h1 className='title'>snazzy grocery buddy</h1>
       {alert.show && <Alert {...alert}closeAlert={closeAlert} />}
   <div className='form'>
      <input className='input' type='text' placeholder='e.g beans' name='item' value={item} ref={ inputRef} onChange={(e)=> setItem(e.target.value)} />
      <button type='submit' className='submit' onClick={handleSubmit}>{idOfItemToEdit ? 'update' : 'submit'} </button>
      <List editItem={editItem} list={list} removeItem={removeItem} />
      {list.length > 0 && <button className='clear-btn' onClick={clearAll}>Clear All</button>}
   </div> 
    </div>
   </>
  )
}

export default App;
