import PromptCardSkeleton from "@components/PromptCardSkelaton";

export default function Loading() {
    return (
        <div className='mt-16 prompt_layout'>
            {Array.from({ length: 6 }).map((_, index) => (
                <PromptCardSkeleton key={index} />
            ))}
        </div>
    );
}
