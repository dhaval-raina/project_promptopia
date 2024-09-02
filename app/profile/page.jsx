"use client";
import Profile from "@components/Profile";
import useToast from "@hooks/useToast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const MyProfile = () => {
    const {data:session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    } 
    const {showToast} = useToast();
    
    const handleDelete = async (post) => {
        //const hasConfirm = confirm('Are you sure you want to delete this prompt?'); 
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this prompt?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await fetch(`api/prompt/${post._id}`,{
                    method: 'DELETE'
                });

                const filteredPrompts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPrompts);

                showToast('Prompt deleted successfully!', 'success');  
            } catch (error) {
                console.log(error);
            }
                
        } 
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user?.id) fetchPosts();
    }, []);

    return (
        <div>
            <Profile 
            name= "My"
            desc="Welcome to personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} 
            />
        </div>
    );
}

export default MyProfile;
