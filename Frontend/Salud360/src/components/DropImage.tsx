import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from "react";


interface DropImageProps {
  onFileSelect: (file: File) => void;
  previewUrl?: string; // nueva prop para mostrar imagen inicial
}

function DropImage({ onFileSelect, previewUrl }: DropImageProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  const handleDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  return (
    <div className="border border-dashed rounded-md p-4 w-full h-64 flex items-center justify-center bg-white">
      <label className="cursor-pointer text-gray-500">
        <input name='imagen-comunidad' type="file" accept="image/*" className="hidden" onChange={handleDrop} />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-64 w-auto object-contain rounded-xl shadow-md"
          />
        ) : (
          <>
            <p>📎 Arrastra una imagen aquí o haz clic para buscar</p>
            <span className="text-sm text-gray-400">Formatos: JPG, PNG, etc.</span>
          </>
        )}
      </label>
    </div>
  );
}


export default DropImage;