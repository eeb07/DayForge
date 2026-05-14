
import { useState } from "react"
export function InputProvider() {
    return <div>

        <div>
            <input type="text" placeholder="Give the prompt to AI  " />
            <button >Submit</button>
        </div>
    </div>

}

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handlerFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);

            // create temporary URL for immediate preview
            
            setPreviewUrl(URL.createObjectURL(file));
        }

    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();

        formData.append("image", selectedFile);

        await fetch("api/ocr", {
            method: "POST",
            body: formData,
        });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handlerFileChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" width="100" />}

            <button onClick={handleUpload}>Upload Image</button>
        </div>
    )
}


