import axios from "axios";

const url = 'https://rickandmortyapi.com/api/episode'

export const getDataList = async (page) => {
    const { data } = await axios(`${url}/?page=${page}`)
    return data
}

export const getEpisodeById = async (id) => {
    const { data } = await axios(`${url}/${id}`)
    return data
}

export const getCharacters = async(url) => {
    const { data } = await axios(url)
    return data
}