"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
const UpdatePrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const updatePrompt = async (e) => {
        if (!promptId) return alert('Prompt ID not found');
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/profile');
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchPromt = async () => {
            const prompt = await fetch(`/api/prompt/${promptId}`);
            const data = await prompt.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
        if (promptId) fetchPromt();
    }, [promptId]);

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />

    );
}

export default UpdatePrompt;
