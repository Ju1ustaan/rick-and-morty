import axios from "axios"

export const getDetail = async(category, id) => {
    const { data } = await axios(`https://rickandmortyapi.com/api${category}/${id}`)
    return data
}