import React, { useEffect, useState } from "react"
import { Global } from "../../helpers/Global"
import useAuth from "../../hooks/useAuth"
import avatar from "../../assets/img/default.png"
export const UserList = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1) 
  const [more, setMore] = useState(true);

  useEffect(() => {
    getUser(1)    
  }, [])


  const nextPage = () => {
    let next = page + 1
    setPage(next)
    getUser(next)
  }


  const getUser = async (nextPage = 1) => {

    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })

    const data = await request.json()



    if (data.users && data.status == "success") {
      let newUsers = data.users
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
    }
    // paginacion
    if (users.length >= data.total - data.users.length) {
      setMore(false);
    }



  }

  return(
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 container mx-auto my-2">
      {users.map((user)=>{
        return(
          <div key={user._id} className="p-4 mx-auto bg-gray-100 w-full">
            <div className="w-20 h-20 rounded-full mr-4 overflow-hidden ">
              {user.image != "default.png" && (
                    <img
                      className="h-full object-cover"
                      src={Global.url + "user/avatar/" + user.image}
                      alt="Avatar"
                    />
                  )}
                  {user.image == "default.png" && (
                    <img
                      className="h-full object-cover"
                      src={avatar}
                      alt="Avatar"
                    />
                  )}
            </div>
            <div className="mt-4">
              <h2>{user.name}</h2>
            </div>
          </div>         
        
        )
      })}
    </div>
    {more && (
      <div className="mt-2">
        <button 
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
        >
          Ver más
        </button>
      </div>
    )}
    </>
  )

}
