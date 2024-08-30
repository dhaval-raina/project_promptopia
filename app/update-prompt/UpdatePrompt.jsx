// UpdatePrompt.jsx
"use client";

import { useEffect, useState } from 'react';
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
        e.preventDefault();
        if (!promptId) {
            alert('Prompt ID not found');
            return;
        }
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/profile');
            } else {
                console.error('Failed to update prompt:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating prompt:', error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPrompt = async () => {
            if (!promptId) return;
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch prompt');
                }
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.error('Error fetching prompt:', error);
            }
        };
        fetchPrompt();
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
};

export default UpdatePrompt;
