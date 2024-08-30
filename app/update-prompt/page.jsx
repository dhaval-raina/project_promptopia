// page.jsx
import { Suspense } from 'react';
import UpdatePrompt from './UpdatePrompt'; // Adjust the import path as needed

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePrompt />
        </Suspense>
    );
}
