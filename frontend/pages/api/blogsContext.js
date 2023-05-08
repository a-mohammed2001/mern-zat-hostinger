import React, { useState ,createContext, useEffect } from 'react'
import axios from 'axios'
// const blogsApi = [
//     {
//         title:"How to Be Creative",
//         author:"Ahmed Abou Khatwa",
//         img:"/images/creative.jpg",
//         date:"2022-8-18",
//         isUpdated:true,
//         paragraphs:`
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//         `,
//     },
//     {
//         title:"How to read books effectively",
//         author:"Ahmed Abou Khatwa",
//         img:"/images/how to read books effectively.png",
//         date:"2020-9-10",
//         isUpdated:true,
//         paragraphs:`
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//         `,
//     },
//     {
//         title:"How to build a habit in 5 steps",
//         author:"Ahmed Abou Khatwa",
//         img:"/images/habit.webp",
//         date:"2020-9-10",
//         isUpdated:true,
//         paragraphs:`
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//         `,
//     },
//     {
//         title:"How to get leadership skills",
//         author:"Ahmed Abou Khatwa",
//         img:"/images/how to get leadership skills.jpg",
//         date:"2020-9-10",
//         isUpdated:true,
//         paragraphs:`
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//         `,
//     }
// ];
export const blogsContext = createContext();
export default function BlogsProvider({children}) {
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:4000/").
        then(res=>{
            setBlogs(res.data);
        })
    },[]);
    const deleteBlog = (blog,i)=>{
        const id = blog._id;
        axios.delete(`http://localhost:4000/delete/${id}`)
        blogs.splice(i, 1);
        setBlogs([...blogs]);
    }
    const updateBlog = (blog,id,newTitle,newAuthor,newDate,newParagraphs)=>{
        blog.isUpdated= !blog.isUpdated;
        axios.put(`http://localhost:4000/edit`
            ,{
            id:id,
            title:newTitle,
            author:newAuthor,
            date:newDate,
            paragraphs:newParagraphs
            }
        )
        console.log(id);   
        setBlogs([...blogs]);     
    }
    const addBlog = (newTitle,newAuthor,newParagraph)=>{
        if(newTitle !== "" && newAuthor !== ""&& newParagraph!==""){
            blogs.unshift( {
                title:newTitle,
                author:newAuthor,
                img:"/images/new blog.jpg",
                date:new Date().getFullYear()+'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate(),
                isUpdated:true,
                paragraphs:newParagraph,
            });
            axios.post("http://localhost:4000/add",{
                title:newTitle,
                author:newAuthor,
                img:"/images/new blog.jpg",
                date:new Date().getFullYear()+'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate(),
                isUpdated:true,
                paragraphs:newParagraph,
            })
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
        }  
        setBlogs([...blogs]);
    }
    return (
        <blogsContext.Provider value={{blogs,deleteBlog,updateBlog,addBlog}}>
            {children}
        </blogsContext.Provider>
    )
}


