const axiosClient = require ("./axiosClient")


const type = {
    latest:'latest',
    popular:  'popular',
    topRated:  'top_rated',
    upcoming: 'upcoming'

}

const category = {
    movie: 'movie',
    tv: 'tv'
}

const tmdbApi = {
    getMovies: (i, params) => {
        const url = `/movie/${type[i]}`;
        return axiosClient.get(url,params);
    },
    getTv: (i, params) => {
        const url = `/tv/${type[i]}`;
        return axiosClient.get(url,params);
    },
    search: (params) => {
        const url = `/search/multi`;
        return axiosClient.get(url, params);
    },
    detail: (category, id, params) => {
        const url = `/${category}/${id}`;
        return axiosClient.get(url, {params: {}});
    },
    getVideos: (category,id,params) => {
        const url = `/${category}/${id}/videos`;
        return axiosClient.get(url, {params: {}});
    }
}

module.exports ={
    type,category,tmdbApi
}