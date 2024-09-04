const PromptCardSkeleton = () => {
    return (
        <div className='prompt_card mt-16 animate-pulse'>
            <div className="flex justify-between items-start gap-5">
                <div className='flex-1 flex justify-start items-start gap-3'>
                    <div className='rounded-full bg-gray-300 w-10 h-10'></div>
                    <div className='flex flex-col gap-2'>
                        <div className='bg-gray-300 w-24 h-4 rounded'></div>
                        <div className='bg-gray-200 w-36 h-3 rounded'></div>
                    </div>
                </div>
                <div className="bg-gray-300 w-6 h-6 rounded"></div>
            </div>
            <div className='my-4'>
                <div className='bg-gray-300 w-full h-4 rounded'></div>
                <div className='bg-gray-200 w-3/4 h-4 rounded mt-2'></div>
            </div>
            <div className='bg-gray-200 w-20 h-3 rounded'></div>
            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-4'>
                <div className='bg-gray-200 w-10 h-4 rounded'></div>
                <div className='bg-gray-200 w-10 h-4 rounded'></div>
            </div>
        </div>
    );
}

export default PromptCardSkeleton;
