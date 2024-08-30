"use client";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    
    const userName = searchParams.get("name");
    const userId = params?.id;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(userId) fetchPosts();
    }, []);

    return (
        <div>
            <Profile 
            name= {userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
            />
        </div>
    );
}

export default UserProfile;
