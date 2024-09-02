"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import useToast from '@hooks/useToast';

const CreatePrompt = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [post,setPost] = useState({
        prompt:'',
        tag:''
    });
    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new',{
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId:session?.user?.id,
                    tag:post.tag
                })
            })

            if(response.ok) {
                showToast('New Prompt created successfully!', 'success');
                router.push('/');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
            
    );
}

export default CreatePrompt;
