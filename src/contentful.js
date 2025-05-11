import { createClient } from "contentful";



export default createClient({
    space:"a8vnxa8jjen0",
    accessToken:process.env.REACT_APP_CONTENTFULLKEY

})