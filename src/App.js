
import React, {useState} from 'react'
import './App.css';




function App() {
  const [todo,setTodo]=useState([])
 //tempt
 const[newtask,setNewtask]=useState("")
 const[updatedata,setUpdatedata]=useState("")

//add task
 const addTask=()=>{
    if(newtask){
      let num=todo.length+1
      let newlist={id:num,title:newtask,status:false}
      setTodo([...todo,newlist])
      setNewtask("")
    }
 }
 // del task
 const delTask=(id)=>{
    let delList=todo.filter(task=>task.id!=id)
    setTodo(delList)
}

//mark task
const markTask=(id)=>{
  let marklist=todo.map(task=>{
    if(task.id==id){
      return({...task,status:!task.status})
    }
    return task
  })
  setTodo(marklist)
}

//cancel update
const cancelUpdate=()=>{
  setUpdatedata("")
}
// change task update
const changeTask=(e)=>{
  let changelist={
    id:updatedata.id,
    title:e.target.value,
    status:updatedata.status
  }
  setUpdatedata(changelist)
}
//update task
const updateTask=()=>{
  let filterdata=[...todo].filter(task=>task.id!=updatedata.id)
  let updatelist=[...filterdata,updatedata]
  setTodo(updatelist)
  setUpdatedata("")
  
}

  return(
    <div className="container ">
      <div className='text-center'>
      <h1 className='title text-center'>ToDo list </h1>
      {updatedata?(
      
        <div className='mb-4 mt-3'>
            <input type="text" value={updatedata.title} onChange={(e)=>changeTask(e)}/>
            <button onClick={updateTask} className="ml-3">Update</button>
            <button onClick={cancelUpdate} className="ml-3">Cancel</button>
        </div>
      ):(
        
        <div className='mb-4 mt-3'>
            <input type="text" value={newtask} onChange={(e)=>setNewtask(e.target.value)}/>
            <button onClick={addTask} className="ml-3">Add</button>
        </div>
      )}

        {todo.length?'':"No tasks"}
      </div>



      
      {todo
      .sort((a,b)=>a.id>b.id?1:-1)
        .map((task,index)=>{
          return(
            <div  key={task.id}>
              <div className='bg row'>
                <div className='col-6'>
                  <div className={task.status?"done":'change'}>
                    <span className='text mr-2'>{index+1}</span>
                    <span className='text'>{task.title}</span>
                  </div>
                </div>
                <div className=' text-right pb-3 col-6'>
                  <button onClick={()=>markTask(task.id)} className="mr-2">Mark</button>
                  {task.status?null:(
                    <button onClick={()=>setUpdatedata({
                      id:task.id,
                      title:task.title,
                      status:task.status
                    })} className="mr-2 ">Edit</button>
                  )}
                  
                  <button onClick={()=>delTask(task.id)} className="mr-2">Remove</button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default App;


