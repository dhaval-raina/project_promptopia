"use client";
import { useCallback, useEffect, useState, lazy } from 'react';
import Loading from '@app/loading';
const PromptCardList = lazy(() => import('./PromptCardList'));
import {XMarkIcon} from '@heroicons/react/24/solid';
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('api/prompt');
                const posts = await response.json();
                setPosts(posts);
                setFilteredPosts(posts);
            } catch (error) {
                console.log("Failed to fetch posts", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filterPosts = useCallback((searchValue) => {
        if (searchValue.trim()) {
            const lowercasedValue = searchValue.toLowerCase();
            const filtered = posts.filter(({ prompt, tag, creator }) =>
                prompt.toLowerCase().includes(lowercasedValue) ||
                tag.toLowerCase().includes(lowercasedValue) ||
                creator?.username.toLowerCase().includes(lowercasedValue)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [posts]);

    const handleSearchChange = useCallback((e) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        setIsLoading(true);
        const debounceTimeout = setTimeout(() => {
            filterPosts(searchValue);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [filterPosts]);

    const handleClearSearch = () => {
        setSearchText("");
        setFilteredPosts(posts);
    };

    const handleTagClick = useCallback((tag) => {
        setSearchText(tag);
        setIsLoading(true);
        filterPosts(tag);
        setIsLoading(false);
    }, [filterPosts]);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search_input peer'
                />
                {searchText && (
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                       <XMarkIcon className="h-5 w-5" /> {/* Heroicon XIcon */}
                    </button>
                )}
            </form>
            {isLoading ? <Loading /> : (
                <PromptCardList
                    data={filteredPosts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    );
};

export default Feed;
