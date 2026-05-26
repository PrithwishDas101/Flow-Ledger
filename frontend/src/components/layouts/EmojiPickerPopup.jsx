import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiSelect = (emojiData) => {
        onSelect(emojiData?.imageUrl || "");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">

            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-emerald-50 text-primary rounded-xl overflow-hidden">

                    {icon ? (
                        <img
                            src={icon}
                            alt="Icon"
                            className="w-12 h-12 object-contain"
                        />
                    ) : (
                        <LuImage className="text-2xl text-primary" />
                    )}

                </div>

                <p className="text-sm font-medium text-slate-700">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 z-50 bg-white rounded-full shadow-xl border border-slate-200 p-2">

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 ml-auto mb-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className="text-xl text-slate-600" />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiSelect}
                    />

                </div>
            )}

        </div>
    );
};

export default EmojiPickerPopup;