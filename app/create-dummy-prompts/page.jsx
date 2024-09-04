"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useToast from '@hooks/useToast';

const CreateDummyPrompts = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { showToast } = useToast();

    const createDummyPrompt = async (prompt, tag) => {
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt,
                    userId: session?.user?.id,
                    tag,
                }),
            });

            if (response.ok) {
                console.log('Dummy prompt created successfully!');
            }
        } catch (error) {
            console.log('Error creating dummy prompt:', error);
        }
    };

    const generateRandomPrompt = () => {
        const randomPrompt = `This is a random prompt #${Math.floor(Math.random() * 1000)}`;
        const randomTag = `tag${Math.floor(Math.random() * 100)}`;
        return { prompt: randomPrompt, tag: randomTag };
    };

    useEffect(() => {
        const entryRecord = 100;
        const createDummyPrompts = async () => {
            for (let i = 0; i <= entryRecord; i++) {
                const { prompt, tag } = generateRandomPrompt();
                await createDummyPrompt(prompt, tag);
            }
            showToast('100 Dummy Prompts created successfully!', 'success');
            router.push('/');
        };

        createDummyPrompts();
    }, [session]);

    return null; // No need to render anything
};

export default CreateDummyPrompts;
