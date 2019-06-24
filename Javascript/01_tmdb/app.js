const API_KEY = '{{TMDB_API}}'
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
const IMG_URL = 'http://image.tmdb.org/t/p/w500'

app = new Vue({
    el: '#app',
    data: {
        searchString: '',
        movies: [],
    },
    async created() {
        const response = await axios.get(URL)
        const movies = response.data.results
        console.log(movies)
        this.movies = movies.map(movie => {
            return {title: movie.title, score: movie.vote_average, image: IMG_URL + movie.poster_path}
        })
        console.log(this.movies)
    },
    computed: {
        filteredMovies: function() {
            if (!this.searchString) {
                return this.movies
            }
            let searchString = this.searchString.trim().toLowerCase()
            let movies = this.movies.filter(movie => {
                return movie.title.toLowerCase().includes(searchString)
            })
            return movies
        }
    },
})