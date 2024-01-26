import { useState, useEffect } from 'react';

function CutMapImagePagination({ images, onImageChangeClicked }: { images: string[]; onImageChangeClicked: (selectedImage: string) => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {}, [images]);

    const ImageChangeClicked = (selectedImage: string, index: number) => {
        setActiveIndex(index);
        onImageChangeClicked(selectedImage);
    };

    return (
        <>
            <div className="flex gap-2 rounded-lg p-4 justify-center items-center ss02">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => ImageChangeClicked(img, index)}
                        className={`pagination ${activeIndex === index ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default CutMapImagePagination;
