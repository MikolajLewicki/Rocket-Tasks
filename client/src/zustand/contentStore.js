import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'
import { DateWithoutTime } from 'epoq'

const store = (set, get) => ({
    content: [],
    currentContent: "",
    filters: {},
    getContent:  async (type, currentContent, filters) => {
        try{
            if(type.includes("/users")){    /// if url includes users get users and change current Content to users
                if(currentContent === "/tasks" ){
                    set((state) => ({content: []}))
                }  
                const result = await api.getUsers();
                set((state) => ({content: result.data.result, currentContent: "/users"}))
            }
            if(type.includes("/tasks")){
                if(currentContent === "/users" ){ /// if url includes tasks but current content is still users clear content so loading animation can be played
                    set((state) => ({content: []}))
                }  
                let content = await (await api.getTasks()).data.result;
                if(Object.keys(filters).length === 0){  /// check if filters are saved if so apply them
                    if(content.length === 0){
                        content = "no tasks"
                    }
                    set((state) => ({content: content}))
                }else{

                    content = content.filter(item => { ///check filters for assigned for
                        for(let i = 0; i < filters.assignedFor.length; i++){
                            if(item.assignedFor === filters.assignedFor[i]){
                                return item
                            }
                        }
                    })

                    content = content.filter(item => { ///check filters for status
                        for(let i = 0; i < filters.status.length; i++){
                            if(item.status === filters.status[i]){
                                return item
                            }
                        }
                    })

                    const checkDate = (date1, date2, date3) => {
                        const from = new DateWithoutTime(date1)
                        const to = new DateWithoutTime(date2)
                        const check = new DateWithoutTime(date3)
                        // const from = new Date(Date.UTC(date1.slice(0,4), parseInt(date1.slice(6,7)) - 1, date1.slice(8,10), 0, 0)).getTime()
                        // const to = new Date(Date.UTC(date2.slice(0,4), parseInt(date2.slice(6,7)) - 1, date2.slice(8,10), 23, 59)).getTime()
                        // const check = new Date(Date.UTC(date3.slice(0,4), parseInt(date3.slice(6,7)) - 1, date3.slice(8,10), date3.slice(11, 13))).getTime()

                        if(check >= from && check <= to){
                            return true
                        }else{
                            return false
                        }
                    }

                    content = content.filter(item => { ///check filters for dates
                        if(checkDate(filters.dateOfCreation1, filters.dateOfCreation2, item.dateOfCreation)){
                            return item
                        }
                    }) 

                    const filterForNew = filters.status.filter(item => item === "new").length !== 0
                    const filterForWork = filters.status.filter(item => item === "work").length !== 0
                    const filterForEnd = filters.status.filter(item => item === "end").length !== 0
                    if(!filterForNew){
                        content = content.filter(item => {
                            if(item.status !== "new"){
                                return item
                            }
                        })
                    }
                    if(!filterForWork){
                        content = content.filter(item => {
                            if(item.status !== "work"){
                                return item
                            }
                        })
                    }else{
                        content = content.filter(item => {
                            if(item.status !== "work"){
                                return item
                            }else{
                                if(item.startOfWork){
                                    if(checkDate(filters.startOfWork1, filters.startOfWork2, item.startOfWork)){
                                        return item
                                    }
                                }
                            }
                        })
                    }
                    if(!filterForEnd){
                        content = content.filter(item => {
                            if(item.status !== "end"){
                                return item
                            }
                        })
                    }else{
                        content = content.filter(item => {
                            if(item.status !== "end"){
                                return item
                            }else{
                                if(item.endOfWork){
                                    if(checkDate(filters.endOfWork1, filters.endOfWork2, item.endOfWork)){
                                        return item
                                    }
                                }
                            }
                        })
                    }
                    if(content.length === 0){
                        content = "no tasks"
                    }
                set((state) => ({content: content}))
                }
                set((state) => ({currentContent: "/tasks"}))
            }
        }catch(err){
            console.log(err)
        }
    },
    changeStatus: async (value, id, content1, content2, content3) => {
        const data = [value, id]
        try{
             await api.changeStatus(data)
             let getContent = get().getContent
             await getContent(content1, content2, content3)
        }catch(err){
            console.log(err)
        }
    },
    deleteTask: async (id) => {
        const data = [id]
        try{
            await api.deleteTask(data)

        }catch(err){
            console.log(err)
        }
    },
    applyFilters: async (filters) => {
        try{ 
            set((state) => ({filters: filters}))
            
        }catch(err){
            console.log(err)
        }
    }
})

const contentStore = create(devtools(store))
export default contentStore