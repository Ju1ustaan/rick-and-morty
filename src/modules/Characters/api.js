import axios from "axios";

const url = 'https://rickandmortyapi.com/api/character'
export const getDataList = async ( page ) => {
    const { data } = await axios(`${url}/?page=${!page? '0': page}`)
    return data
}