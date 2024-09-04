import React from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick,lastPostElementRef }) => {
    return (
        <div className='mt-14 prompt_layout'>
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    );
}

export default PromptCardList;
