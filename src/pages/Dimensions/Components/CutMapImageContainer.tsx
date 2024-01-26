import { useState, useEffect } from 'react';
import CutMapImagePagination from './CutMapImagePagination';
import Spinner from '../../../components/uiComp/spinner/Spinner';

function CutMapImageContainer({ dimensionId, woodSheetCount }: { dimensionId: string; woodSheetCount: number }) {
    const [user, setUser] = useState<any>(null);
    const [images, setImages] = useState<any[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const date = new Date();
        setCurrentDate(date.toISOString().slice(0, 19).replace(/[-:T]/g, '-'));
    }, []);
    useEffect(() => {
        if (user) {
            const newImages = [];
            for (let i = 1; i <= woodSheetCount; i++) {
                newImages.push(`https://cdn.sitechoob.ir/dimensions/${user.guid}/${dimensionId}/${dimensionId}-${i}.png?${currentDate}`);
            }

            if (newImages.length > 0) {
                setSelectedImage(newImages[0]);
                setImages(newImages);
            }

            console.log(images);
        }
    }, [user, currentDate]);

    const SelectedImageChanged = (selectedImage: string) => {
        //setIsLoadingImage(true);
        setSelectedImage(selectedImage);
    };

    return (
        <>
            <div className="flex flex-col rounded-lg bg-white p-4 justify-center items-center">
                <CutMapImagePagination
                    images={images}
                    onImageChangeClicked={SelectedImageChanged}
                />
                <div>
                    {isLoadingImage && (
                        <div className="h-20">
                            <Spinner flex={true} />
                        </div>
                    )}

                    <img
                        src={selectedImage}
                        onLoad={() => setIsLoadingImage(false)}
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    );
}

export default CutMapImageContainer;
