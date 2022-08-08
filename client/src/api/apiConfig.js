const apiConfig={
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: '7f2191622e6e109a6d1cc510ac82daa6',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`, 
    videos: (key)=>`https://www.youtube.com/embed/${key}`
}

export default apiConfig;