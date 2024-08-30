"use client";
import { useCallback, useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => {
                return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            })}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('api/prompt');
                const posts = await response.json();
                setPosts(posts);
                setFilteredPosts(posts);
                
            } catch (error) {
                console.log("Failed to fetch posts", error);
                
            }
        }
        fetchPosts();
    }, []);

    const handleSearchChange = useCallback((e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const debounceTimeout = setTimeout(() => {
            if (searchValue.trim()) {
                const filtered = posts.filter((p) => {
                    return p.prompt.toLowerCase().includes(searchValue) ||
                        p.tag.toLowerCase().includes(searchValue) ||
                        p.creator?.username.toLowerCase().includes(searchValue);

                });
                setFilteredPosts(filtered);
            } else {
                setFilteredPosts(posts);
            }
        }, 500);
        return () => clearTimeout(debounceTimeout);

    }, [posts]);

    const handleTagClick = useCallback((tag) => {
        const searchValue = tag.toLowerCase();
        setSearchText(searchValue);
        const filtered = posts.filter((p) => {
            return p.prompt.toLowerCase().includes(searchValue) ||
                p.tag.toLowerCase().includes(searchValue) ||
                p.creator?.username.toLowerCase().includes(searchValue);

        });
        setFilteredPosts(filtered);
    }, [posts]);

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
            </form>

            <PromptCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
}

export default Feed;
