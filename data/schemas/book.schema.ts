export const getAllBookSchema = {
    type:"object",
    required:["books"],
    properties:{
        book:{
            type:"array",
            items:{
                type:"object",
                required:["isbn","title","subTitle","author","publish_date","publisher","pages","description","website"],
                properties:{
                    isbn:{type:"string"},
                    title:{type:"string"},
                    subTitle:{type:"string"},
                    author:{type:"string"},
                    publish_date:{type:"string", format:"date-time"},
                    publisher:{type:"string"},
                    pages:{type:"integer"},
                    description:{type:"string"},
                    website:{type:"string"}
                }
            }
        }
    }
}
export const getABookSchema={
    type:"object",
   required:["isbn","title","subTitle","author","publish_date","publisher","pages","description","website"],
    properties:{
                    isbn:{type:"string"},
                    title:{type:"string"},
                    subTitle:{type:"string"},
                    author:{type:"string"},
                    publish_date:{type:"string", format:"date-time"},
                    publisher:{type:"string"},
                    pages:{type:"integer"},
                    description:{type:"string"},
                    website:{type:"string"}
                }
}
export const updateBookSchema={
    type:"object",
    require:['books','username','userId'],
    properties:{
        type:'array',
        items:{
                type:"object",
                //required:["isbn","title","subTitle","author","publish_date","publisher","pages","description","website"],
                properties:{
                    isbn:{type:"string"},
                    title:{type:"string"},
                    subTitle:{type:"string"},
                    author:{type:"string"},
                    publish_date:{type:"string", format:"date-time"},
                    publisher:{type:"string"},
                    pages:{type:"integer"},
                    description:{type:"string"},
                    website:{type:"string"}
                }
            }
    }
}