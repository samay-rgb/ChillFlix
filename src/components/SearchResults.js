import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieItems from './MovieItems';

export default function SearchResults() {
    const param = useParams();
    const movie = param.movie;

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const getMovies = async (movie) => {
        let recom = await fetch(
            "https://movie-recommender-backend-g.onrender.com/search/" + movie
        );
        let recomjson = await recom.json();
        setMovies(recomjson);
        setLoading(false);
    }
    useEffect(() => {
        getMovies(movie);
    }, [movie, param])

    if (loading) {
        return (
            <div style={{ padding: '1rem 1.5rem' }}>
                <h1 style={{ color: 'black' }}>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Search Results</h1>
            <Container>
                {movies.map((item, idx) => {
                    return <MovieItems movieitem={item} key={idx} />;
                })}
            </Container>
        </>
    );
}

const Container = styled.div`
      height: 80vh;
      margin-top: 3em;
      display: flex;
      flex-wrap: wrap;
      margin: auto;
      margin-left: 5%;
      justify-content: flex-start;
      background-color: #14213d;`
