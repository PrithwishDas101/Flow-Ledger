import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);

            // Preview Image
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewURL(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-emerald-100 rounded-full relative border border-emerald-200'>
                    <LuUser className='text-4xl text-emerald-600' />

                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full absolute -bottom-1 -right-1 transition-all duration-200 shadow-md shadow-emerald-500/20'
                        onClick={onChooseFile}
                    >
                        <LuUpload size={16} />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img
                        src={previewURL}
                        alt='profile photo'
                        className='w-20 h-20 rounded-full object-cover border border-emerald-200'
                    />

                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 transition-all duration-200 shadow-md shadow-red-500/20'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;